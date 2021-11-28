//主程式
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/index';
import mongoose from 'mongoose';

require('dotenv').config();
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((res) => console.log("mongo db connection created"));
//MongoDB的連線

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', router);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})
