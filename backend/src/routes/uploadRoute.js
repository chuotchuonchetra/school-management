const router = require("express").Router();

const {uploadFile} = require("../controllers/Upload.controller");
const {upload} = require("../middleware/uploads");
router.post("/upload",upload.single('image'),uploadFile);

module.exports = router;
