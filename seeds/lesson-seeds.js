const { Lesson } = require('../models');

const lessonData = [
    {
        title: 'Getting Started with HTML',
        desc: 'HTML is the starting point for many web developers. HTML is an easy, versatile language that makes up the backbone of most websites.',
        user_id: '1',
        topic_id: 1
    },
    {
        title: 'Tags, Elements, and IMGs - Oh My!',
        desc: 'When creating HTML, there are different items that can be used to build the website...',
        user_id: '2',
        topic_id: 1
    },
    {
        title: 'Getting Started with CSS',
        desc: 'CSS is how developers style websites...',
        user_id: '3',
        topic_id: 2
    },
    {
        title: 'How to style Headers',
        desc: 'Styling headers is easy and fun!',
        user_id: '1',
        topic_id: 2
    },
    {
        title: 'Getting Started with Javascript',
        desc: 'Javascript is a powerful programming language that can do everything from basic math calculations to running the powerful applications we use everyday!',
        user_id: '2',
        topic_id: 3
    }, 
    {
        title: 'Javascript Basics',
        desc: 'Javascript Basics gets you started on the basic forms of Javascript..',
        user_id: '3',
        topic_id: 3
    }
]

const seedLessons = () => Lesson.bulkCreate(lessonData);

module.exports = seedLessons;