export function SendEmail(req,res,db){  
    const { TutorID, Subject, Message } = req.body;
    const senderId = req.session.userid; 
  
    const sql="INSERT INTO emails (sender_id, receiver_id, subject, message) VALUES (?,?,?,?)";
    db.query(sql,[senderId, TutorID, Subject, Message], (error,results)=>{
        if (error) {
            console.error("Adding Lecture error:", error);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.status(201).json({ message: "Email send successfully" });
        }
    )
    
}


export function getAllEmails(req,res,db){  
    const receiverId = req.session.userid; 
  
    const sql="SELECT * FROM emails Inner join tutor on emails.receiver_id=tutor.TutorID inner join users on users.UserID=tutor.UserID WHERE tutor.UserID=?";
    db.query(sql,[receiverId], (error,results)=>{
        if (error) {
            console.error("Adding Lecture error:", error);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.status(201).json({results});
        }
    )
}


export function getRepliedEmails(req,res,db){  
    const receiverId = req.session.userid; 
  
    const sql="SELECT * FROM emails Inner join tutor on emails.receiver_id=tutor.TutorID inner join users on users.UserID=tutor.UserID WHERE tutor.UserID=? AND emails.isReply=1";
    db.query(sql,[receiverId], (error,results)=>{
        if (error) {
            console.error("Adding Lecture error:", error);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.status(201).json({results});
        }
    )
}


export function getReplies(req,res,db){  
    const senderId = req.session.userid; 
  
    const sql="SELECT * FROM emails Inner join tutor on emails.receiver_id=tutor.TutorID inner join users on users.UserID=tutor.UserID WHERE emails.sender_id=? AND emails.isReply=1 AND emails.isRead=0";
    db.query(sql,[senderId], (error,results)=>{
        if (error) {
            console.error("getting emails error:", error);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.status(201).json({results});
        }
    )
}

export function getNotRepliedEmails(req,res,db){  
    const receiverId = req.session.userid; 
  
    const sql="SELECT * FROM emails Inner join tutor on emails.receiver_id=tutor.TutorID inner join users on users.UserID=tutor.UserID WHERE tutor.UserID=? AND emails.isReply=0";
    db.query(sql,[receiverId], (error,results)=>{
        if (error) {
            console.error("Adding Lecture error:", error);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.status(201).json({results});
        }
    )
}


export function AddReply(req, res, db) {
    const { reply, email } = req.body;
  
    const sql = "UPDATE emails SET reply = ?, isReply = 1 WHERE id = ?";
    
    db.query(sql, [reply, email], (error, results) => {
      if (error) {
        console.error("Adding reply error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Email not found" });
      }
  
      res.status(201).json({ message: "Reply added successfully" });
    });
  }


  export function MarkAsRead(req, res, db) {
    const { messageId} = req.body;
  
    const sql = "UPDATE emails SET isRead = 1 WHERE id = ?";
    
    db.query(sql, [messageId], (error, results) => {
      if (error) {
        console.error("Adding reply error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Email not found" });
      }
  
      res.status(201).json({ message: "isRead updated successfully" });
    });
  }
  



