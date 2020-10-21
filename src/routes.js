const express = require('express');

const authSession = require('./app/middlewares/auth');

const StudentController = require('./app/controllers/StudentController');
const TeacherController = require('./app/controllers/TeacherController');
const AuthController = require('./app/controllers/AuthController');
const QuestionsController = require('./app/controllers/QuestionsController');

const routes = express.Router();

routes.post('/register/student', StudentController.store);
routes.post('/register/teacher', TeacherController.store);

routes.post('/session/student', AuthController.studentLogin);
routes.post('/session/teacher', AuthController.teacherLogin);

routes.use(authSession);

routes.get('/dashboard', QuestionsController.index);
routes.post('/questions', QuestionsController.store);

module.exports = routes;