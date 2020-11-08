const seedComments = require('./comment-seeds');
const seedLessons = require('./lesson-seeds');
const seedTopics = require('./topic-seeds');
const seedUsers = require('./user-seeds');
const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedTopics();
    console.log('\n----- TOPICS SEEDED -----\n');

    await seedLessons();
    console.log('\n----- LESSONS SEEDED -----\n');

    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');

    await seedVotes();
    console.log('\n----- VOTES SEEDED -----\n');
};

seedAll();