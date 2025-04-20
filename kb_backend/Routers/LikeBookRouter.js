const express = require('express');
const isAuth = require('../Middlewares/isAuth');
const { likeBookController, unlikeBookController, displayLikedBookController } = require('../Controllers/LikeBookController');
const LikeBookRouter = express.Router();

LikeBookRouter.get('/display-liked-book',isAuth,displayLikedBookController);
LikeBookRouter.post('/like',isAuth,likeBookController);
LikeBookRouter.post('/unlike',isAuth,unlikeBookController);

module.exports = LikeBookRouter;