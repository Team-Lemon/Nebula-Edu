const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "This lesson is a great way to get started on HTML!",
        user_id: '3',
        lesson_id: '1'
    },
    {
        comment_text: 'I feel like I understand this subject a little better now',
        user_id: '1',
        lesson_id: '1'
    },
    {
        comment_text: "I didn't know HTML could do this",
        user_id: '2',
        lesson_id: '2'
    },
    {
        comment_text: "So that's what they're called.",
        user_id: '1',
        lesson_id: '2'
    },
    {
        comment_text: 'So CSS is used to style a website. Cool!',
        user_id: '3',
        lesson_id: '3'
    },
    {
        comment_text: 'CSS seems a little complicated to me. Anyone know any examples on how this is done?',
        user_id: '1',
        lesson_id: '3'
    },
    {
        comment_text: 'This is awesome!',
        user_id: '1',
        lesson_id: '4'
    },
    {
        comment_text: 'I really like this lesson!',
        user_id: '3',
        lesson_id: '4'
    },
    {
        comment_text: 'Javascript seems a little complex',
        user_id: '1',
        lesson_id: '5'
    },
    {
        comment_text: 'So Javascript powers the internet?',
        user_id: '2',
        lesson_id: '5'
    },
    {
        comment_text: 'what all can you do with Javascript?',
        user_id: '1',
        lesson_id: '6'
    },
    {
        comment_text: "Here's a great book I recently read...",
        user_id: '1',
        lesson_id: '6'
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;