export function insertFeedback(req,res,db){
    const { feedback } = req.body;
    const Userid=req.session.userid;
    const sql = 'INSERT INTO feedback (feedbackText, UserID) VALUES (?,?)';
    db.query(sql, [feedback, Userid], (err, result) => {
        if (err) throw err;
        res.send('Feedback submitted.');
    });
}


export function getAllFeedbacks(req,res,db){
    const sql = 'SELECT * FROM feedback';
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ error: "Error occurred" });
        }
        return res.json(result);
    });


}
export function UFeedback (req,res,db){

    const { reply, FeedbackID } = req.body;

    console.log(FeedbackID);
    console.log(reply);
  
    const sqlInsert = `UPDATE feedback SET reply = ? WHERE FeedbackID = ?`;
  
    db.query(sqlInsert, [reply, FeedbackID], (err, result) => {
      if (err) {
        console.error("Error inserting reply:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
  
      if (result.affectedRows === 1) {
        res.status(200).send("Reply inserted successfully");
      } else {
        res.status(404).send('Feedback not found');
      }
    });
 }
  

