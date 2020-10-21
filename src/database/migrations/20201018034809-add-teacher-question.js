module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('questions', 'teacher_id', {
      type: Sequelize.INTEGER,
      references: { model: 'teachers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('questions', 'teacher_id');
  },
};
