const router = require("express").Router();

const uploadController = require("../controllers/Upload.controller");
router.post("/upload", uploadController);

module.exports = router;
