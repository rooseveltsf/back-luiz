const Question = require('../models/Question');
const Teacher = require('../models/Teacher');

class QuestionController{
  async index(_, res) {
    const questions = await Question.findAll({
      include: [
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['id', 'name', 'subject']
        }
      ],
      order: [['created_at', 'DESC']],
    });

    console.log(questions)

    return res.json(questions);
  }

  async store(req, res) {
    const { content, response, alternative } = req.body;


    await Question.create({
      content,
      response,
      alternative,
      teacher_id: req.userId,
    });
    
    return res.send();
  }

  async showFilter(req, res) {
    const { subject } = req.params;

    const questionFilter = await Question.findAll({
      include: [
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['name', 'subject'],
          where: {
            subject
          }
        }
      ],
      order: [['created_at', 'DESC']],
    })

    return res.json(questionFilter);
  }
}

module.exports = new QuestionController();