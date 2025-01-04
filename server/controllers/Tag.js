const Tag=require("../models/Tag");

exports.createTag=async(req ,res)=>{
    try {
        const {name,description}=req.body;
        if(!name || !description)
        {
            return res.status(400).json({
                success:false,
                message:"All tags are required",
            })
        }
        const tagDetails=await Tag.create({
            name:name,
            description:description,
        })
        return res.status(200).json({
            success:true,
            message:"Tags created successfully",
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//showalltag

exports.showAllTag=async(req ,res)=>{
    try {
        const allTag=await Tag.find({},{name:true , description:true});
        return res.status(200).json({
            success:true,
            message:"All tags are coming",
            allTag,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}