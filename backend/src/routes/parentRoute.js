const { getAllParent } = require("../controllers/Parent.controller");

const router = require("express").Router();

router.get("/parents", getAllParent);
module.exports = router;
