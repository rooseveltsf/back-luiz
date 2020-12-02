const Sequelize = require('sequelize');

class Avatar extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://10.0.0.224:3333/avatar/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = Avatar;
