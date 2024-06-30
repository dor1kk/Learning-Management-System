
export function addRating(req,res,db){  // adds a new question in the selected exam in the front needed in manage questions page
    const { rating, comment, courseId} = req.body;
    const studentId=req.session.userid;
  console.log('Received data:', req.body); 

  const sql = 'INSERT INTO reviews(Rating, Comment, CourseID, UserID) VALUES (?,?,?,?)'
  db.query(sql, [rating, comment, courseId, studentId], (error, results) => {
    if (error) {
        console.error('Error creating exam question:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      
    console.log('Question created successfully.');
    res.status(201).json({ message: 'Question created successfully' });
  });
}


export function getRatings(req, res, db) {
    const courseId = req.params.id;
  
    const sql = 'SELECT * FROM reviews INNER JOIN students ON students.UserID = reviews.UserID WHERE reviews.CourseID = ?';
    db.query(sql, [courseId], (error, results) => {
      if (error) {
        console.error('Error retrieving ratings:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      
      res.status(200).json({ ratings: results });
    });
  }
  

  export function getRatingsNumber(req, res, db) {
    const courseId = req.params.id;
  
    const sql = 'SELECT COUNT(*) FROM reviews WHERE reviews.CourseID = ?';
    db.query(sql, [courseId], (error, results) => {
      if (error) {
        console.error('Error retrieving ratings:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      
      res.status(200).json({results });
    });
  }
  
  
  export function getRatingsAverage(req, res, db) {
    const courseId = req.params.id;
  
    const sql = 'SELECT AVG(Rating) FROM reviews WHERE reviews.CourseID = ?';
    db.query(sql, [courseId], (error, results) => {
      if (error) {
        console.error('Error retrieving ratings:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      
      res.status(200).json({results });
    });
  }
  

