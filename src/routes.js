const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const authSession = require('./app/middlewares/auth');

const StudentController = require('./app/controllers/StudentController');
const TeacherController = require('./app/controllers/TeacherController');
const AuthController = require('./app/controllers/AuthController');
const QuestionsController = require('./app/controllers/QuestionsController');
const AvatarController = require('./app/controllers/AvatarController');
const ScoreController = require('./app/controllers/ScoreController');
const RatingController = require('./app/controllers/RatingController');

const routes = express.Router();
const upload = multer(multerConfig);

routes.post('/register/student', StudentController.store);
routes.post('/register/teacher', TeacherController.store);

routes.post('/session/student', AuthController.studentLogin);
routes.post('/session/teacher', AuthController.teacherLogin);

routes.use(authSession);

routes.get('/dashboard', QuestionsController.index);
routes.get('/dashboard/:subject', QuestionsController.showFilter);

routes.post('/questions', QuestionsController.store);
routes.get('/score', ScoreController.index);
routes.put('/score/:id', ScoreController.update);

routes.put('/add-avatar', upload.single('file'), AvatarController.store);

routes.get('/rating', RatingController.index);
routes.get('/rating/:id', RatingController.show);
routes.put('/rating/:id', RatingController.update);

module.exports = routes;