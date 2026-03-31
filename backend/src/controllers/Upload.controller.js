const db = require("../models");
const { ProfileImage } = db;

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const { userId } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const imageUrl = file.path;

    const profileImage = await ProfileImage.create({
      image: imageUrl,
      userId: userId,
      isActive: true,
    });

    res.status(200).json({
      message: "File uploaded and saved to database",
      data: profileImage,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const updateProfileImage = async (req, res) => {
  try {
    const file = req.file;
    const { userId } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const imageUrl = file.path;

    const profileImage = await ProfileImage.findOne({
      where: { userId: userId },
    });
    if (profileImage) {
      profileImage.image = imageUrl;
      await profileImage.save();
    }

    res.status(200).json({
      message: "File uploaded and saved to database",
      data: imageUrl,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
module.exports = { uploadFile, updateProfileImage };
