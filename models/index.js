const User = require("./User");
const Topic = require('./Topic');
const Lesson = require("./Lesson");
const Vote = require('./Vote');
const Comment = require("./Comment");

// create relationships
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Lesson, {
    foreignKey: 'user_id'
});

Lesson.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Lesson, {
    through: Vote,
    as: 'voted_lessons',
    foreignKey: 'user_id'
});

Lesson.belongsToMany(User, {
    through: Vote,
    as: 'voted_lessons',
    foreignKey: 'lesson_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Lesson, {
    foreignKey: 'lesson_id'
});

User.hasMany(Vote, {
    foriegnKey: 'user_id'
});

Lesson.hasMany(Vote, {
    foreignKey: 'lesson_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Lesson, {
    foreignKey: 'lesson_id'
});

Lesson.hasMany(Comment, {
    foreignKey: 'lesson_id'
});

Topic.hasMany(Lesson, {
    foreignKey: 'topic_id'
});

Lesson.belongsTo(Topic, {
    foreignKey: 'topic_id'
});

module.exports = { User, Topic, Lesson, Vote, Comment };