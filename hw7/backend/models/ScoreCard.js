//定義 ScoreCard DB schema, 並且建立⼀個 ScoreCard mode

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({
    name: String,
    subject: String,
    score: Number
});

const scorecard = mongoose.model('Student', ScoreCardSchema);

export default scorecard;
