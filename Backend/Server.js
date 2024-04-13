
import express from "express";
import cors from 'cors';
import mysql from 'mysql';
import session from 'express-session';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

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






app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;
  console.log('Received data:', { username, password, email });

  db.query('INSERT INTO users (Username, Password, Email) VALUES (?, ?, ?)', [username, password, email], (error, results) => {
    if (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE Username = ? and Password = ?', [username, password], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log('Results:', results); 

    if (results.length > 0) {
      req.session.username = results[0].Username; 
      req.session.role = results[0].Role; 
      req.session.userid = results[0].UserID; 

      console.log('Session:', req.session); 
      console.log('Stored username:', req.session.username); 
      console.log('Stored TutorID:', req.session.userid); 

      return res.json({ Login: true });
    } else {
      return res.json({ Login: false });
    }
  });
});


app.get('/userid', (req,res)=>{
  if(req.session.userid){
    return res.json({valid: true, userid: req.session.userid});
  } else {
    return res.json({valid: false});
  }
});

app.get('/', (req,res)=>{
  if(req.session.username){
    return res.json({valid: true, username: req.session.username});
  } else {
    return res.json({valid: false});
  }
});

app.get('/role', (req,res)=>{
  if(req.session.role){
    return res.json({valid: true, role: req.session.role});
  } else {
    return res.json({valid: false});
  }
});










app.get('/student', (req, res) => {
  const sql = 'SELECT st.*, courses.Title FROM Users us INNER JOIN Students st ON st.UserID = us.UserID INNER JOIN Courses courses ON courses.CourseID = st.CourseId WHERE us.Role = "Student"';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});

app.get('/courses', (req, res) => {
  const sql = "SELECT * FROM courses";
  db.query(sql, (err, result) => {
      if (err) {
          return res.json({ error: "Error occurred" });
      }
      return res.json(result);
  });
});


app.get('/tutorcourses', (req, res) => {
  const tutorId = req.session.userid;

  const sql = "SELECT * FROM courses WHERE TutorID = ?";

  db.query(sql, [tutorId], (err, result) => {
    if (err) {
      console.error('Error fetching tutor courses:', err);
      return res.status(500).json({ error: "Error occurred while fetching tutor courses" });
    }
    return res.json(result);
  });
});

app.get('/lectures/:id', (req, res) => {
  let course_id = req.params.id;
  const sql = "SELECT * FROM lectures WHERE CourseID = ?";

  db.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error('Error fetching tutor courses:', err);
      return res.status(500).json({ error: "Error occurred while fetching tutor courses" });
    }
    return res.json(result);
  });
});


app.get('/lecturescourse/:id', (req, res) => {
  let course_id = req.params.id;
  const sql = "SELECT * FROM courses INNER JOIN lectures on courses.CourseID=lectures.CourseID WHERE courses.CourseID = ?";

  db.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error('Error fetching lectures:', err);
      return res.status(500).json({ error: "Error occurred while fetching lectures" });
    }
    return res.json(result);
  });
});




app.get('/lectures', (req, res) => {
  const sql = "SELECT * FROM lectures";

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching tutor courses:', err);
      return res.status(500).json({ error: "Error occurred while fetching tutor courses" });
    }
    return res.json(result);
  });
});

app.get('/specificlecture/:id', (req, res) => {
  let lecture_id = req.params.id;
  const sql = "SELECT * FROM lectures WHERE LectureID = ?";

  db.query(sql, [lecture_id], (err, result) => {
    if (err) {
      console.error('Error fetching lecture:', err);
      return res.status(500).json({ error: "Error occurred while fetching lecture" });
    }
    return res.json(result[0]); 
  });
});






app.post("/addlecture", (req, res) => {
  const { CourseID, LectureTitle, LectureImageUrl, LectureDescription, LectureIndex } = req.body;

  db.query(
    "INSERT INTO lectures (CourseID, LectureTitle, Image, LectureContent, LectureIndex) VALUES (?, ?, ?, ?, ?)",
    [CourseID, LectureTitle, LectureImageUrl, LectureDescription, LectureIndex],
    (error, result) => {
      if (error) {
        console.error("Adding Lecture error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({ message: "Lecture added successfully" });
    }
  );
});

app.get('/completed-lectures/:userId/:courseId', (req, res) => {
  const { userId, courseId } = req.params;

  const fetchCompletedLecturesSql = 'SELECT lectureId FROM completed_lectures WHERE userId = ? AND CourseId = ?';
  db.query(fetchCompletedLecturesSql, [userId, courseId], (error, results) => {
    if (error) {
      console.error('Error fetching completed lectures:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const completedLectures = results.map(result => result.lectureId);
    res.status(200).json(completedLectures);
  });
});


app.get('/completed-lectures-info/:userId/:courseId', (req, res) => {
  const { userId, courseId } = req.params;

  const fetchCompletedLecturesSql = 'SELECT * FROM completed_lectures LEFT JOIN lectures On completed_lectures.lectureId=lectures.LectureID WHERE completed_lectures.userId = ? AND completed_lectures.CourseId = ?';
  db.query(fetchCompletedLecturesSql, [userId, courseId], (error, results) => {
    if (error) {
      console.error('Error fetching completed lectures:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const completedLectures = results.map(result => ({
      lectureId: result.lectureId,
      completionDate: result.completionDate,
      Title:result.LectureTitle,
      Image:result.Image,
      CourseId:result.CourseID
    }));
    res.status(200).json(completedLectures);
  });
});




app.post('/completed-lectures', (req, res) => {
  const { lectureId, courseId } = req.body; 
  const userId = req.session.userid;

  const checkCompletedSql = 'SELECT * FROM completed_lectures WHERE userId = ? AND lectureId = ? AND courseId = ?'; 
  db.query(checkCompletedSql, [userId, lectureId, courseId], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking completed lectures:', checkErr);
      res.status(500).send('Error checking completed lectures');
      return;
    }

    if (checkResult.length > 0) {
      res.status(400).send('Lecture already completed');
      return;
    }

    const insertSql = 'INSERT INTO completed_lectures (userId, lectureId, courseId) VALUES (?, ?, ?)'; 
    db.query(insertSql, [userId, lectureId, courseId], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error marking lecture as completed:', insertErr);
        res.status(500).send('Error marking lecture as completed');
        return;
      }
      console.log('Lecture marked as completed');
      res.status(200).send('Lecture marked as completed');
    });
  });
});




app.get('/completed-lectures/:userId', (req, res) => {
  const userId = req.params.userId;

  const sql = 'SELECT * FROM completed_lectures WHERE userId = ?';
  
  db.query(sql, [userId], (err, result) => {
      if (err) {
          console.error('Error fetching completed lectures:', err);
          res.status(500).send('Error fetching completed lectures');
          return;
      }
      res.json(result);
  });
});

app.post("/courses", (req, res) => {
  const { title, description, category, image, prerequisites, duration, lectures, assignments, tutorid } = req.body;

  db.query(
    "INSERT INTO courses (Title, Description, Category, Image, Prerequisites, Duration, Lectures, Assignments, TutorID) VALUES (?,?,?,?,?,?,?,?,?)",
    [title, description, category, image, prerequisites, duration, lectures, assignments, tutorid],
    (error, result) => {
      if (error) {
        console.error("Adding Course error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({ message: "Course added successfully" });
    }
  );
});

app.get('/courses/:id', (req, res) => {
  const courseId = req.params.id;

  const sql = "SELECT * FROM courses WHERE CourseID = ?";

  db.query(sql, [courseId], (err, result) => {
    if (err) {
      console.error('Error fetching course:', err);
      return res.status(500).json({ error: "Error occurred while fetching course" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.json(result[0]);
  });
});


app.delete('/courses/:id', (req, res) => {
  const courseId = req.params.id;
  console.log("Deleting course with ID:", courseId); 
  const sql = "DELETE FROM courses WHERE CourseID = ?";
  db.query(sql, [courseId], (err, result) => {
    if (err) {
      console.error("Error occurred during delete:", err);
      return res.status(500).json({ error: "An error occurred during delete" });
    }
    console.log("Record deleted successfully"); 
    return res.json({ success: true, message: "Record deleted successfully" });
  });
});

app.put('/courses/:id', (req, res) => {
  const { id } = req.params;
  const { Title, Description, Category, Image, Prerequisites, Duration, Lectures, Assignments } = req.body; 
  const sql = `UPDATE Courses 
             SET Title = ?,
                 Description = ?,
                 Category = ?,
                 Image = ?,
                 Prerequisites = ?,
                 Duration = ?,
                 Lectures = ?,
                 Assignments = ?
             WHERE CourseID = ?`;

db.query(sql, [Title, Description, Category, Image, Prerequisites, Duration, Lectures, Assignments, id], (err, result) => {
  if (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).send("Internal Server Error");
    return;
  }
  if (result.affectedRows === 1) {
    res.status(200).send("Course updated successfully");
  } else {
    res.status(404).send('Course not found');
  }
});

});




app.post("/enroll", (req, res) => {
  const { courseId } = req.body;
  const studentId = req.session.userid;

  db.query(
    "SELECT * FROM enrollments WHERE CourseId = ? AND StudentID = ?",
    [courseId, studentId],
    (error, results) => {
      if (error) {
        console.error("Error checking enrollment:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Student already enrolled in the course" });
      }

      db.query(
        "INSERT INTO enrollments (CourseId, StudentID) VALUES (?, ?)",
        [courseId, studentId],
        (error, result) => {
          if (error) {
            console.error("Error enrolling student:", error);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.status(201).json({ message: "Enrolled successfully" });
        }
      );
    }
  );
});


app.delete('/enroll/:courseId/:userId', (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.params.userId;

  console.log("Deleting course with ID:", courseId, "for user ID:", userId); 

  const sql = "DELETE FROM enrollments WHERE CourseID = ? AND StudentID = ?";
  db.query(sql, [courseId, userId], (err, result) => {
    if (err) {
      console.error("Error occurred during delete:", err);
      return res.status(500).json({ error: "An error occurred during delete" });
    }
    console.log("Record deleted successfully"); 
    return res.json({ success: true, message: "Record deleted successfully" });
  });
});



app.get("/enrolledcourses", (req, res) => {
  const studentId = req.session.userid;
  db.query(
    "SELECT * FROM courses INNER JOIN enrollments ON courses.CourseID = enrollments.CourseID WHERE enrollments.StudentID = ?",
    [studentId],
    (error, result) => {
      if (error) {
        console.log("Error Fetching enrolled courses ", error);
        return res.status(500).json({ error: "Internal error" });
      }
      res.status(200).json({ message: "Fetched successfully", enrolledCourses: result });
    }
  );
});

app.get('/totalStudents', (req, res) => {
  db.query(`
    SELECT COUNT(enrollments.StudentID) AS TotalStudents
    FROM courses
    LEFT JOIN enrollments ON courses.CourseID = enrollments.CourseID;
  `, (error, results) => {
    if (error) {
      console.error('Error fetching total number of students:', error);
      return res.status(500).json({ error: 'Internal error' });
    }
    res.status(200).json({ message: 'Fetched successfully', totalStudents: results[0].TotalStudents });
  });
});

app.post('/becomeTutor', (req, res) => {
  const { name, email, expertise, bio, courses, experience, education, location, contact, availability, image_url } = req.body;
  const userId = req.session.userid;
  
  
  const sql = 'INSERT INTO tutor (name, email, expertise, bio, courses, experience, education, location, contact, availability, image_url, UserID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [name, email, expertise, bio, courses, experience, education, location, contact, availability, image_url, userId], (err, result) => {
    if (err) {
      console.error('Error saving data to database:', err);
      return res.status(500).send('Internal Server Error');
    }
    console.log('Data saved to database successfully');
    return res.status(200).send('Data saved successfully');
  });
});




app.get('/tutors', (req, res) => {
  const sql = 'SELECT * FROM tutor';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving tutors from database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('Tutors retrieved from database:', result);
    res.status(200).json(result);
  });
});


app.post('/updateUserRole', (req, res) => {
  const { email, role } = req.body;

  res.json({ message: `User role updated to ${role} for email ${email}` });
});


app.get('/tutors/:id', (req, res) => {
  const tutorId = req.params.id;

  const sql = "SELECT * FROM tutors WHERE TutorID = ?";

  db.query(sql, [tutorId], (err, result) => {
    if (err) {
      console.error('Error fetching tutor:', err);
      return res.status(500).json({ error: "Error occurred while fetching tutor" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Tutor not found" });
    }
    return res.json(result[0]);
  });
});


app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); 
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  console.log("Deleting user with ID:", userId); // Logging the user ID being deleted

  // Assuming your table name is `users`
  const sql = "DELETE FROM users WHERE UserID = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error occurred during delete:", err);
      return res.status(500).json({ error: "An error occurred during delete" });
    }
    console.log("User deleted successfully"); // Logging successful deletion
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



app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
