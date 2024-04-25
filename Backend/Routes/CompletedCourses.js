
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



export function getCompletedCourses(req,res,db){
    const studentId=req.session.userid;
  
    const sql = 'SELECT DISTINCT * FROM completedcourse cc Inner join students s on s.ID=cc.StudentID inner join users u on u.UserID=s.UserID inner join courses c on cc.CourseID=c.CourseID WHERE s.UserID=?';
    db.query(sql, [studentId ], (error, results) => {
      if (error) {
        console.error('Error creating exam question:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Succesfully', results});
    });





    
}


export function getCompletedCoursesById(req, res, db) {
    const studentId = req.session.userid;
    const courseId = req.query.courseId; 

    console.log("course id", courseId);
  
    const sql = `
      SELECT DISTINCT cc.*, s.*, u.*, c.*
      FROM completedcourse cc
      INNER JOIN students s ON s.ID = cc.StudentID
      INNER JOIN users u ON u.UserID = s.UserID
      INNER JOIN courses c ON cc.CourseID = c.CourseID
      WHERE s.UserID = ? AND cc.CompletedCourseID = ?
    `;
  
    db.query(sql, [studentId, courseId], (error, results) => {
      if (error) {
        console.error('Error retrieving completed courses:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ message: 'Successfully retrieved completed courses', results });
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
