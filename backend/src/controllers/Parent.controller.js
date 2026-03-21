const db = require("../models");
const { Parent } = db;
const getAllParent = async (req, res) => {
  try {
    const parents = await Parent.findAll();
    res.status(200).json({
      message: "Fetch parent succesfully",
      data: parents,
    });
  } catch (error) {}
};

module.exports = { getAllParent };
