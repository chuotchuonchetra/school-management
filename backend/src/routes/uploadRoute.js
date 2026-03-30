const router = require("express").Router();

const {uploadFile,updateProfileImage} = require("../controllers/Upload.controller");
const {upload} = require("../middleware/uploads");
router.post("/upload",upload.single('image'),uploadFile);
router.put("/update-profile-image",upload.single('image'),updateProfileImage);

module.exports = router;
