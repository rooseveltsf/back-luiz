const Sequelize = require('sequelize');
// const mongoose = require('mongoose');

const databaseConfig = require('../config/database');

const Student = require('../app/models/Student');
const Teacher = require('../app/models/Teacher');
const Question = require('../app/models/Question');
const Avatar = require('../app/models/Avatar');

const models = [Student, Teacher, Question, Avatar];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  // mongo() {
  //   this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
  //     useNewUrlParser: true,
  //     useFindAndModify: true,
  //     useUnifiedTopology: true,
  //   });
  // }
}

module.exports = new Database();
