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