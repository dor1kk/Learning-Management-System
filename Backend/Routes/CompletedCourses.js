
export function AddCompletedCourse(req,res,db){  // Inserts a new completed course after the tutor grades the exam in grade management
    const { courseId, userId, grade} = req.body; 
    const tutorId=req.session.userid;
  
    const sql = 'INSERT INTO completedcourse (StudentID, CourseID, Grade, TutorID) VALUES (?, ?, ?, ?)';
    db.query(sql, [userId, courseId,grade, tutorId ], (error, results) => {
      if (error) {
        console.error('Error creating exam question:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Question created successfully.');
      res.status(201).json({ message: 'Question created successfully' });
    });
}



export function checkGradeStatus(req,res,db){ // Used to check if a student has already been graded, if he is then an message displays 
    const { courseId, userId } = req.query;
  const sql = 'SELECT * FROM CompletedCourse WHERE CourseID = ? AND StudentID = ?';

  db.query(sql, [courseId, userId], (err, result) => {
    if (err) {
      console.error('Error fetching completed course:', err);
      res.status(500).send('Error checking if user has been graded');
      return;
    }

    if (result.length === 0) {
      res.json({ graded: false });
    } else {
      res.json({ graded: true });
    }
  });
}
