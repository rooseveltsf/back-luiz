const Yup = require('yup');
const Teacher = require('../models/Teacher');

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

    const teacher = await Teacher.create(req.body);

    return res.json(teacher);
  }
}

module.exports = new TeacherController();