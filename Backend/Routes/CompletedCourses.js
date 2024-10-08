export function AddCompletedCourse(req, res, db) {
  const { courseId, userId, grade } = req.body; 
  const tutorId = req.session.userid;


  console.log("userid", userId);

  const sql = 'INSERT INTO completedcourse (StudentID, CourseID, Grade, TutorID) VALUES (?, ?, ?, ?)';
  db.query(sql, [userId, courseId, grade, tutorId], (error, results) => {
    if (error) {
      console.error('Error creating exam question:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log('Question created successfully.');
    const notificationSql = 'INSERT INTO notifications(UserID, NotificationType, NotificationText) VALUES (?,?,?)';
    const studentIdsSql = 'SELECT UserID FROM students WHERE ID=?';
    const courseTitleSql = 'SELECT Title FROM courses WHERE CourseID=?'; 

  

    db.query(studentIdsSql, [userId], (error, studentIds) => {
      if (error) {
        console.error('Error fetching student IDs:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      db.query(courseTitleSql, [courseId], (error, courseTitleResult) => {
        if (error) {
          console.error('Error fetching course title:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        const courseTitle = courseTitleResult[0].Title; 

        studentIds.forEach(({ UserID }) => {
          const notificationText = `Your course ${courseTitle} has been graded with ${grade} by your tutor.`; 
          db.query(notificationSql, [UserID, 'grade', notificationText], (error, notificationResult) => {
            if (error) {
              console.error('Error inserting notification:', error);
            }
          });
        });

       
        res.status(201).json({ message: 'Course added successfully' });
      });
    });
  });
}



export function getCompletedCourses(req,res,db){
    const studentId=req.session.userid;
  
    const sql = 'SELECT DISTINCT * FROM completedcourse cc inner join users u on u.UserID=cc.StudentID inner join courses c on cc.CourseID=c.CourseID WHERE cc.StudentID=?';
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
      INNER JOIN users u ON u.UserID = cc.StudentID
      Inner JOIN students s on s.UserID=u.UserID
      INNER JOIN courses c ON cc.CourseID = c.CourseID
      WHERE cc.StudentID = ? AND cc.CompletedCourseID = ?
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
