
import express from "express";
import cors from 'cors';
import mysql from 'mysql';
import session from 'express-session';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "DELETE", "PUT"], // Add DELETE method here
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
  console.log("Deleting course with ID:", courseId); // Add this line to log the course ID being deleted
  const sql = "DELETE FROM courses WHERE CourseID = ?";
  db.query(sql, [courseId], (err, result) => {
    if (err) {
      console.error("Error occurred during delete:", err);
      return res.status(500).json({ error: "An error occurred during delete" });
    }
    console.log("Record deleted successfully"); // Add this line to log successful deletion
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

  db.query("INSERT INTO students (CourseId) VALUES (?)", [courseId], (error, result) => {
    if (error) {
      console.error("Error enrolling student:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(201).json({ message: "Enrolled successfully" });
  });
});




app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
