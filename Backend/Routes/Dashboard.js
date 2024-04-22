
export function getTotalStudents(req,res,db){ //gets the total number of the students enrolled on a course
    db.query(`
    SELECT COUNT(enrollments.StudentID) AS TotalStudents
    FROM courses
    LEFT JOIN enrollments ON courses.CourseID = enrollments.CourseID;
  `, (error, results) => {
    if (error) {
      console.error('Error fetching total number of students:', error);
      return res.status(500).json({ error: 'Internal error' });
    }
    res.status(200).json({ message: 'Fetched successfully', totalStudents: results[0].TotalStudents });
  });
    
}