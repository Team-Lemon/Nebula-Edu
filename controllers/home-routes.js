const sequelize = require("../config/connection");
const router = require("express").Router();
const { Lesson, User, Comment } = require("../models");

// Homepage Route to display lessons data
router.get('/', (req, res) => {
    console.log(req.session);
    Lesson.findAll({
      attributes: [
        'id',
        'desc',
        'title',
        'createdAt',
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

// To login Route
router.get("/login", (req, res) => {
    // To redirect users to the Homepage
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    res.render("login");
});

// To sign-up Route
router.get("/signup", (req, res) => {
    res.render("signup");
});

// // Add a lesson Area Render
// router.get("/how-to-contribute", (req, res) => {
//     res.render("contribute" , {loggedIn: req.session.loggedIn});
// });

// Add a lesson Area Render
router.get("/add-post", (req, res) => {
  res.render("add-post" , {loggedIn: req.session.loggedIn});
});

// To Display HTML Lessons on HTML Dedicated Page
router.get('/html', (req, res) => {
  Lesson.findAll({
      where: {
        topic_id: 1,
      },
      attributes: [
        'id',
        'title',
        'desc',
        'createdAt',
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
        res.render('html', {
        lessons,
        loggedIn: req.session.loggedIn
    });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

// To Display CSS Lessons on CSS Dedicated Page
router.get("/css", (req, res) => {
  Lesson.findAll({
    where: {
      topic_id: 2,
    },
    attributes: [
      'id',
      'title',
      'desc',
      'createdAt',
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
      res.render('css', {
      lessons,
      loggedIn: req.session.loggedIn
  });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// To Display JS Lessons on JS Dedicated Page
router.get("/js", (req, res) => {
  Lesson.findAll({
    where: {
      topic_id: 3,
    },
    attributes: [
      'id',
      'title',
      'desc',
      'createdAt',
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
      res.render('js', { 
      lessons,
      loggedIn: req.session.loggedIn
  });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/community', (req, res) => {
  Lesson.findAll({
      where: {
        topic_id: 4,
      },
      attributes: [
        'id',
        'title',
        'desc',
        'createdAt',
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
        res.render('community', {
        lessons,
        loggedIn: req.session.loggedIn
    });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
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
      'createdAt',
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