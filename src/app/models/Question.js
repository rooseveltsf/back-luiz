const Sequelize = require('sequelize');

class Question extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.STRING,
        response: Sequelize.STRING,
        alternative: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Teacher, { foreignKey: 'teacher_id', as: 'teacher' });
  }
}

module.exports = Question;
