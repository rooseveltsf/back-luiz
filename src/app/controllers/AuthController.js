const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

class AuthController {
  async teacherLogin(req, res) {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({
      where: {
        email,
      }
    })

    if(!teacher) {
      return res.status(400).json({ error: 'Este professor não existe'});
    }

    if (!(await teacher.checkPassword(password))) {
      return res.status(400).json({ error: 'Professor incorreta'});
    }

    const { id, name } = teacher;

    return res.json({
      teacher: {
        id,
        name
      },
      token: jwt.sign({ id }, authConfig.secret),
    });
  }

  async studentLogin(req, res) {
    const { email, password } = req.body;

    const student = await Student.findOne({
      where: {
        email,
      }
    })

    if(!student) {
      return res.status(400).json({ error: 'Aluno não existe'});
    }

    if (!(await student.checkPassword(password))) {
      return res.status(400).json({ error: 'Senha do aluno incorreta'});
    }

    const { id, name } = student;

    return res.json({
      student: {
        id,
        name
      },
      token: jwt.sign({ id }, authConfig.secret),
    });

  }
}

module.exports = new AuthController();