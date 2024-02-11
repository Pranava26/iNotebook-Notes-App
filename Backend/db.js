const mongoose=require('mongoose');

const connectToMongo=async()=>{
    mongoose.connect(process.env.MONGO_URI, await console.log("Connected to mongo sucessfully"));
}

module.exports=connectToMongo;