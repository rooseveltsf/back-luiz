const Yup = require('yup');

const Teacher = require('../models/Teacher');
const Rating = require('../schemas/Rating');

class TeacherController {
  async store(req, res) {

    const validate = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      subject: Yup.string().required(),
      password: Yup.string().required().min(8),
    })

    if (!(await validate.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação do formulário' });
    }

    const { id, name } = await Teacher.create(req.body);

    await Rating.create({
      teacher_id: id,
      rating: [],
      name,
    })

    return res.send();
  }
}

module.exports = new TeacherController();