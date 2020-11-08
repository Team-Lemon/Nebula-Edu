const { User } = require('../models');

const userData = [
    {
        username: 'user01',
        password: 'password01'
    },
    {
        username: 'user02',
        password: 'password02'
    },
    {
        username: 'user03',
        password: 'password03'
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;