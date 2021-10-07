const mongoose= require("mongoose");

const connectdb = async()=> {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/socialnetwork",{
        useNewUrlParser:true,
        // useFindAndModify:false,
        useUnifiedTopology:true
    })
    console.log("database successfully connected!")

    }catch(error){
        console.log(error)
    }
    
}

module.exports=connectdb;