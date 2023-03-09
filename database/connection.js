import mongoose from 'mongoose';
const connection_string = "mongodb://ramesh:s11i4JIRJQF5rxKG@ac-giu3zp9-shard-00-00.jw5i86r.mongodb.net:27017,ac-giu3zp9-shard-00-01.jw5i86r.mongodb.net:27017,ac-giu3zp9-shard-00-02.jw5i86r.mongodb.net:27017/?ssl=true&replicaSet=atlas-mjjys6-shard-0&authSource=admin&retryWrites=true&w=majority";

const connect = async function(){
    const db = await mongoose.connect(connection_string);
    console.log("Database connected");
    return db;
}
export default connect;