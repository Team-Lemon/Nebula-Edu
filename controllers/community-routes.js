const sequelize = require("../config/connection");
const router = require("express").Router();
const withAuth = require('../utils/auth');
const { Lesson, User, Comment } = require("../models");

router.get('/', withAuth, (req, res) => {
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

module.exports = router;