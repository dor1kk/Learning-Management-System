

export function getAllUsers(req,res,db){  // gets all the users in the database , needed in User Management page
    db.query('SELECT * FROM users', (error, results) => {
        if (error) {
          console.error('Error fetching users:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results); 
      });
}
export function DeleteUsers(req, res, db) { 
  const userId = req.params.userId;
    console.log("Deleting user with ID:", userId);

    if (!userId) {
        console.error("UserID is undefined");
        return res.status(400).json({ error: "UserID is required" });
    }

    db.query("DELETE FROM enrollments WHERE StudentID = ?", [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user records from enrollments table:", err);
            return res.status(500).json({ error: "An error occurred during deletion" });
        }

        db.query("DELETE FROM passed_exams WHERE user_id = ?", [userId], (err, result) => {
            if (err) {
                console.error("Error deleting user records from passed_exams table:", err);
                return res.status(500).json({ error: "An error occurred during deletion" });
            }

            db.query("DELETE FROM completed_lectures WHERE userId IN (SELECT UserID FROM users WHERE UserID = ?)", [userId], (err, result) => {
                if (err) {
                    console.error("Error deleting user records from completed_lectures table:", err);
                    return res.status(500).json({ error: "An error occurred during deletion" });
                }

                db.query("SELECT ID FROM students WHERE UserID = ?", [userId], (err, studentResults) => {
                    if (err) {
                        console.error("Error retrieving StudentID:", err);
                        return res.status(500).json({ error: "An error occurred during deletion" });
                    }

                    if (studentResults.length === 0) {
                        console.error("No corresponding student found for UserID:", userId);
                        return res.status(404).json({ error: "No corresponding student found" });
                    }

                    const studentId = studentResults[0].ID;

                    db.query("DELETE FROM reviews WHERE UserID = ?", [userId], (err, result) => {
                        if (err) {
                            console.error("Error deleting user records from reviews table:", err);
                            return res.status(500).json({ error: "An error occurred during deletion" });
                        }

                        db.query("DELETE FROM friend_requests WHERE sender_id = ? OR receiver_id = ?", [userId, userId], (err, result) => {
                            if (err) {
                                console.error("Error deleting user records from friend_requests table:", err);
                                return res.status(500).json({ error: "An error occurred during deletion" });
                            }

                            db.query("DELETE FROM completedcourse WHERE StudentID = ?", [studentId], (err, result) => {
                                if (err) {
                                    console.error("Error deleting user records from completedcourse table:", err);
                                    return res.status(500).json({ error: "An error occurred during deletion" });
                                }

                                db.query("DELETE FROM notifications WHERE UserID = ?", [userId], (err, result) => {
                                    if (err) {
                                        console.error("Error deleting user notifications:", err);
                                        return res.status(500).json({ error: "An error occurred during deletion" });
                                    }

                                    db.query("DELETE FROM students WHERE UserId = ?", [userId], (err, result) => {
                                        if (err) {
                                            console.error("Error deleting user from students table:", err);
                                            return res.status(500).json({ error: "An error occurred during deletion" });
                                        }

                                        db.query("DELETE FROM tutor WHERE UserID = ?", [userId], (err, result) => {
                                            if (err) {
                                                console.error("Error deleting user from tutor table:", err);
                                                return res.status(500).json({ error: "An error occurred during deletion" });
                                            }

                                            
                            db.query("DELETE FROM completedcourse WHERE TutorID = ?", [studentId], (err, result) => {
                                if (err) {
                                    console.error("Error deleting user records from completedcourse table:", err);
                                    return res.status(500).json({ error: "An error occurred during deletion" });
                                }

                                
                                            db.query("DELETE FROM announcements WHERE TutorId IN (SELECT TutorID FROM tutor WHERE UserID = ?)", [userId], (err, result) => {
                                                if (err) {
                                                    console.error("Error deleting user announcements:", err);
                                                    return res.status(500).json({ error: "An error occurred during deletion" });
                                                }
                                                db.query("DELETE FROM courses WHERE TutorID IN (SELECT TutorID FROM tutor WHERE UserID = ?)", [userId], (err, result) => {
                                                    if (err) {
                                                        console.error("Error deleting user announcements:", err);
                                                        return res.status(500).json({ error: "An error occurred during deletion" });
                                                    }

                                                    db.query("DELETE FROM exam WHERE TutorID IN (SELECT TutorID FROM tutor WHERE UserID = ?)", [userId], (err, result) => {
                                                        if (err) {
                                                            console.error("Error deleting user announcements:", err);
                                                            return res.status(500).json({ error: "An error occurred during deletion" });
                                                        }
                                                        db.query("DELETE FROM lectures WHERE CourseID IN (SELECT CourseID FROM courses WHERE TutorID IN (SELECT TutorID FROM tutor WHERE UserID = ?))", [userId], (err, result) => {
                                                            if (err) {
                                                                console.error("Error deleting user announcements:", err);
                                                                return res.status(500).json({ error: "An error occurred during deletion" });
                                                            }
                                                            db.query("DELETE FROM  exam_questions WHERE examId IN (SELECT examId FROM exam WHERE TutorID IN (SELECT TutorID FROM tutor WHERE UserID = ?))", [userId], (err, result) => {
                                                                if (err) {
                                                                    console.error("Error deleting user announcements:", err);
                                                                    return res.status(500).json({ error: "An error occurred during deletion" });
                                                                }
                                                                db.query("DELETE FROM completed_lectures WHERE lectureId IN (SELECT CourseID FROM courses WHERE TutorID IN (SELECT TutorID FROM tutor WHERE UserID = ?))", [userId], (err, result) => {
                                                                    if (err) {
                                                                        console.error("Error deleting user announcements:", err);
                                                                        return res.status(500).json({ error: "An error occurred during deletion" });
                                                                    }

                                                db.query("DELETE FROM emails WHERE sender_id = ? OR receiver_id = ?", [userId, userId], (err, result) => {
                                                    if (err) {
                                                        console.error("Error deleting user emails:", err);
                                                        return res.status(500).json({ error: "An error occurred during deletion" });
                                                    }

                                                    db.query("DELETE FROM users WHERE UserID = ?", [userId], (err, result) => {
                                                        if (err) {
                                                            console.error("Error deleting user from users table:", err);
                                                            return res.status(500).json({ error: "An error occurred during deletion" });
                                                        }

                                                        console.log("User deleted successfully");
                                                        return res.json({ success: true, message: "User deleted successfully" });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            }); 
                        });
                            });
                            });
                        });
                    });
                    }); 
                    });
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

 
