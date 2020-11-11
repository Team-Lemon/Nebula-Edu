const router = require("express").Router();
const { Lesson, User, Comment, Vote } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

// To GET all posts > api/lesson
router.get("/", (req, res) => {
    console.log("======================");
    Lesson.findAll({
      attributes: [
      "id",
      "title",
      "desc",
      "user_id",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM vote WHERE lesson.id = vote.lesson_id)"
          ),
      "vote_count",
    ],
  ],
      include: [
        // To include the Comment model
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'lesson_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          // To Include User Model @ username
          model: User,
          attributes: ['username']
        }
      ],
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
      attributes: [
        'id', 
        'title', 
        'desc',
        'user_id',
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM vote WHERE lesson.id = vote.lesson_id)"
          ),
        "vote_count",
      ],
    ],
      include: [
         {
          model: User,
           attributes: ["username"],
         },
         {
          model: Comment,
          attributes: ["id", "comment_text", "lesson_id", "user_id", 'created_at'],
           include: {
             model: User,
             attributes: ["username"],
           },
         },
      ],
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

// To POST (create a lesson) api/lessons
router.post("/", withAuth, (req, res) => {
    // To create a lesson
    Lesson.create({
      title: req.body.title,
      desc: req.body.desc,
      topic_id: req.body.topic_id,
      user_id: req.session.user_id,
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT /api/posts/upvote
router.put('/upvote', withAuth, (req, res) => {
  // custom static method created in models/Lesson.js
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Lesson.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  };
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
          res.status(404).json({ message: "No Lesson found with this id" });
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
    .then(lessons => {
      lessons.comments.forEach(comment => {
        comment.destroy();
      })
      lessons.destroy();
      res.end();
    })
});

module.exports = router;