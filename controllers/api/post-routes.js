const router = require("express").Router();
// const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");
const { Post } = require("../../models");

// To GET all posts > api/posts
router.get("/", (req, res) => {
    console.log("======================");
    Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      order: [["created_at", "DESC"]],
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["username"],
    //     },
    //     {
    //       model: Comment,
    //       attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
    //       include: {
    //         model: User,
    //         attributes: ["username"],
    //       },
    //     },
    //   ],
    })
      .then((dbPostData) => res.json(dbPostData.reverse()))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// To GET a single post
router.get("/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "content", "title", "created_at"],
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["username"],
    //     },
    //     {
    //       model: Comment,
    //       attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
    //       include: {
    //         model: User,
    //         attributes: ["username"],
    //       },
    //     },
    //   ],
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// To POST (create a post) api/posts
router.post("/", withAuth, (req, res) => {
    // To Create a post
    Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// To PUT (update) post
router.put("/:id", withAuth, (req, res) => {
    Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// To DELETE api/posts/id > @ id EX: '1'
router.delete("/:id", withAuth, (req, res) => {
    Post.findOne({
      where: {id: req.params.id},
      include: [Comment]
    })
    .then(post => {
      post.comments.forEach(comment => {
        comment.destroy();
      })
      post.destroy();
      res.end();
    })
});

module.exports = router;