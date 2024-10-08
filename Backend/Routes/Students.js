
export function getStudentByPassedExam(req,res,db){ //returns the info of the Students that have passed a specific exam
    const userID = req.session.userid;
    const sql = `
    SELECT * FROM passed_exams pe
    INNER JOIN users u ON pe.user_id = u.UserID
    INNER JOIN students s ON u.UserID = s.userId
    WHERE s.userId = ?
    
    `;
    db.query(sql, [userID], (error, results) => {
      if (error) {
        console.error('Error fetching exams:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
}


export function getLogggedInStudentInfo(req,res,db){  //returns the logged in student info needed in the account page
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
}


export function UpdatestudentA(req,res,db) {
  // i bon update tdhanat te studenti e ndrrohen edhe te useri
        const { id } = req.params;
        const { Name, Grade, Image } = req.body; 
      
        const sqlUpdate = `
          UPDATE students AS s
          JOIN users AS u ON s.UserId = u.UserID
          SET s.Name = ?,
              s.Grade = ?,
              s.Image = ?,
              u.Username = ?
          WHERE s.ID = ?`;
      
        db.query(sqlUpdate, [Name, Grade,Image, Name, id], (err, result) => {
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
      

}

export function DeletePhotoProfilS(req,res,db){
  // e fshin foton te acounti i studentit
    const id = req.params.id;
    console.log("Deleting student image with ID:", id);
  
    const sql = "UPDATE students SET Image = '' WHERE ID = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error occurred during delete:", err);
            return res.status(500).json({ error: "An error occurred during delete" });
        }
  
        if (result.affectedRows === 0) {
            console.log("User not found");
            return res.status(404).json({ error: "User not found" });
        }
  
        console.log("User image deleted successfully");
        return res.json({ success: true, message: "User image deleted successfully" });
    });
 
  }

  
  export function DeleteProfilS(req, res, db) {
    const { id } = req.params;
  
   
  
   
    const deleteUserSQL = 'DELETE FROM users WHERE UserId = ?';
    db.query(deleteUserSQL, [id], function(error2, results2) {
      if (error2) {
        console.error('Error deleting user:', error2);
        return res.status(500).json({ error: 'Internal server error' });
      }

    const deleteStudentSQL = 'DELETE FROM students WHERE ID = ?';
    db.query(deleteStudentSQL, [id], function(error1, results1) {
      if (error1) {
        console.error('Error deleting student:', error1);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
        res.status(200).json({ message: 'Profile deleted successfully' });
      });
    });
  }
  

  
  export function getStudentByTutor(req, res, db) {
    // returns the info of the Students that have passed a specific exam
    const userID = req.session.userid;
    console.log('UserID from session:', userID);
    console.log('Session info:', req.session);
  
    const sql = `
      SELECT students.Name, students.Image, students.Grade, courses.Title, courses.CourseID, students.UserId
      FROM students
      INNER JOIN enrollments ON students.UserID = enrollments.StudentID
      INNER JOIN courses ON enrollments.CourseID = courses.CourseID
      WHERE courses.TutorID = ?
    `;
  
    db.query(sql, [userID], (error, results) => {
      if (error) {
        console.error('Error fetching exams:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Query results:', results);
      res.json(results);
    });
  }
  


  export function deletestudentfromcourse(req, res, db) {
    const { Student, Course } = req.body;

    console.log(Student, Course)
  
    try {
      db.query(
        'DELETE FROM enrollments WHERE StudentID=? AND CourseID=?',
        [Student, Course],
        (error, results) => {
          if (error) {
            console.error('Error removing student:', error);
            return res.status(500).json({ error: 'An error occurred' });
          }
          res.status(200).json({ message: 'Student removed successfully' });
        }
      );
    } catch (error) {
      console.error('Error removing student:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  
 
