const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name : process.env.cloud_name,
    api_key : process.env.cloud_api_key,
    api_secret : process.env.cloud_api_secret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderLust-2-dev',  // in cloudanry app the photo will store in name of this folder
      allowedFormats : ["jpg" , "png" , "jpeg"],
    },
  });

  module.exports = {
    cloudinary ,
    storage
  };