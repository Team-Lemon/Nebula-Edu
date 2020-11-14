const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Lesson, User, Comment } = require('../models');

router.get('/', withAuth, (req, res) => {
    Lesson.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'desc',
        'createdAt',
        [sequelize.literal
            ("(SELECT COUNT(*) FROM vote WHERE lesson.id = vote.lesson_id)")
        , 'vote_count']
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
        // serialize data before passing to template
        const lessons = dbPostData.map(lessons => lessons.get({ plain: true }));
        res.render('dashboard', { lessons, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/edit-lesson/:id', withAuth, (req, res) => {
    Lesson.findOne({
        where: {
          id: req.params.id,
        },
        attributes: [
          "id",
          "title",
          'desc',
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
            attributes: ["id", "comment_text", "lesson_id", "user_id", 'created_at'],
            include: {
              model: User,
              attributes: ["username"],
            },
          },
          //include the User model here so it can attach the username to the comment
          {
            model: User,
            attributes: ["username"],
          },
        ],
      })
        .then((dbPostData) => {
            const lessons = dbPostData.get({ plain: true });
                res.render('edit-lesson', {
                lessons,
                loggedIn: true
        });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
    });
});

module.exports = router;