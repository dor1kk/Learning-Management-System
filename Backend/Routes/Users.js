

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

    db.query("DELETE FROM users WHERE UserID = ?", [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({ error: "An error occurred during deletion" });
        }

        console.log("User deleted successfully");
        return res.json({ success: true, message: "User deleted successfully" });
    });
}




export function UpdateUsers(req, res, db) {
  const { id } = req.params;
  const { Role } = req.body;

  const sqlDeleteFromTutor = `DELETE FROM tutor WHERE UserID = ?`;
  const sqlDeleteExams = `DELETE FROM exam WHERE tutorId = ?`;
  const sqlDeletePassedExams = `DELETE FROM passed_exams WHERE exam_id IN (SELECT examId FROM exam WHERE tutorId = ?)`;
  const sqlSelectExamIds = `SELECT examId FROM exam WHERE tutorId = ?`;
  const sqlDeleteExamQuestions = `DELETE FROM exam_questions WHERE examId = ?`;
  const sqlDeleteNotifications = `DELETE FROM notifications WHERE UserID = ?`;
  const sqlDeleteAnnouncements = `DELETE FROM announcements WHERE TutorId = ?`;
  const sqlDeleteReview = `DELETE FROM reviews WHERE UserID = ?`;
  const sqlDeleteFriendRequests = `DELETE FROM friend_requests WHERE receiver_id = ? OR sender_id = ?`;
  const sqlDeleteFromStudent = `DELETE FROM students WHERE UserId = ?`;
  const sqlMoveToTutor = `INSERT INTO tutor (UserID) VALUES (?)`;
  const sqlMoveToStudent = `INSERT INTO students (UserId) VALUES (?)`;
  const sqlUpdateRole = `UPDATE users SET Role = ? WHERE UserID = ?`;
 const sqlDeleteEmails = `DELETE FROM emails WHERE receiver_id IN (SELECT TutorID FROM tutor WHERE UserID = ?)`;
 const sqlDeleteCompletedCourses = `DELETE FROM completedcourse WHERE StudentID  IN (SELECT ID FROM students WHERE UserId = ?)`;
 const sqlDeleteEnrollments = `DELETE FROM enrollments WHERE StudentID IN (SELECT ID FROM students WHERE UserId = ?)`;


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
      db.query(sqlDeleteAnnouncements, [id], (err, deleteAnnouncementsResult) => {
        if (err) {
            return handleTransactionRollback(db, res, err);
        }
      db.query(sqlDeleteFriendRequests, [id, id], (err, deleteFriendRequestsResult) => {
        if (err) {
            handleTransactionRollback(db, res, err);
            return;
        }
        
       db.query(sqlDeletePassedExams, [id], (err, deletePassedExamsResult) => {
                if (err) {
                    handleTransactionRollback(db, res, err);
                    return;
                }

        db.query(sqlSelectExamIds, [id], (err, examIds) => {
            if (err) {
                handleTransactionRollback(db, res, err);
                return;
            }

            const examIdsArray = examIds.map(exam => exam.examId);

    
            

            examIdsArray.forEach(examId => {
                db.query(sqlDeleteExamQuestions, [examId], (err, deleteExamQuestionsResult) => {
                    if (err) {
                        handleTransactionRollback(db, res, err);
                        return;
                    }
                });
            });

        db.query(sqlDeleteExams, [id], (err, deleteExamsResult) => {
            if (err) {
                return handleTransactionRollback(db, res, err);
            }
           
    
     
        db.query(sqlDeleteReview, [id], (err, deleteReviewResult) => {
            if (err) {
              handleTransactionRollback(db, res, err);
              return;
            }

        db.query(sqlDeleteNotifications, [id], (err, deleteNotificationsResult) => {
            if (err) {
                handleTransactionRollback(db, res, err);
                return;
            }
            db.query(sqlDeleteEmails, [id], (err, deleteEmailsResult) => {
                if (err) {
                    handleTransactionRollback(db, res, err);
                    return;
                }

                db.query(sqlDeleteCompletedCourses, [id], (err) => {
                    if (err) return handleTransactionRollback(db, res, err);

            db.query(deleteSql, [id], (err, deleteResult) => {
                if (err) {
                    handleTransactionRollback(db, res, err);
                    return;
                }

                db.query(sqlDeleteEnrollments, [id], (err, deleteEnrollmentsResult) => {
                    if (err) return callback(err);

                

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

function sendInternalServerError(res) {
  res.status(500).send("Internal Server Error");
}

function handleTransactionRollback(db, res, err) {
  console.error("Error during transaction:", err);
  db.rollback(() => {
      sendInternalServerError(res);
  });
}
