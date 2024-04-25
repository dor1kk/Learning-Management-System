

export function GetAllTutors(req, res,db) {  // returns all the tutors that exists, needed in the Tutors page
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

}

export function AddTutor(req, res, db) {
    const { name, email, expertise, bio, courses, experience, education, location, contact, availability } = req.body;
    const userId = req.session.userid;
  
    if (!userId) {
      return res.status(401).send('Unauthorized');
    }
  
    const selectImageSql = 'SELECT Image FROM students WHERE UserID = ?';
    db.query(selectImageSql, [userId], function(err, imageResult) {
      if (err) {
        console.error('Error retrieving image URL:', err);
        return res.status(500).send('Internal Server Error');
      }
  
      if (imageResult.length === 0) {
        return res.status(404).send('Image not found for the current user');
      }
  
      const imageUrl = imageResult[0].Image;
  
      const updateSql = 'UPDATE users SET role = "Tutor", username = ?, email = ? WHERE UserID = ?';
      db.query(updateSql, [name, email, userId], function(err, updateResult) {
        if (err) {
          console.error('Error updating user role:', err);
          return res.status(500).send('Internal Server Error');
        }
  
        const tutorSql = 'INSERT INTO tutor (name, email, expertise, bio, courses, experience, education, location, contact, availability, image_url, UserID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(tutorSql, [name, email, expertise, bio, courses, experience, education, location, contact, availability, imageUrl, userId], function(err, tutorInsertResult) {
          if (err) {
            console.error('Error inserting into tutors table:', err);
            return res.status(500).send('Internal Server Error');
          }
  
          console.log('Data saved successfully');
          res.status(200).send('Data saved successfully');
        });
      });
    });
  }
  



export function GetTutorById(req,res,db){ //Returns the tutor info based on his id, needed in Tutor Details page

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
}



export function getLoggedInTutorInfo(req,res,db){ // used to get the info of the Logged in tutor, needed in the Account page
    if (!req.session.userid) {
        return res.status(401).send('Unauthorized');
    }
  
    const sql = 'SELECT * FROM tutor INNER JOIN users ON users.UserId = tutor.UserId WHERE users.UserId = ?';
    const userId = req.session.userid;
  
    db.query(sql, userId, (err, result) => {
        if (err) {
            console.error('Error retrieving tutor from database:', err);
            return res.status(500).send('Internal Server Error');
        }
        
        console.log('Tutor retrieved from database:', result);
        res.status(200).json(result);
    });
}


export function PasswordUsers(req,res,db){
// psh i merr do tdhana tuserit qe sjan te tabelat e  tutoriose studenti 
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
}


export function UpdatedPasswordUser(req,res,db){
 // e bon update passwordin te accounti
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

}

export function UpdatedData(req,res,db){
  // i bon update tdhanat te tutori e ndrrohen edhe te useri
  const { id } = req.params;
  const { name, email, expertise, bio, courses, experience, education, location, contact, availability ,image_url} = req.body; 

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
        t.image_url = ?,
        u.Username = ?
    WHERE t.TutorID = ?`;

  db.query(sqlUpdate, [name, email, expertise, bio, courses, experience, education, location, contact, availability,image_url, name, id], (err, result) => {
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
}

export function DeletePhotoProfilt(req,res,db){
  // e fshin foton te acounti i tutorit
  const tutorId = req.params.id;
  console.log("Deleting tutor image with ID:", tutorId);

  const sql = "UPDATE tutor SET image_url = '' WHERE TutorID = ?";
  db.query(sql, [tutorId], (err, result) => {
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



export function DeleteProfilt(req,res,db){
// fshin acountin e tutorit
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
}

