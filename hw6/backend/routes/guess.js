import express from "express";
import {genNumber, getNumber} from '../core/getNumber';

const roughScale = (x, base) => {
    const parsed = parseInt(x, base);
    if (isNaN(parsed))  
        return; 
    return parsed;
}

const router = express.Router();

router.post('/start', (_, res) => {
    genNumber();
    res.json({msg: 'The game has started.'});
})

router.get('/guess', (req, res) => {
    const number = getNumber();
    const guessed = roughScale(req.query.number, 10); 
    // check if NOT a num or not in range [1, 100]
    if (!guessed || guessed < 1 || guessed > 100) {
        res.status(406).send({msg: 'Not a legal number.'});
    }
    else if(number === guessed){
        res.send({msg: 'Correct!!'});
    }
    else if(number > guessed){
        res.send({msg: 'Bigger!'});
    }
    else if(number < guessed){
        res.send({msg: 'Smaller!'});
    }
})

router.post('/restart', (_, res) => {
    genNumber();
    res.json({msg: 'The game has restarted.'});

})

export default router;