// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// //create Topic Model
// class Topic extends Model {};

// // Define Model
// Topic.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         desc: {
//             type: DataTypes.TEXT,
//             allowNull: false, 
//             validate: {
//                 min: 1, 
//                 max: 300
//             }
//         }
//     },
//     {
//         sequelize,
//         freezeTableName: true,
//         underscored: false,
//         modelName: 'topic'
//     }
// );

// module.exports = Topic;