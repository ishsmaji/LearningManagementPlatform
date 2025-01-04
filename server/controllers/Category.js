const Category=require("../models/Category");

exports.createCategory=async(req ,res)=>{
    try {
        const {name,description}=req.body;
        if(!name || !description)
        {
            return res.status(400).json({
                success:false,
                message:"All Categorys are required",
            })
        }
        const categoryDetails=await Category.create({
            name:name,
            description:description,
        })
        return res.status(200).json({
            success:true,
            message:"Category created successfully",
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//showallCategory

exports.showAllCategory=async(req ,res)=>{
    try {
        const allCategory=await Category.find({},{name:true , description:true});
        return res.status(200).json({
            success:true,
            message:"All Categorys are coming",
            allCategory,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}