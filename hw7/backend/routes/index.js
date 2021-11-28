//定義 Express/Router middleware, 作為與前端串接的 API endpoint

import express from 'express';
import scorecard from '../models/ScoreCard';

const router = express.Router();

router.get('/', (req, res) => {
    scorecard.find()
        .then((cards) => {res.json(cards)})
        .catch((error) => {res.status(400).json('Error: ' + error)});
})

//Add & update
router.post('/create-card', async (req, res) => {
    const name = req.body.name;
    const subject = req.body.subject;
    const score = Number(req.body.score);
    const existing = await scorecard.findOne({name: name, subject: subject}).exec();
    let exist = existing ? true : false;

    const newCard = new scorecard({
        name,
        subject,
        score
    });

    if(exist) {
        await scorecard.findOneAndUpdate({name: name, subject: subject}, {score: score}).exec();
        newCard.save();
        console.log('Updating Card');
        res.json({message: `Updating(${name}, ${subject}, ${score})`, card: newCard})
    }
    else {
        newCard.save();
        console.log('Adding Card');
        res.json({message: `Adding(${name}, ${subject}, ${score})`, card: newCard})
    }
});

//clear
router.delete ('/clear-db', async (_, res) => {
    await scorecard.deleteMany({});
    res.json({message: `Database Cleared`});
})

//query
router.get('/query-cards', async (req, res) => {
    const type = req.query.type;
    const queryString = req.query.queryString;
    //console.log(type, queryString)
    var messagesList = [];

    if(type === 'name'){
        var existing = await scorecard.find({name: queryString});
        existing.map((t) => messagesList.push(`(Name: ${t.name}, Subject: ${t.subject}, Score: ${t.score})`));
        res.json({messages: messagesList, message: `Name (${queryString}) not found!!`})
    }
    else {
        var existing = await scorecard.find({subject: queryString});
        existing.map((t) => messagesList.push(`(Name: ${t.name}, Subject: ${t.subject}, Score: ${t.score})`));
        res.json({messages: messagesList, message: `Name (${queryString}) not found!!`})  
    }
})

export default router;
