import mongoose from "mongoose"



const Connection= async(USERNAME,PASSWORD)=>{
    const URL =`mongodb://${USERNAME}:${PASSWORD}@ac-5srg79m-shard-00-00.mzvasuz.mongodb.net:27017,ac-5srg79m-shard-00-01.mzvasuz.mongodb.net:27017,ac-5srg79m-shard-00-02.mzvasuz.mongodb.net:27017/?ssl=true&replicaSet=atlas-953oj0-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        
        await mongoose.connect(URL,{useNewUrlParser:true}); 
        console.log("server Connected succesfully");


    }catch(error){
        console.log("Error connecting to db",error);
    }
}

export default Connection;