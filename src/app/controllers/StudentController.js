const Yup = require('yup');
const Student = require('../models/Student');
const Score = require('../schemas/Score');

class StudentController {
  async store(req, res) {

    const validate = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required().min(8),
    })

    if (!(await validate.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação do formulário' });
    }

    const { id, name } = await Student.create(req.body);

    await Score.create({
      user_id: id,
      name,
      score: 0,
    })

    return res.send();
  }
}

module.exports = new StudentController();