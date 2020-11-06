const router = require("express").Router();
// const { Lesson, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");
const { Lesson } = require("../../models");

// To GET all posts > api/posts
router.get("/", (req, res) => {
    console.log("======================");
    Lesson.findAll({
      attributes: ["id", "title", "desc", "user_id"],
      order: [["DESC"]],
      // include: [
      //   {
      //     model: User,
      //     attributes: ["username"],
      //   },
      //   {
      //     model: Comment,
      //     attributes: ["id", "comment_text", "post_id", "user_id"],
      //     include: {
      //       model: User,
      //       attributes: ["username"],
      //     },
      //   },
      // ],
    })
      .then((dbPostData) => res.json(dbPostData.reverse()))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// To GET a single post
router.get("/:id", (req, res) => {
  Lesson.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "desc", "user_id"],
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["username"],
    //     },
    //     {
    //       model: Comment,
    //       attributes: ["id", "comment_text", "post_id", "user_id"],
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

// To POST (create a post) api/lessons
router.post("/", withAuth, (req, res) => {
    // To Create a post
    Lesson.create({
      title: req.body.title,
      desc: req.body.desc,
      user_id: req.session.user_id,
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// To PUT (update) lesson
router.put("/:id", withAuth, (req, res) => {
  Lesson.update(
      {
        title: req.body.title,
        desc: req.body.desc,
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
  Lesson.findOne({
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