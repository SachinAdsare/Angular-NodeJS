var express = require('express');
const userPostController = require('../Controllers/UserPost.Controller');

const { verifyAccessToken } = require('../helpers/jwt_helper');
var router = express.Router();

/* GET users listing. */
router.get("/all",verifyAccessToken, userPostController.getAllUserPost);
router.get("/", verifyAccessToken,userPostController.getAllPostOfUser);
router.post("/", verifyAccessToken,userPostController.addPost);
router.delete("/:id", verifyAccessToken,userPostController.deletePost);

module.exports = router;
