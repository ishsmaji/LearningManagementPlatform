const cloudinary = require('cloudinary').v2

exports.uploadImageToCoudinary=async(File,folder,height,quality)=>{
    const options={folder};
    if(height)
    {
        options.height=height;
    }
    if(quality)
        {
            options.quality=quality;
        }

        options.resource_type="auto";
        return await cloudinary.uploader.upload(File.tempFilePath,options);
}