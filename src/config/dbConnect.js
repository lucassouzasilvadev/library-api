import mongoose from "mongoose";

async function connectDatabase(){
    mongoose.connect('mongodb://localhost:27017/library?retryWrites=true&w=majority');
    return mongoose.connection;
}


export default connectDatabase;


