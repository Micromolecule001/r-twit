const express = require('express');
const router = express.Router();
const { Post } = require('../class/post');

router.post('/post-create', function (req, res) {
    try {
        console.log('Request body:', req.body);
        const { username, text, postId } = req.body;
        if (!username || !text) {
            return res.status(400).json({
                message: '!username, !text'
            });
        }

        let post = null;

        console.log(postId, 'postId');

        if (postId) {
            post = Post.getById(Number(postId));
            console.log('post: ', post);

            if (!post) {
                return res.status(400).json({
                    message: "!post"
                });
            }
        }

        const newPost = Post.create(username, text, post);

        return res.status(200).json({
            post: {
                id: newPost.id,
                text: newPost.text,
                username: newPost.username,
                data: newPost.date
            }
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
});

router.get('/post-list', function (req, res) {
    try {
        const list = Post.getList()

        if (list.length === 0) {
            return res.status(200).json({
                list: []
            })
        }

        return res.status(200).json({
            list: list.map(({ id, username, text, date }) => ({
                id,
                username,
                text,
                date
            }))
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
})

router.get('/post-item', function (req, res) {
    try {
        const { id } = req.query

        if (!id) {
            return res.status(400).json({
                message: '!ID D'
            })
        }

        const post = Post.getById(Number(id))

        if (!post) {
            return res.status(400).json({
                message: '!POST D'
            })        
        }

        return res.status(200).json({
            post: {
                id: post.id,
                text: post.text,
                username: post.username,
                date: post.date,
                
                reply: post.reply.map((reply) => ({
                    id: reply.id,
                    text: reply.text,
                    username: reply.username,
                    date: reply.date,
                }))
            }
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
})

// Экспортируем роутер
module.exports = router;
