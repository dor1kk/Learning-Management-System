

export function addQuestion(req,res,db){  // adds a new question in the selected exam in the front needed in manage questions page
    const { Question, Option1, Option2, Option3, Option4, correctOption, exam } = req.body;
  console.log('Received data:', req.body); 

  const sql = 'INSERT INTO exam_questions (questionText, Option1, Option2, Option3, Option4, correctOption, examId) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [Question, Option1, Option2, Option3, Option4, correctOption, exam], (error, results) => {
    if (error) {
        console.error('Error creating exam question:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      
    console.log('Question created successfully.');
    res.status(201).json({ message: 'Question created successfully' });
  });
}



export function getQuestionsByExam(req,res,db){ // returns all the questions from an specific exam , needed in the take exam page 
    const { examId } = req.params;
  const sql = 'SELECT * FROM exam_questions WHERE examId=?';
  db.query(sql, [examId], (error, results) => {
    if (error) {
      console.error('Error fetching questions:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
}


export function getQuestionsByTutor(req,res,db){ // returns all the questions from an specific exam , needed in the take exam page 
  const tutorId=req.session.userid;
const sql = 'SELECT * FROM exam_questions inner join exam on exam.examId=exam_questions.examId WHERE exam.tutorId=?';
db.query(sql, [tutorId], (error, results) => {
  if (error) {
    console.error('Error fetching questions:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  res.json(results);
});
}


export function DeleteQuestion(req, res, db) {
  const { questionId } = req.body; 

  const sql = 'DELETE FROM exam_questions WHERE questionId = ?';
  db.query(sql, [questionId], (error, results) => {
    if (error) {
      console.error('Error deleting question:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  });
}

export function EditQuestion(req, res, db) {
  const { questionId, questionText, option1, option2, option3, option4, correctOption } = req.body;

  const sql = 'UPDATE exam_questions SET questionText = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, correctOption = ? WHERE questionId = ?';
  db.query(sql, [questionText, option1, option2, option3, option4, correctOption, questionId], (error, results) => {
    if (error) {
      console.error('Error updating question:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question updated successfully' });
  });
}
