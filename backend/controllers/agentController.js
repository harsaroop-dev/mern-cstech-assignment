const Agent = require("../models/Agent");

exports.createAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const agentExists = await Agent.findOne({ email });

    if (agentExists) {
      return res
        .status(400)
        .json({ message: "Agent with this email already exists" });
    }

    const agent = new Agent({
      name,
      email,
      mobile,
      password,
    });

    const createdAgent = await agent.save();
    res.status(201).json(createdAgent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find({});
    res.json(agents);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
