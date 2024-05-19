

export function getAllUsers(req,res,db){  // gets all the users in the database , needed in User Management page
    db.query('SELECT * FROM users', (error, results) => {
        if (error) {
          console.error('Error fetching users:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results); 
      });
}
export function DeleteUsers(req, res, db) { //fshin userat 
  const { userId } = req.params;

  db.beginTransaction((err) => {
    if (err) {
      console.error('Error beginning transaction:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

  
    const deleteStudentQuery = "DELETE FROM students WHERE UserId = ?";

    const deleteTutorQuery = "DELETE FROM tutor WHERE UserID = ?";
  
    const deleteUserQuery = "DELETE FROM users WHERE UserID = ?";

    db.query(deleteStudentQuery, [userId], (error, results) => {
      if (error) {
        console.error('Error deleting user from students table:', error);
        return db.rollback(() => {
          res.status(500).json({ error: 'Internal server error' });
        });
      }

   
      db.query(deleteTutorQuery, [userId], (error, results) => {
        if (error) {
          console.error('Error deleting user from tutor table:', error);
          return db.rollback(() => {
            res.status(500).json({ error: 'Internal server error' });
          });
        }

        
        db.query(deleteUserQuery, [userId], (error, results) => {
          if (error) {
            console.error('Error deleting user from users table:', error);
            return db.rollback(() => {
              res.status(500).json({ error: 'Internal server error' });
            });
          }

        
          db.commit((err) => {
            if (err) {
              console.error('Error committing transaction:', err);
              return db.rollback(() => {
                res.status(500).json({ error: 'Internal server error' });
              });
            }
           
            res.status(200).json({ message: 'User deleted successfully' });
          });
        });
      });
    });
  });
}



export function UpdateUsers(req, res, db) {
  const { id } = req.params;
  const { Role } = req.body;

  const sqlDeleteFromTutor = `DELETE FROM tutor WHERE UserID = ?`;
  const sqlDeleteFromStudent = `DELETE FROM students WHERE UserId = ?`;
  const sqlMoveToTutor = `INSERT INTO tutor (UserID) VALUES (?)`;
  const sqlMoveToStudent = `INSERT INTO students (UserId) VALUES (?)`;
  const sqlUpdateRole = `UPDATE users SET Role = ? WHERE UserID = ?`;

  // Begin transaction for role changes
  db.beginTransaction((err) => {
      if (err) {
          console.error("Error starting transaction:", err);
          return sendInternalServerError(res);
      }

      let deleteSql, insertSql;

      if (Role === 'Tutor') {
          deleteSql = sqlDeleteFromStudent;
          insertSql = sqlMoveToTutor;
      } else if (Role === 'Student') {
          deleteSql = sqlDeleteFromTutor;
          insertSql = sqlMoveToStudent;
      } else if (Role === 'Admin') {
          // If role is 'Admin', update the role directly without moving between tables
          db.query(sqlUpdateRole, [Role, id], (err, updateResult) => {
              if (err) {
                  console.error("Error updating user's role:", err);
                  return sendInternalServerError(res);
              }
              if (updateResult.affectedRows === 1) {
                  res.status(200).send("User updated successfully");
              } else {
                  res.status(404).send('User not found');
              }
          });
          return;
      } else {
          return res.status(400).send('Invalid role');
      }

      db.query(deleteSql, [id], (err, deleteResult) => {
          if (err) {
              handleTransactionRollback(db, res, err);
              return;
          }

          db.query(insertSql, [id], (err, insertResult) => {
              if (err) {
                  handleTransactionRollback(db, res, err);
                  return;
              }

              db.query(sqlUpdateRole, [Role, id], (err, updateResult) => {
                  if (err) {
                      handleTransactionRollback(db, res, err);
                      return;
                  }

                  db.commit((err) => {
                      if (err) {
                          handleTransactionRollback(db, res, err);
                          return;
                      }

                      res.status(200).send("User updated successfully");
                  });
              });
          });
      });
  });
}

function sendInternalServerError(res) {
  res.status(500).send("Internal Server Error");
}

function handleTransactionRollback(db, res, err) {
  console.error("Error during transaction:", err);
  db.rollback(() => {
      sendInternalServerError(res);
  });
}


 
