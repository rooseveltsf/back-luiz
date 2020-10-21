const Yup = require('yup');
const Student = require('../models/Student');

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

    const student = await Student.create(req.body);

    return res.json(student);
  }
}

module.exports = new StudentController();