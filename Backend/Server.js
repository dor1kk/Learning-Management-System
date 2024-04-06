
import express from "express";
import cors from 'cors';
import mysql from 'mysql';
import session from 'express-session';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
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
      console.log('Session:', req.session); 
      console.log('Stored username:', req.session.username); 
      return res.json({ Login: true });
    } else {
      return res.json({ Login: false });
    }
  });
});


app.get('/', (req,res)=>{
  if(req.session.username){
    return res.json({valid: true, username: req.session.username});
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



app.put('/student/:id', (req, res) => {
  const { id } = req.params;
  const { Name, Grade } = req.body; 
  const sql = `UPDATE Students 
               SET Name = ${mysql.escape(Name)},
                   Grade = ${mysql.escape(Grade)}
               WHERE ID = ${mysql.escape(id)}`;
               
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (result.affectedRows === 1) {
      res.status(200).send("Student updated successfully");
    } else {
      res.status(404).send('Student not found');
    }
  });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
