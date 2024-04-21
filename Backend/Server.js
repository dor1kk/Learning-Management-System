
import express from "express";
import cors from 'cors';
import mysql from 'mysql';
import session from 'express-session';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import { Password } from "@mui/icons-material";

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
  const { username, password, email, name, image } = req.body;
  console.log('Received data:', { username, password, email });

  db.query('INSERT INTO users (Username, Password, Email) VALUES (?, ?, ?)', [username, password, email], (error, userResults) => {
    if (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    db.query('SELECT UserID FROM users WHERE Username = ?', [username], (error, idResults) => {
      if (error) {
        console.error('Error retrieving UserID:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (idResults.length === 0) {
        console.error('No UserID found for username:', username);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const userId = idResults[0].UserID;

      db.query('INSERT INTO students (Name, Grade, Image, UserId) VALUES (?, ?, ?, ?)', [name, '', image, userId], (error) => {
        if (error) {
          console.error('Error adding user to students table:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
});


app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users where Username=? AND Password=?', [username, password], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log('Results:', results); 

    if (results.length > 0) {
      req.session.username = results[0].Username; 
      req.session.role = results[0].Role; 
      req.session.userid = results[0].UserID; 
      req.session.password=results[0].Password;
      req.session.Email=results[0].Email;
      req.session.image=results[0].Image;


      console.log('image', req.session.image)


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


app.get('/', (req, res) => {
  if (req.session && req.session.username) {
    return res.json({ valid: true, username: req.session.username });
  } else {
    return res.json({ valid: false });
  }
});





app.get('/image', (req,res)=>{
  if(req.session.image){
    return res.json({valid: true, image: req.session.image});
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


app.get('/coursestutorinfo', (req, res) => {
  const sql = "SELECT * FROM courses INNER JOIN tutor on courses.TutorID=tutor.UserID";
  console.log("SQL Query:", sql); 
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error occurred during query:", err); 
      return res.json({ error: "Error occurred" });
    }
    console.log("Query result:", result); 
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



app.get('/completed-lectures-count', async (req, res) => {
  const { userId, courseId } = req.query;

  try {
      const result = await db.query('SELECT COUNT(*) AS completedLecturesCount FROM completed_lectures WHERE userId = ? AND courseId = ?', [userId, courseId]);
      const completedLecturesCount = result[0].completedLecturesCount;

      res.json({ completedLecturesCount });
  } catch (error) {
      console.error('Error fetching completed lectures count:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/total-lectures-count', async (req, res) => {
  const { courseId } = req.query;

  try {
      const result = await db.query('SELECT COUNT(*) AS totalLecturesCount FROM lectures WHERE courseId = ?', [courseId]);
      const totalLecturesCount = result[0].totalLecturesCount;

      res.json({ totalLecturesCount });
  } catch (error) {
      console.error('Error fetching total lectures count:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
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

app.post('/becomeTutor', (req, res) => {
  const { name, email, expertise, bio, courses, experience, education, location, contact, availability, image_url } = req.body;
  const userId = req.session.userid;

  if (!userId) {
    return res.status(401).send('Unauthorized');
  }

  const updateSql = 'UPDATE users SET role = "Tutor", username = ?, email = ? WHERE UserID = ?';
  db.query(updateSql, [name, email, userId], function(err, updateResult) {
    if (err) {
      console.error('Error updating user role:', err);
      return res.status(500).send('Internal Server Error');
    }

    const tutorSql = 'INSERT INTO tutor (name, email, expertise, bio, courses, experience, education, location, contact, availability, image_url, UserID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(tutorSql, [name, email, expertise, bio, courses, experience, education, location, contact, availability, image_url, userId], function(err, tutorInsertResult) {
      if (err) {
        console.error('Error inserting into tutor table:', err);
        return res.status(500).send('Failed to insert into tutor table. Please try again.');
      }

    
      const deleteStudentSql = 'DELETE FROM students WHERE UserId = ?';
      db.query(deleteStudentSql, [userId], function(err, deleteResult) {
        if (err) {
          console.error('Error deleting student from students table:', err);
          return res.status(500).send('Internal Server Error');
        }
      
        console.log('User role updated to Tutor, and deleted from students table');
        res.status(200).send('User role updated to Tutor, and deleted from students table');
      });
    });
  });
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


app.get('/userss', (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); 
  });
});

app.get('/users', (req, res) => {
  if (!req.session.userid) {
      return res.status(401).send('Unauthorized');
  }

  const sql = 'SELECT * FROM users  WHERE UserID = ?';
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


app.post("/useri", (req, res) => {
  const { Password } = req.body; 
  const userId = req.session.userid;

  if (!userId) {
    return res.status(401).send('Unauthorized');
  }

  const updateSql = 'UPDATE users SET Password = ? WHERE UserID = ?';
  db.query(updateSql, [Password, userId], function(err, updateResult) {
    if (err) {
      console.error('Error updating user password:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (updateResult && updateResult.affectedRows === 0) {
      const insertSql = 'INSERT INTO users (UserID, Password) VALUES (?, ?)';
      db.query(insertSql, [userId, Password], function(err, insertResult) {
        if (err) {
          console.error('Error inserting new password:', err);
          return res.status(500).send('Failed to insert new password. Please try again.');
        }
        
        console.log('New user inserted.');
        res.status(200).send('New user inserted.');
      });
    } else {
      console.log('Password updated successfully.');
      res.status(200).send('Password updated successfully.');
    }
  });
});

/*app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  console.log("Deleting user with ID:", userId);

  const sql = "DELETE FROM users WHERE UserID = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error occurred during delete:", err);
      return res.status(500).json({ error: "An error occurred during delete" });
    }

    if (result.affectedRows === 0) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User deleted successfully");
    return res.json({ success: true, message: "User deleted successfully" });
  });
});*/



app.delete('/user/:id', (req, res) => {
  const userId = req.params.id;

  const sql = 'DELETE FROM users WHERE UserID=?';
  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
});



app.delete('/users/:id', (req, res) => {
  const { userId} = req.body;

  const sql = 'DELETE FROM users WHERE UserID=?';
  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Error creating users:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'User deleted successfully' });
  });
});



app.put('/editusers/:id', (req, res) => {
  const { Username, Password, Role, Email, UserID } = req.body; 
  const sql = `UPDATE Users 
               SET Username = ?,
                   Password = ?,
                   Role = ?,
                   Email = ?
               WHERE UserID = ?`;

  db.query(sql, [Username, Password, Role, Email, UserID], (err, result) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ success: false, message: 'Failed to update user' });
    } else {
      console.log(result); 
      res.status(200).json({ success: true, message: 'User updated successfully' });
    }
  });
});





app.get('/tutoria', (req, res) => {
  if (!req.session.userid) {
      return res.status(401).send('Unauthorized');
  }

  const sql = 'SELECT * FROM tutor INNER JOIN users ON users.UserID = tutor.UserID WHERE users.UserID = ?';
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

  const sql = 'SELECT * FROM students INNER JOIN users ON users.UserID = students.UserId WHERE users.UserID = ?';
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



app.delete('/tutors/:id', (req, res) => {
  const { id } = req.params;

  const deleteUserSQL = 'DELETE FROM users WHERE UserID = ?';
  db.query(deleteUserSQL, [id], (error, results) => {
    if (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const deleteTutorSQL = 'DELETE FROM tutor WHERE TutorID = ?';
    db.query(deleteTutorSQL, [id], (error2, results2) => {
      if (error2) {
        console.error('Error deleting tutor:', error2);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json({ message: 'Tutor and corresponding user deleted successfully' });
    });
  });
});




app.delete('/students/:id', (req, res) => {
  const { id } = req.params;

  const deleteStudentSQL = 'DELETE FROM students WHERE ID = ?';
  db.query(deleteStudentSQL, [id], (error1, results1) => {
    if (error1) {
      console.error('Error deleting student:', error1);
      return res.status(500).json({ error: 'Internal server error' });
    }
  
    const deleteUserSQL = 'DELETE FROM users WHERE UserID = ?';
    db.query(deleteUserSQL, [id], (error2, results2) => {
      if (error2) {
        console.error('Error deleting user:', error2);
        return res.status(500).json({ error: 'Internal server error' });
      }
      
      res.status(200).json({ message: 'Student and corresponding user deleted successfully' });
    });
  });
});


app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { Name, Grade } = req.body; 

  const sqlUpdate = `
    UPDATE students AS s
    JOIN users AS u ON s.UserId = u.UserID
    SET s.Name = ?,
        s.Grade = ?,
        u.Username = ?
    WHERE s.ID = ?`;

  db.query(sqlUpdate, [Name, Grade, Name, id], (err, result) => {
    if (err) {
      console.error("Error updating student and user:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (result.affectedRows === 1) {
      res.status(200).send("Student and user updated successfully");
    } else {
      res.status(404).send('Student not found');
    }
  });
});


app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { Name, Grade } = req.body; 

  const sqlUpdate = `
    UPDATE students AS s
    JOIN users AS u ON s.UserId = u.UserID
    SET s.Name = ?,
        s.Grade = ?,
        u.Username = ?
    WHERE s.ID = ?`;

  db.query(sqlUpdate, [Name, Grade, Name, id], (err, result) => {
    if (err) {
      console.error("Error updating student and user:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (result.affectedRows === 1) {
      res.status(200).send("Student and user updated successfully");
    } else {
      res.status(404).send('Student not found');
    }
  });
});

app.put('/tutors/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, expertise, bio, courses, experience, education, location, contact, availability } = req.body; 

  const sqlUpdate = `
    UPDATE tutor AS t
    JOIN users AS u ON t.UserID = u.UserID
    SET t.name = ?,
        t.email = ?,
        t.expertise = ?,
        t.bio = ?,
        t.courses = ?,
        t.experience = ?,
        t.education = ?,
        t.location = ?,
        t.contact = ?,
        t.availability = ?,
        u.Username = ?
    WHERE t.TutorID = ?`;

  db.query(sqlUpdate, [name, email, expertise, bio, courses, experience, education, location, contact, availability, name, id], (err, result) => {
    if (err) {
      console.error("Error updating tutor and user:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (result.affectedRows === 1) {
      res.status(200).send("Tutor and user updated successfully");
    } else {
      res.status(404).send('Tutor not found');
    }
  });
});












app.get('/friends', (req, res) => {
  const loggedInUserId = req.session.userid; 
  db.query('SELECT students.*, users.Email FROM students INNER JOIN users ON students.UserID = users.UserID WHERE students.UserID != ? LIMIT 3', [loggedInUserId], (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});






app.post('/send-friend-request', (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.session.userid; 

  try {
    const existingRequest =  db.query(
      'SELECT * FROM friend_requests WHERE sender_id = ? AND receiver_id = ? AND status = "accepted"',
      [senderId, receiverId]
    );

    if (existingRequest.length > 0) {
      return res.status(400).json({ error: 'Friend request already accepted' });
    }

     db.query(
      'INSERT INTO friend_requests (sender_id, receiver_id, status) VALUES (?, ?, "pending")',
      [senderId, receiverId]
    );

    res.status(200).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ error: 'An error occurred while sending the friend request' });
  }
});



app.get('/friend-requests', (req, res) => {
  const userId = req.session.userid; 

  const sql = `
    SELECT DISTINCT friend_requests.id, friend_requests.sender_id, friend_requests.receiver_id, friend_requests.status, friend_requests.created_at, students.Name, students.Image
    FROM friend_requests
    INNER JOIN students ON friend_requests.sender_id = students.UserId
    WHERE friend_requests.receiver_id = ? AND friend_requests.status = 'pending';
  `;
  
  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching friend requests:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});


app.get('/myfriends', (req, res) => {
  const userId = req.session.userid;
  db.query(
    `SELECT s.UserId AS ID, s.Name, s.Image
     FROM (
         SELECT CASE
                    WHEN sender_id = ? THEN receiver_id
                    ELSE sender_id
                END AS friend_id
         FROM friend_requests
         WHERE (sender_id = ? OR receiver_id = ?) AND status = 'accepted'
     ) AS friend_ids
     INNER JOIN students AS s ON friend_ids.friend_id = s.UserId;`,
    [userId, userId, userId],
    (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results); 
    }
  );
});

app.post('/accept-friend-request',(req, res) => {
  const requestId = req.body.requestId;

  try {
    db.query('UPDATE friend_requests SET status = "accepted" WHERE id = ?', [requestId]);
    
    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ error: 'An error occurred while accepting friend request' });
  }
});

app.post('/reject-friend-request',(req, res) => {
  const requestId = req.body.requestId;

  try {
    db.query('UPDATE friend_requests SET status = "rejected" WHERE id = ?', [requestId]);
    
    res.status(200).json({ message: 'Friend request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    res.status(500).json({ error: 'An error occurred while rejecting friend request' });
  }
});

app.post('/remove-friend', (req, res) => {
  const { friendId } = req.body; 
  const userId = req.session.userid; 
  try {
    db.query(
      'DELETE FROM friend_requests WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) AND status = "accepted"',
      [userId, friendId, friendId, userId]
    );

    res.status(200).json({ message: 'Friend removed successfully' });
  } catch (error) {
    console.error('Error removing friend:', error);
    res.status(500).json({ error: 'An error occurred while removing friend' });
  }
});


app.post('/exams', (req, res) => {
  const { courseId, examName, startTime, endTime } = req.body;
  const tutorid=req.session.userid;

  const sql = 'INSERT INTO exam (courseId, examName, startTime, endTime, tutorId) VALUES (?, ?, ?, ?,?)';
  db.query(sql, [courseId, examName, startTime, endTime, tutorid], (error, results) => {
    if (error) {
      console.error('Error creating exam:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Exam created successfully' });
  });
});

app.delete('/exams/:id', (req, res) => {
  const { examId} = req.body;

  const sql = 'DELETE FROM exam WHERE examId=?';
  db.query(sql, [examId], (error, results) => {
    if (error) {
      console.error('Error creating exam:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Exam deleted successfully' });
  });
});


app.put('/exams/:id', (req, res) => {
  const { examId, examName, startTime, endTime } = req.body;
  console.log('Received Request Body:', req.body); // Log the request body
  const sql = 'UPDATE exam SET examName=?, startTime=?, endTime=? WHERE examId=?';
  db.query(sql, [examName, startTime, endTime, examId], (error, results) => {
    if (error) {
      console.error('Error editing exam:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Exam edited successfully' });
  });
});




app.post('/examsquestion', (req, res) => {
  const { examId, questionText, answerText, options, correctOption } = req.body;

  console.log('Received request to add new question:', req.body);

  db.query('INSERT INTO exam_questions (examId, questionText, answerText) VALUES (?, ?, ?)', [examId, questionText, answerText], (error, results) => {
    if (error) {
      console.error('Error inserting question:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const questionId = results.insertId;

    const optionsValues = options.map((option, index) => [questionId, option, index + 1 === correctOption]);

    db.query('INSERT INTO question_options (questionId, Option1, Option2, Option3, Option4, correctOption) VALUES ?', [optionsValues], (error, results) => {
      if (error) {
        console.error('Error inserting options:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      console.log('Question and options added successfully');
      res.status(201).json({ message: 'Question added successfully' });
    });
  });
});




app.get('/exams', (req, res) => {
  const userID = req.session.userid;
  const sql = `
  SELECT * FROM exam WHERE tutorId=?
  `;
  db.query(sql, [userID], (error, results) => {
    if (error) {
      console.error('Error fetching exams:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

app.get('/exams-course/:courseId', (req, res) => {
  const courseId = req.params.courseId; 
  console.log('Received courseId:', courseId); 
  const sql = `
    SELECT * FROM exam WHERE courseId=?
  `;
  db.query(sql, [courseId], (error, results) => { 
    if (error) {
      console.error('Error fetching exams:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

app.get('/examsquestions/:examId', (req, res) => {
  const { examId } = req.params; // Corrected examId parameter access
  const sql = 'SELECT * FROM exam_questions WHERE examId=?';
  db.query(sql, [examId], (error, results) => {
    if (error) {
      console.error('Error fetching questions:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});




app.delete('/question/:id', (req, res) => {
  const { questionId} = req.body;

  const sql = 'DELETE FROM exam_questions WHERE questionId=?';
  db.query(sql, [questionId], (error, results) => {
    if (error) {
      console.error('Error creating exam:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Exam deleted successfully' });
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: "Success" });
});



app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
