const { Model, DataTypes, TEXT } = require('sequelize');
const sequelize = require('../config/connection');

class Lesson extends Model {};

Lesson.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1, 
                max: 160
            }
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                min: 1,
                max: 2000
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        topic_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'topic',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: false,
        modelName: 'lesson'
    }
);

module.exports = Lesson;