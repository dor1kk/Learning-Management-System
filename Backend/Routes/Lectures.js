

export function getLecturesById(req, res,db) {   // For the LecturesManagement Page

let course_id = req.params.id;
const sql = "SELECT * FROM lectures WHERE CourseID = ?";

db.query(sql, [course_id], (err, result) => {
  if (err) {
    console.error('Error fetching tutor courses:', err);
    return res.status(500).json({ error: "Error occurred while fetching tutor courses" });
  }
  return res.json(result);
});
}

export function getLecturesByCourse(req, res,db) {

let course_id = req.params.id;
  const sql = "SELECT * FROM courses INNER JOIN lectures on courses.CourseID=lectures.CourseID WHERE courses.CourseID = ?";

  db.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error('Error fetching lectures:', err);
      return res.status(500).json({ error: "Error occurred while fetching lectures" });
    }
    return res.json(result);
  });

}



export function getAllLectures(req, res,db) { 


const sql = "SELECT * FROM lectures";

db.query(sql, (err, result) => {
  if (err) {
    console.error('Error fetching tutor courses:', err);
    return res.status(500).json({ error: "Error occurred while fetching tutor courses" });
  }
  return res.json(result);
});

}


export function getSpecificLecture(req, res,db) {  //For displaying the information of the lecture when the view details is clicked in Lecture.js page



let lecture_id = req.params.id;
const sql = "SELECT * FROM lectures WHERE LectureID = ?";

db.query(sql, [lecture_id], (err, result) => {
  if (err) {
    console.error('Error fetching lecture:', err);
    return res.status(500).json({ error: "Error occurred while fetching lecture" });
  }
  return res.json(result[0]); 
});

}


export function getLectureByUserIdAndCourseId(req, res,db) {  //to fetch the lecture of a specific course that has been completed by a specific student


const { userId, courseId } = req.params;

const fetchCompletedLecturesSql = 'SELECT lectureId FROM completed_lectures WHERE userId = ? AND CourseId = ?';
db.query(fetchCompletedLecturesSql, [userId, courseId], (error, results) => {
  if (error) {
    console.error('Error fetching completed lectures:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  const completedLectures = results.map(result => result.lectureId);
  res.status(200).json(completedLectures);
});

}



export function checkLectureCompletionStatus(req, res,db) {  //to check if the lecture has already been completed or not, needed in the Completed-Lectures.js page


const courseId = req.params.courseId; 
  const userId = req.session.userid;

  console.log("Received request to fetch lectures for course:", courseId);
  console.log("User ID:", userId);

  const fetchLecturesSql = `
    SELECT 
      l.LectureID,
      l.LectureTitle AS Title,
      cl.completionDate,
      CASE 
        WHEN cl.lectureid IS NOT NULL THEN 1 
        ELSE 0 
      END AS isCompleted
    FROM 
      lectures l
    LEFT JOIN 
      completed_lectures cl ON l.LectureID = cl.lectureId AND cl.userId = ?
    WHERE
      l.CourseID = ?
    ORDER BY
      l.LectureID
  `;

  console.log("Executing SQL query to fetch lectures...");

  db.query(fetchLecturesSql, [userId, courseId], (error, results) => {
    if (error) {
      console.error('Error fetching lectures:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log("Lectures fetched successfully:", results);

    const lectures = results.map((lecture, index) => ({
      LectureID: lecture.LectureID,
      Title: lecture.Title,
      isCompleted: lecture.isCompleted,
      completionDate: lecture.completionDate,
      isUnlocked: lecture.isCompleted === 1 || index === 0 || (index > 0 && results[index - 1].isCompleted === 1)
    }));

    console.log("Sending lectures data in response:", lectures);

    res.status(200).json(lectures);
  });

}



export function CompleteALecture(req, res,db) { //to complete a lecture needed in Lecture.js page after the complete button is clicked

const { lectureId, courseId } = req.body; 
  const userId = req.session.userid;

  const checkCompletedSql = 'SELECT * FROM completed_lectures WHERE userId = ? AND lectureId = ? AND courseId = ?'; 
  db.query(checkCompletedSql, [userId, lectureId, courseId], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking completed lectures:', checkErr);
      res.status(500).send('Error checking completed lectures');
      return;
    }

    if (checkResult.length > 0) {
      res.status(400).send('Lecture already completed');
      return;
    }

    const insertSql = 'INSERT INTO completed_lectures (userId, lectureId, courseId) VALUES (?, ?, ?)'; 
    db.query(insertSql, [userId, lectureId, courseId], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error marking lecture as completed:', insertErr);
        res.status(500).send('Error marking lecture as completed');
        return;
      }
      console.log('Lecture marked as completed');
      res.status(200).send('Lecture marked as completed');
    });
  });

}





export function AddLecture(req, res,db) {  //Used to add a new lecture in the lectures table

const { CourseID, LectureTitle, LectureImageUrl, LectureDescription, LectureIndex } = req.body;

  db.query(
    "INSERT INTO lectures (CourseID, LectureTitle, Image, LectureContent, LectureIndex) VALUES (?, ?, ?, ?, ?)",
    [CourseID, LectureTitle, LectureImageUrl, LectureDescription, LectureIndex],
    (error, result) => {
      if (error) {
        console.error("Adding Lecture error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({ message: "Lecture added successfully" });
    }
  );

}


export function EditLecture(req, res, db) {
  const { LectureID, LectureTitle, Image, LectureContent } = req.body;

  const sql = 'UPDATE lectures SET LectureTitle = ?, Image = ?, LectureContent = ? WHERE LectureID = ?';
  const values = [LectureTitle, Image, LectureContent, LectureID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error editing lecture:', err);
      res.status(500).json({ error: 'An error occurred while editing the lecture' });
      return;
    }
    console.log('Lecture updated successfully');
    res.status(200).json({ message: 'Lecture updated successfully' });
  });
}


export function DeleteLecture(req,res,db){
  const { id } = req.params;
  
  const sql = 'DELETE FROM lectures WHERE LectureID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting lecture:', err);
      res.status(500).json({ error: 'An error occurred while deleting the lecture' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Lecture not found' });
      return;
    }
    console.log('Lecture deleted successfully');
    res.status(200).json({ message: 'Lecture deleted successfully' });
  });
};

