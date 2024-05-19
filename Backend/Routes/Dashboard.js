
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



<<<<<<< HEAD
export function TotalStudentss(req,res,db){ //gets the total number of the students 
  db.query(`
  SELECT COUNT(students.ID) AS TotalStudents
  FROM students

=======
export function getTotalTutors(req,res,db){ //gets the total number of the tutors
  db.query(`
  SELECT COUNT(UserID) AS TotalTutors
  FROM users WHERE Role="Tutor"
>>>>>>> origin/main
`, (error, results) => {
  if (error) {
    console.error('Error fetching total number of students:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
<<<<<<< HEAD
  res.status(200).json({ message: 'Fetched successfully', totalStudents: results[0].TotalStudents });
=======
  res.status(200).json({ message: 'Fetched successfully', totalTutors: results[0].TotalTutors });
>>>>>>> origin/main
});
  
}

<<<<<<< HEAD
export function TotalTutorss(req, res, db) {
  db.query(`
      SELECT COUNT(tutor.TutorID) AS TotalTutors
      FROM tutor
  `, (error, results) => {
      if (error) {
          console.error('Error fetching total number of tutors:', error);
          return res.status(500).json({ error: 'Internal error' });
      }
      res.status(200).json({ message: 'Fetched successfully', totalTutors: results[0].TotalTutors });
  });
}

export function TotalUserss(req, res, db) {
  db.query(`
      SELECT COUNT(users.UserID) AS TotalUsers
      FROM users
  `, (error, results) => {
      if (error) {
          console.error('Error fetching total number of users:', error);
          return res.status(500).json({ error: 'Internal error' });
      }
      res.status(200).json({ message: 'Fetched successfully', totalUsers: results[0].TotalUsers });
  });
}

export function TotalCoursess(req, res, db) {
  db.query(`
      SELECT COUNT(courses.CourseID) AS TotalCourses
      FROM courses
  `, (error, results) => {
      if (error) {
          console.error('Error fetching total number of courses:', error);
          return res.status(500).json({ error: 'Internal error' });
      }
      res.status(200).json({ message: 'Fetched successfully', totalCourses: results[0].TotalCourses });
  });
}
=======
export function getAllStudents(req,res,db){ //gets the total number of the tutors
  db.query(`
  SELECT COUNT(UserID) AS TotalStudentat
  FROM users WHERE Role="Student"
`, (error, results) => {
  if (error) {
    console.error('Error fetching total number of students:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
  res.status(200).json({ message: 'Fetched successfully', totalStudentat: results[0].TotalStudentat });
});
  
}


export function getAllCourses(req,res,db){ //gets the total number of the tutors
  db.query(`
  SELECT COUNT(CourseID) AS TotalCourses
  FROM courses
`, (error, results) => {
  if (error) {
    console.error('Error fetching total number of students:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
  res.status(200).json({ message: 'Fetched successfully', totalCourses: results[0].TotalCourses });
});
  
}


export function getAllUsers(req, res, db) {
  db.query(`
    SELECT COUNT(UserID) AS TotalUsers
    FROM users
  `, (error, results) => {
    if (error) {
      console.error('Error fetching total number of users:', error);
      return res.status(500).json({ error: 'Internal error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    const totalUsers = results[0].TotalUsers;

    res.status(200).json({ message: 'Fetched successfully', totalUsers });
  });
}




>>>>>>> origin/main
