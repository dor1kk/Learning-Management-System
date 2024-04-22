
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
  
    const sql = 'SELECT * FROM students INNER JOIN users ON users.UserId = students.UserId WHERE users.UserId = ?';
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