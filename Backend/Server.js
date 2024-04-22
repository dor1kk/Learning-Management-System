import express from "express";
import cors from 'cors';
import mysql from 'mysql';
import session from 'express-session';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import { Password } from "@mui/icons-material";
import { signUpUser,Logout, signInUser, checkUserId, checkRole, checkUsername } from './Routes/Signin.js'; 
import { getCourses, getCoursesByTutor, getCoursesTutorInfo, getCoursesById, InsertCourse, UpdateCourse, DeleteCourse} from "./Routes/Courses.js";
import { getAllLectures, CompleteALecture, checkLectureCompletionStatus, getLectureByUserIdAndCourseId, AddLecture, getLecturesByCourse, getLecturesById, getSpecificLecture } from "./Routes/Lectures.js";
import { EnrollStudent, GetEnrolledCourses ,DeleteEnrollment } from "./Routes/Enroll.js";
import { GetAllTutors, GetTutorById , getLoggedInTutorInfo, AddTutor  } from "./Routes/Tutors.js";
import { getAllUsers, DeleteUsers, UpdateUsers } from "./Routes/Users.js";
import { MyFriends, AcceptFriendRequest, RejectFriendRequest, FriendRequests, DeleteFriend, SendFriendRequest , SuggestedFriends  } from "./Routes/Friends.js";
import { addNewExam, getPassedExamInfo, AddPassedExam, getPassedExams, getExamsByEnrolledCourses, DeleteExam, UpdateExam, getAvailableExams, getExamsByCourse, getExamsByTutor } from "./Routes/Exams.js";
import { getStudentByPassedExam, getLogggedInStudentInfo } from "./Routes/Students.js";
import { addQuestion, DeleteQuestion, getQuestionsByExam } from "./Routes/Questions.js";
import { AddCompletedCourse, checkGradeStatus } from "./Routes/CompletedCourses.js";
import { getTotalStudents } from "./Routes/Dashboard.js";

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'learning_management_system',
});



//Register- Signin- Logout


app.post('/signup', (req, res) => {
  signUpUser(req, res, db); 
});

app.post('/signin', (req, res) => {
  signInUser(req,res,db);
});



app.get('/userid', (req, res) => {
  checkUserId(req, res); 
});

app.get('/', (req, res) => {
  checkUsername(req, res); 
});

app.get('/role', (req, res) => {
  checkRole(req, res); 
});

app.post('logout'),(req,res)=>{
  Logout(req,res,db);
}







//CoursesInfo And Management


app.get('/courses', (req, res) => {
  getCourses(req,res,db);

});


app.get('/coursestutorinfo', (req, res) => {
    getCoursesTutorInfo(req,res,db)
});


app.get('/tutorcourses', (req, res) => {
  getCoursesByTutor(req,res,db)
});

app.post("/courses", (req, res) => {
  InsertCourse(req,res,db);

});

app.get('/courses/:id', (req, res) => {
    getCoursesById(req,res,db);
});


app.delete('/courses/:id', (req, res) => {
    DeleteCourse(req,res,db);
});

app.put('/courses/:id', (req, res) => {
  UpdateCourse(req,res,db);
});




//Lectures Info and Management



app.get('/lectures/:id', (req, res) => {
  getLecturesById(req,res,db);
 
});


app.get('/lecturescourse/:id', (req, res) => {
    getLecturesByCourse(req,res,db);
});


app.get('/lectures', (req, res) => {
    getAllLectures(req,res,db);
});

app.get('/specificlecture/:id', (req, res) => {
  getSpecificLecture(req,res,db);
});


app.post("/addlecture", (req, res) => {
    AddLecture(req,res,db);
});

app.get('/completed-lectures/:userId/:courseId', (req, res) => {
    getLectureByUserIdAndCourseId(req,res,db);
});


app.get('/lecturess/:courseId', (req, res) => {
  checkLectureCompletionStatus(req,res,db);
  
});


app.post('/completed-lectures', (req, res) => {
    CompleteALecture(req,res,db);
});




//Enrollement info and Management


app.post("/enroll", (req, res) => {
  EnrollStudent(req,res,db);
 
});


app.delete('/enroll/:courseId/:userId', (req, res) => {
    DeleteEnrollment(req,res,db);
});


app.get("/enrolledcourses", (req, res) => {
    GetEnrolledCourses(req,res,db);
});



//Tutor info and Management

app.get('/tutors', (req, res) => {
  GetAllTutors(req,res,db);

});

app.post('/becomeTutor', (req, res) => {
  AddTutor(req,res,db);
  
});

app.get('/tutors/:id', (req, res) => {
    GetTutorById(req,res,db);
});

app.get('/tutoria', (req, res) => {
  getLoggedInTutorInfo(req,res,db);
});



//Users info and Management

app.get('/users', (req, res) => {
  getAllUsers(req,res,db);
});

app.delete('/users/:id', (req, res) => {
  DeleteUsers(req,res,db);
});

app.put('/users/:id', (req, res) => {
  UpdateUsers(req,res,db);
});




app.get('/tutoria', (req, res) => {
  getLoggedInTutorInfo(req,res,db);
});

app.get('/studentsa', (req, res) => {
 getLogggedInStudentInfo(req,res,db);
});















app.get('/friends', (req, res) => {
    SuggestedFriends(req,res,db);
});

app.post('/send-friend-request', (req, res) => {
    SendFriendRequest(req,res,db);
});


app.get('/friend-requests', (req, res) => {
    FriendRequests(req,res,db);
});


app.get('/myfriends', (req, res) => {
    MyFriends(req,res,db);
});

app.post('/accept-friend-request',(req, res) => {
      AcceptFriendRequest(req,res,db);
});

app.post('/reject-friend-request',(req, res) => {
    RejectFriendRequest(req,res,db);
});

app.post('/remove-friend', (req, res) => {
    DeleteFriend(req,res,db);
});




//Exam Info and Management


app.post('/exams', (req, res) => {
  addNewExam(req,res,db);

});

app.delete('/exams/:id', (req, res) => {
    DeleteExam(req,res,db);
});


app.put('/exams/:id', (req, res) => {
  UpdateExam(req,res,db);
});

app.post("/passExam", async (req, res) => {
  AddPassedExam(req,res,db);
});

app.get('/passedexams', (req, res) => {
  getPassedExams(req,res,db);
});

app.get('/available-exams', (req, res) => {
  getAvailableExams(req,res,db);
});


app.get('/exams', (req, res) => {
    getExamsByTutor(req,res,db);
});

app.get('/exams-course/:courseId', (req, res) => {
    getExamsByCourse(req,res,db);
});

app.get('/passedexam', (req, res) => {
  getPassedExamInfo(req,res,db);
});

app.get('/enrolledcoursesexams',(req,res)=>{
  getExamsByEnrolledCourses(req,res,db);
})


//Questions Info and Management

app.post('/addQuestion', (req, res) => {
    addQuestion(req,res,db);
});

app.get('/examsquestions/:examId', (req, res) => {
  getQuestionsByExam(req,res,db);
  
});

app.delete('/question/:id', (req, res) => {
  DeleteQuestion(req,res,db);
});


//Completed Courses

app.post('/completedcourses', (req, res) => {
  AddCompletedCourse(req,res,db);

});



app.get('/completedcourses/graded', (req, res) => {
    checkGradeStatus(req,res,db);
});



//Students Management and Info

app.get('/passedexam-student', (req, res) => {
getStudentByPassedExam(req,res,db);
});


app.get('/studentsa', (req, res) => {
  getLogggedInStudentInfo(req,res,db);
});




//Dashboard Info and Management

app.get('/totalStudents', (req, res) => {
  getTotalStudents(req,res,db);
});











app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
