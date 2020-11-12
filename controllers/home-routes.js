const sequelize = require("../config/connection");
const router = require("express").Router();
const { Lesson, User, Comment } = require("../models");

router.get('/', (req, res) => {
    console.log(req.session);
    Lesson.findAll({
      attributes: [
        'id',
        'desc',
        'title',
        'desc',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE lesson.id = vote.lesson_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'lesson_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // pass post object into the homepage template
        const lessons = dbPostData.map(lessons => lessons.get({ plain: true }));
        res.render('homepage', { 
        lessons,
        loggedIn: req.session.loggedIn
    });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
    // To redirect users to the Homepage
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/new-lesson", (req, res) => {
    res.render("add-lesson" , {loggedIn: req.session.loggedIn});
});

// To get a single User post @ id
router.get("/lessons/:id", (req, res) => {
  Lesson.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'desc',
      'title',
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE lesson.id = vote.lesson_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      // include the Comment model here:
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'lesson_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      //include the User model here so it can attach the username to the comment
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const lessons = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-lesson', {
        lessons,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;