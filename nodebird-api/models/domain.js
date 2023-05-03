const Sequelize = require('sequelize');

class Domain extends Sequelize.Model {
    static initiate(sequelize) {
        Domain.init({
            host: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM('free', 'premium'), // 두 값중 하나만!
                allowNull: false,
            },
            clientSecret: {
                type: Sequelize.UUID, // 충돌 가능성이 매우 적은 랜덤한 문자열
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Domain',
            tableName: 'domains'
        });
    }

    static associate(db) {
        db.Domain.belongsTo(db.User);
    }
};

module.exports = Domain;