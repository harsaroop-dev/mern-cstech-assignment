const fs = require("fs");
const csv = require("csv-parser");
const Agent = require("../models/Agent");
const Task = require("../models/Task");

exports.uploadAndDistribute = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const agents = await Agent.find().limit(5);
    if (agents.length === 0) {
      return res
        .status(400)
        .json({ message: "No agents available to distribute tasks." });
    }
    if (agents.length < 5) {
      console.warn(
        `Warning: Found only ${agents.length} agents. Tasks will be distributed among them.`
      );
    }

    const tasks = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const taskData = {
          firstName: row.FirstName,
          phone: row.Phone,
          notes: row.Notes,
        };
        tasks.push(taskData);
      })
      .on("end", async () => {
        try {
          const tasksToSave = tasks.map((task, index) => {
            const agentForThisTask = agents[index % agents.length];
            return {
              ...task,
              assignedAgent: agentForThisTask._id,
            };
          });

          await Task.insertMany(tasksToSave);

          fs.unlinkSync(filePath);

          res.status(200).json({
            message: `${tasks.length} tasks have been successfully distributed among ${agents.length} agents.`,
          });
        } catch (dbError) {
          console.error("Database error after CSV processing:", dbError);
          res.status(500).send("Error saving tasks to the database.");
        }
      });
  } catch (error) {
    console.error("File upload processing error:", error);
    res.status(500).send("Server Error");
  }
};
