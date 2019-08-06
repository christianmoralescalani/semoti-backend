import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
class MongoDB {

    URI: string = `${process.env.URI_MONGO}`;
    constructor() {

        mongoose.set('useFindAndModify', true);

    }
    start() {
        mongoose.connect(this.URI, { useNewUrlParser: true }).then(db => console.log(`MongoDB is connect`));
    }
}

const mongodb = new MongoDB();
export default mongodb;