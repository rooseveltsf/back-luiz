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
            return `http://192.168.0.120:3333/avatar/${this.path}`;
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
