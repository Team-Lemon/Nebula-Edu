const { Model, DataTypes, TEXT } = require('sequelize');
const sequelize = require('../config/connection');

class Lesson extends Model {
    static upvote(body, models) {
        return models.Vote.create({
          user_id: body.user_id,
          lesson_id: body.lesson_id
        }).then(() => {
          return Lesson.findOne({
            where: {
              id: body.lesson_id
            },
            attributes: [
              'id',
              'title',
              ,
              [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE lesson.id = vote.lesson_id)'),
                'vote_count'
              ]
            ]
          });
        });
    }
};

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