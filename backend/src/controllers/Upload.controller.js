
const router  = require("express").Router();

router.post("/upload",  async (req, res) => {
    try {
        const file = req.files.file;
        console.log(file);
        res.status(200).json({message:"File uploaded successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
})

module.exports = router;