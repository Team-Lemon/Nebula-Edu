const { Vote } = require('../models');

const voteData = [
    {
        user_id: '1',
        lesson_id: '1'
    },
    {
        user_id: '2',
        lesson_id: '2'
    },
    {
        user_id: '1',
        lesson_id: '3'
    },
    {
        user_id: '3',
        lesson_id: '4'
    },
    {
        user_id: '2',
        lesson_id: '5'
    },
    {
        user_id: '1',
        lesson_id: '6'
    },
    {
        user_id: '3',
        lesson_id: '1'
    },
    {
        user_id: '1',
        lesson_id: '2'
    },
    {
        user_id: '1',
        lesson_id: '3'
    },
    {
        user_id: '2',
        lesson_id: '4'
    },
    {
        user_id: '3',
        lesson_id: '5'
    },
    {
        user_id: '2',
        lesson_id: '6'
    },
    {
        user_id: '3',
        lesson_id: '6'
    },
    {
        user_id: '2',
        lesson_id: '2'
    },
    {
        user_id: '1',
        lesson_id: '4'
    },
    {
        user_id: '2',
        lesson_id: '5'
    },
    {
        user_id: '2',
        lesson_id: '2'
    },
    {
        user_id: '3',
        lesson_id: '3'
    },
    {
        user_id: '2',
        lesson_id: '6'
    },
    {
        user_id: '1',
        lesson_id: '4'
    }
];

const seedVotes = () => Vote.bulkCreate(voteData);

module.exports = seedVotes;