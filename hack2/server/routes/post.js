import express from 'express'
import Post from '../models/post'
import exportSchema from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async(req, res) => {
    var dataList = [];

    try {
        var existing = await Post.find({});
        existing.map((t) => dataList.push(t));
        res.json({message: `success`, data: dataList})
    }
    catch(error) {
        var existing = await Post.find({});
        res.json({messages: `error`, data: `null`})  
    }
})

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async(req, res) => {
    const pid = req.query.pid;
    const found = await Post.findOne({postId: pid}).exec();
    try {
        res.json({message: `success`, post: found});
    }
    catch(error) {
        res.json({message: `error`, post: `null`});
    }
})

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async(req, res) => {
    const pid = req.body.pid;
    const title = req.body.title;
    const content = req.body.content;
    const timestamp = req.body.timestamp;
    const newPost = new Post({
        pid, 
        title,
        content,
        timestamp
    });
    try {
        newPost.save();
        res.json({message: `success`});
    }
    catch(error) {
        res.json({message: `error`, post: `null`});
    }
})

// TODO 5-(1): create the 4th API (/api/post)
router.delete('/post', async(req, res) => {
    const pid = req.query.pid;
    await Post.deleteOne({postId: pid}).exec();
    try {
        res.json({message: `success`});
    }
    catch(error) {
        res.json({message: `error`, post: `null`});
    }
})

export default router