

export function addNewExam(req,res,db){  //Inserts new exam in the exam table , needed in Add Exam page
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
}


export function DeleteExam(req,res,db){ //Deletes an exam from table, needed in Exam Management Page
    const { examId} = req.body;

  const sql = 'DELETE FROM exam WHERE examId=?';
  db.query(sql, [examId], (error, results) => {
    if (error) {
      console.error('Error creating exam:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Exam deleted successfully' });
  });
}


export function UpdateExam(req,res,db){  //Updates the exam, needed in Edit Exam page
    const { examId, examName, startTime, endTime } = req.body;
    console.log('Received Request Body:', req.body);
    const sql = 'UPDATE exam SET examName=?, startTime=?, endTime=? WHERE examId=?';
    db.query(sql, [examName, startTime, endTime, examId], (error, results) => {
      if (error) {
        console.error('Error editing exam:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Exam edited successfully' });
    });
}


export function AddPassedExam(req,res,db){  //used for inserting an exam in passed exam after the requirements in the front are meet, needed  for takeExam page
    const { examId,score } = req.body;
    const userId = req.session.userid;
  
  
    const sql = "INSERT INTO passed_exams (exam_id, user_id, score) VALUES (?, ?, ?)";
    db.query(sql, [examId, userId, score], (error, results) => {
      if (error) {
        console.error("Error inserting passed exam data:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      console.log("Passed exam data inserted successfully.");
      res.status(201).json({ message: "Passed exam data inserted successfully" });
    });
}


export function getPassedExams(req,res,db){ //get all the info of the passed exam , used in Exam.js to display the exams that the logged in user passed
    const userID = req.session.userid;
  const courseId = req.query.courseId; 
  const sql = `
    SELECT * FROM passed_exams pe inner join exam e on pe.exam_id=e.examId inner join courses c on e.courseId=c.CourseID WHERE user_id = ? 
  `;
  db.query(sql, [userID, courseId], (error, results) => {
    if (error) {
      console.error('Error fetching exams:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
}



export function getAvailableExams(req, res, db) {
    const userId = req.session.userid;
  
    const sql = `
      SELECT DISTINCT exam.*
      FROM exam
      INNER JOIN courses ON exam.courseId = courses.CourseID
      INNER JOIN enrollments ON enrollments.CourseID = courses.CourseID
      WHERE examId NOT IN (
        SELECT exam_id FROM passed_exams WHERE user_id = ?
      )
      AND enrollments.StudentID = ?
    `;
  
    db.query(sql, [userId, userId], (error, results) => {
      if (error) {
        console.error('Error fetching available exams:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
  }
  



export function getExamsByTutor(req,res,db){ // returns the exams that the logged in tutor has created
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
}



export function getExamsByCourse(req,res,db){ //returns the exams that belong to a specific course , which is selected in the front
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
}


export function getPassedExamInfo(req,res,db){ //returns the info of the student that passed the exam in the tutors page grade management
    const tutorid=req.session.userid;

  console.log("user id", req.session.userid);
  const sql = `
  SELECT * FROM passed_exams inner join exam on exam.examId = passed_exams.exam_id inner join students s on s.UserId=passed_exams.user_id Where exam.tutorId=?
  
  `;
  db.query(sql,[tutorid], (error, results) => {
    if (error) {
      console.error('Error fetching exams:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
}


export function getExamsByEnrolledCourses(req, res, db) {
    const sql = `
      SELECT * FROM exam
      INNER JOIN courses ON exam.courseId = courses.CourseID
      INNER JOIN enrollments ON enrollments.CourseID = courses.CourseID
      WHERE enrollments.StudentID = ?; 
    `;
  
    const userId = req.session.userid;
  
    db.query(sql, [userId], (error, results) => {
      if (error) {
        console.error('Error fetching exams:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
  }
  

