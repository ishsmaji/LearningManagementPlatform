const mongoose=require("mongoose");

const categorySchema=new mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    }
});

module.exports=mongoose.model("Category",categorySchema);
