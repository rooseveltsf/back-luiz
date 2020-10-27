const jwt = require('jsonwebtoken');

const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Avatar = require('../models/Avatar');
const Score = require('../schemas/Score');

const authConfig = require('../../config/auth');

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

    const { id, name, subject } = teacher;

    return res.json({
      user: {
        id,
        name,
        subject
      },
      token: jwt.sign({ id }, authConfig.secret),
    });
  }

  async studentLogin(req, res) {
    const { email, password } = req.body;

    const student = await Student.findOne({
      where: {
        email,
      },
      include: [
        {
          model: Avatar,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
    })

    if(!student) {
      return res.status(400).json({ error: 'Aluno não existe'});
    }

    if (!(await student.checkPassword(password))) {
      return res.status(400).json({ error: 'Senha do aluno incorreta'});
    }

    const { id, name, avatar } = student;

    const { _id } = await Score.findOne({
      'user_id' : id
    })

    console.log(_id);

    return res.json({
      user: {
        id,
        name,
        score_id: _id,
        avatar
      },
      token: jwt.sign({ id }, authConfig.secret),
    });

  }
}

module.exports = new AuthController();