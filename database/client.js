import mongoose from 'mongoose';


const connectMongo = () =>  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export default connectMongo;