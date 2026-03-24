const { where } = require("sequelize");
const db = require("../models");
const { Parent,User,Student } = db;
const getAllParent = async (req, res) => {
  try {
    const parents = await Parent.findAll({
      include:[
        {
        model:User,
        as:"user"
      },{
        model:Student,
        as:"students",
        include:[
          {
            model:User,
            attributes:["firstName","lastName"],
            as:"user"
          }
        ]
      }
    ]
    });
    res.status(200).json({
      message: "Fetch parent succesfully",
      data: parents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"});
  }
};

module.exports = { getAllParent };
