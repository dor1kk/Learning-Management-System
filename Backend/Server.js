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
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE Username = ? AND Password = ?', [username, password], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log('Results:', results);

    if (results.length > 0) {
      const user = results[0];
      req.session.username = user.Username;
      req.session.role = user.Role;
      req.session.userid = user.UserID;
      req.session.password = user.Password;
      req.session.Email = user.Email;

      let imageQuery;
      if (user.Role === 'Student') {
        imageQuery = 'SELECT Image FROM students WHERE UserID = ?';
      } else if (user.Role === 'Tutor') {
        imageQuery = 'SELECT image_url AS Image FROM tutor WHERE UserID = ?'; // Adjusted table name and column name
      }

      if (imageQuery) {
        db.query(imageQuery, [user.UserID], (imageError, imageResults) => {
          if (imageError) {
            console.error('Error fetching image:', imageError);
            return res.status(500).json({ error: 'Internal server error' });
          }
          if (imageResults.length > 0) {
            req.session.image = imageResults[0].Image;
          } else {
            req.session.image = null; 
          }


          console.log("image", req.session.image);

          console.log('Session:', req.session);
          console.log('Stored username:', req.session.username);
          console.log('Stored TutorID:', req.session.userid);

          return res.json({ Login: true });
        });
      } else {
        console.error('Invalid user role:', user.Role);
        return res.status(400).json({ error: 'Invalid user role' });
      }
    } else {
      return res.json({ Login: false });
    }
  });
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
  const userId = req.params.id;
  console.log("Deleting user with ID:", userId);

  const sql = "DELETE FROM users WHERE UserID = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error occurred during delete:", err);
      return res.status(500).json({ error: "An error occurred during delete" });
    }
    console.log("User deleted successfully"); 
    return res.json({ success: true, message: "User deleted successfully" });
  });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { Username, Password, Role, Email } = req.body; 
  const sql = `UPDATE Users 
               SET Username = ?,
                   Password = ?,
                   Role = ?,
                   Email = ?
               WHERE UserID = ?`;

  db.query(sql, [Username, Password, Role, Email, id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (result.affectedRows === 1) {
      res.status(200).send("User updated successfully");
    } else {
      res.status(404).send('User not found');
    }
  });
});




app.get('/tutoria', (req, res) => {
  if (!req.session.userid) {
      return res.status(401).send('Unauthorized');
  }

  const sql = 'SELECT * FROM tutor INNER JOIN users ON users.UserId = tutor.UserId WHERE users.UserId = ?';
  const userId = req.session.userid;

  db.query(sql, userId, (err, result) => {
      if (err) {
          console.error('Error retrieving tutor from database:', err);
          return res.status(500).send('Internal Server Error');
      }
      
      console.log('Tutor retrieved from database:', result);
      res.status(200).json(result);
  });
});

app.get('/studentsa', (req, res) => {
  if (!req.session.userid) {
      return res.status(401).send('Unauthorized');
  }

  const sql = 'SELECT * FROM students INNER JOIN users ON users.UserId = students.UserId WHERE users.UserId = ?';
  const userId = req.session.userid;

  db.query(sql, userId, (err, result) => {
      if (err) {
          console.error('Error retrieving student from database:', err);
          return res.status(500).send('Internal Server Error');
      }
      
      console.log('Student retrieved from database:', result);
      res.status(200).json(result);
  });
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
