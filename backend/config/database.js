const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        // console.log("hello")
        await mongoose.connect(process.env.MONGO_URL,{
            minPoolSize: 1,      
            maxPoolSize: 10,    
            serverSelectionTimeoutMS: 5000, 
        });
        console.log("Success");
        
    } catch (error) {
        console.log("Error");
    }
}