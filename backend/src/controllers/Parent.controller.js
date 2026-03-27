const { Op } = require("sequelize");
const db = require("../models");
const { Parent,User,Student ,ProfileImage} = db;
const getAllParent = async (req, res) => {
  try {
    const parents = await Parent.findAll({
      include:[
        {
        model:User,
        as:"user",
        include:[
          {
            model:ProfileImage,
            as:"profileImage",
            attributes:['image','userId','id']
          }
        ]
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
const getParents = async(req,res)=>{
  const {search} = req.query;
  try {
    const parents = await Parent.findAll({
      include:[
        {
        model:User,
        as:"user",
        where:{
          [Op.or]:[
            {
              firstName:{
                [Op.iLike]:`%${search}%`
              }
            },
            {
              lastName:{
                [Op.iLike]:`%${search}%`
              }
            }
          ]
        },
        include:[
          {
            model:ProfileImage,
            as:"profileImage",
            attributes:['image','userId','id']
          }
        ]
      },
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
}

module.exports = { getAllParent,getParents };
