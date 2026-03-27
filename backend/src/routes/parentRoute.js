const { getAllParent, getParents } = require("../controllers/Parent.controller");

const router = require("express").Router();

router.get("/parents", getAllParent);
router.get("/parents/search", getParents);
module.exports = router;
