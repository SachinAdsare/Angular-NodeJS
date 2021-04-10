const createError = require("http-errors");
const Post = require("../Models/UserPost.model");
const User = require("../Models/User.model");
module.exports = {
  getAllUserPost: (req, res) => {
    User.findAndCountAll({
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Post,
        },
      ],
      distinct: true
    })
      .then(async (data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving User.",
        });
      });
  },

  getAllPostOfUser: (req, res) => {
    Post.findAndCountAll({where:{userid:req.payload.userId}})
      .then(async (data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving User.",
        });
      });
  },
  addPost: (req, res) => {
    const { postTitle } = req.body;
    const postData = new Post({ postTitle, userid: req.payload.userId });
    postData
      .save()
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while Adding.",
        });
      });
  },
  deletePost: (req, res) => {
    const { id } = req.params;
    
    Post.findByPk(id)
      .then((data) => {
        data.destroy(id).then(()=>
          res.send(data)
        );
        
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while Adding.",
        });
      });
  },
};
