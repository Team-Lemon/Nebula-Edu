const { Topic } = require('../models');

const topicData = [
    {
        title: 'HTML',
        desc: 'This section will show you the bascis of website building!'
    },
    {
        title: 'CSS',
        desc: 'This section will show you the ins and out of CSS styling!'
    },
    {
        title: 'Javascript',
        desc: 'Ever wonder how websites did their amazing transitions, animations, and actions! Javascript is one language that can do all of this, and more!'
    }
]

const seedTopics = () => Topic.bulkCreate(topicData);

module.exports = seedTopics;