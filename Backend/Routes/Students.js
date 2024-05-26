
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

  
  