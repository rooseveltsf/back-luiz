const Question = require('../models/Question');

class QuestionController{
  async index(_, res) {
    const questions = await Question.findAll();
    return res.json(questions);
  }

  async store(req, res) {
    const data = req.body;

    await Question.create(data);
    
    return res.send();
  }
}

module.exports = new QuestionController();