const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2;
// const path = require('path');
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads/')
//     },
//      filename: function (req, file, cb) {
//     // Generate unique filename: timestamp-randomstring.extension
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//       },
    
    
// })
cloudinary.config({
    api_key:process.env.API_KEY,
    api_secret:process.env.API_Secret,
    cloud_name:process.env.Cloudinary_name
})
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'school-management-system',
        allowed_formats:['jpg','png','jpeg','gif','webp'],

    }
})
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } })
module.exports = {upload}
    