

export function getCourses(req, res, db) {  //gets all the courses that are in the table needed in the Explore courses page
    const sql = "SELECT * FROM courses";
  db.query(sql, (err, result) => {
      if (err) {
          return res.json({ error: "Error occurred" });
      }
      return res.json(result);
  });
   
  }


  export function getCoursesTutorInfo(req, res, db) {
    const sql = `
      SELECT 
        courses.*,
        tutor.Name AS TutorName,
        tutor.image_url AS TutorProfilePicture,
        AVG(reviews.Rating) AS AverageRating,
        COUNT(reviews.ReviewID) AS NumberOfReviews
      FROM 
        courses
        INNER JOIN tutor ON courses.TutorID=tutor.UserID
        LEFT JOIN reviews ON courses.CourseID = reviews.CourseID
      GROUP BY 
        courses.CourseID;
    `;
    console.log("SQL Query:", sql);
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error occurred during query:", err);
        return res.json({ error: "Error occurred" });
      }
      console.log("Query result:", result);
      return res.json(result);
    });
  }
  



export function getCoursesById(req, res,db) {  //returns the info of a specific course, needed in the course details page

const courseId = req.params.id;

const sql = "SELECT * FROM courses WHERE CourseID = ?";

db.query(sql, [courseId], (err, result) => {
  if (err) {
    console.error('Error fetching course:', err);
    return res.status(500).json({ error: "Error occurred while fetching course" });
  }
  if (result.length === 0) {
    return res.status(404).json({ error: "Course not found" });
  }
  return res.json(result[0]);
});

}









//Courses Management//

export function getCoursesByTutor(req, res,db) {  //gets all the courses of the logged in tutor , needed in Course Management page


const tutorId = req.session.userid;

const sql = "SELECT * FROM courses WHERE TutorID = ?";

db.query(sql, [tutorId], (err, result) => {
  if (err) {
    console.error('Error fetching tutor courses:', err);
    return res.status(500).json({ error: "Error occurred while fetching tutor courses" });
  }
  return res.json(result);
});

}


export function InsertCourse(req, res, db) {
  const { title, description, category, image, prerequisites, duration, lectures, assignments, tutorid } = req.body;

  db.query(
    "INSERT INTO courses (Title, Description, Category, Image, Prerequisites, Duration, Lectures, Assignments, TutorID) VALUES (?,?,?,?,?,?,?,?,?)",
    [title, description, category, image, prerequisites, duration, lectures, assignments, tutorid],
    (error, result) => {
      if (error) {
        console.error("Adding Course error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      
      const notificationSql = 'INSERT INTO notifications(UserID, NotificationType, NotificationText) VALUES (?,?,?)';
      const studentIdsSql = 'SELECT UserID FROM users WHERE Role="Student"';

      db.query(studentIdsSql, (error, studentIds) => {
        if (error) {
          console.error('Error fetching student IDs:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }

        studentIds.forEach(({ UserID }) => {
          db.query(notificationSql, [UserID, 'course_upload', `${title}`], (error, notificationResult) => {
            if (error) {
              console.error('Error inserting notification:', error);
            }
          });
        });

        res.status(201).json({ message: 'Course added successfully' });
      });
    }
  );
}



export function DeleteCourse(req, res,db) { //Delete the course based on its id , needed in Course Management Page
  const courseId = req.params.id;
  console.log("Deleting course with ID:", courseId);
   
  const deleteReviews = 'DELETE FROM reviews WHERE CourseID = ?';
  const deletePassedExams = 'DELETE FROM passed_exams WHERE exam_id IN (SELECT examId FROM exam WHERE courseId = ?)';
  const deleteEnrollments = 'DELETE FROM enrollments WHERE CourseID = ?';
  const deleteCompletedLectures = 'DELETE FROM completed_lectures WHERE CourseID = ?';
  const deleteCompletedCourse = 'DELETE FROM completedcourse WHERE CourseID = ?';
  const deleteAnnouncements = 'DELETE FROM announcements WHERE CourseId = ?';
  const deleteExamQuestions = 'DELETE FROM exam_questions WHERE examId IN (SELECT examId FROM exam WHERE courseId = ?)';
  const deleteExam = 'DELETE FROM exam WHERE courseId = ?';
  const deleteCourse = 'DELETE FROM courses WHERE CourseID = ?';

  db.beginTransaction(err => {
      if (err) {
          console.error('Error starting transaction:', err);
          return res.status(500).json({ error: 'An error occurred starting the transaction' });
      }

      db.query(deleteReviews, [courseId], (err, result) => {
        if (err) {
            return db.rollback(() => {
                console.error('Error deleting from reviews:', err);
                res.status(500).json({ error: 'An error occurred during delete from reviews' });
            });
        }

      db.query(deleteEnrollments, [courseId], (err, result) => {
          if (err) {
              return db.rollback(() => {
                  console.error('Error deleting from enrollments:', err);
                  res.status(500).json({ error: 'An error occurred during delete from enrollments' });
              });
          }

        db.query(deletePassedExams, [courseId], (err, result) => {
          if (err) {
              return db.rollback(() => {
                  console.error('Error deleting from passed_exams:', err);
                  res.status(500).json({ error: 'An error occurred during delete from passed_exams' });
              });
          }

          db.query(deleteCompletedLectures, [courseId], (err, result) => {
              if (err) {
                  return db.rollback(() => {
                      console.error('Error deleting from completed_lectures:', err);
                      res.status(500).json({ error: 'An error occurred during delete from completed_lectures' });
                  });
              }

              db.query(deleteCompletedCourse, [courseId], (err, result) => {
                  if (err) {
                      return db.rollback(() => {
                          console.error('Error deleting from completedcourse:', err);
                          res.status(500).json({ error: 'An error occurred during delete from completedcourse' });
                      });
                  }

                  db.query(deleteAnnouncements, [courseId], (err, result) => {
                      if (err) {
                          return db.rollback(() => {
                              console.error('Error deleting from announcements:', err);
                              res.status(500).json({ error: 'An error occurred during delete from announcements' });
                          });
                      }

                      db.query(deleteExamQuestions, [courseId], (err, result) => {
                          if (err) {
                              return db.rollback(() => {
                                  console.error('Error deleting from exam_questions:', err);
                                  res.status(500).json({ error: 'An error occurred during delete from exam_questions' });
                              });
                          }

                          db.query(deleteExam, [courseId], (err, result) => {
                              if (err) {
                                  return db.rollback(() => {
                                      console.error('Error deleting from exam:', err);
                                      res.status(500).json({ error: 'An error occurred during delete from exam' });
                                  });
                              }

                              db.query(deleteCourse, [courseId], (err, result) => {
                                  if (err) {
                                      return db.rollback(() => {
                                          console.error('Error deleting from courses:', err);
                                          res.status(500).json({ error: 'An error occurred during delete from courses' });
                                      });
                                  }

                                  db.commit(err => {
                                      if (err) {
                                          return db.rollback(() => {
                                              console.error('Error committing transaction:', err);
                                              res.status(500).json({ error: 'An error occurred committing the transaction' });
                                          });
                                      }

                                      console.log("Record and associated data deleted successfully");
                                      res.json({ success: true, message: "Record and associated data deleted successfully" });
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

  


export function UpdateCourse(req, res,db) {  //Update the Course, needed in EditCourse page

const { id } = req.params;
const { Title, Description, Category, Image, Prerequisites, Duration, Lectures, Assignments } = req.body; 
const sql = `UPDATE Courses 
           SET Title = ?,
               Description = ?,
               Category = ?,
               Image = ?,
               Prerequisites = ?,
               Duration = ?,
               Lectures = ?,
               Assignments = ?
           WHERE CourseID = ?`;

db.query(sql, [Title, Description, Category, Image, Prerequisites, Duration, Lectures, Assignments, id], (err, result) => {
if (err) {
  console.error("Error executing SQL query:", err);
  res.status(500).send("Internal Server Error");
  return;
}
if (result.affectedRows === 1) {
  res.status(200).send("Course updated successfully");
} else {
  res.status(404).send('Course not found');
}
});

}



