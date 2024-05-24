export function AddPost(req, res, db) {
    const newPost = req.body;
    const { type, parent_id = null, title, body } = newPost; 
    const user_id = req.session.userid;

    const query = `
        INSERT INTO forum (user_id, parent_id, title, body, created_at)
        VALUES (?, ?, ?, ?, NOW())
    `;

    db.query(query, [user_id, parent_id, title, body], (error, results) => {
        if (error) {
            console.error('Error inserting post:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ message: 'Post created successfully', postId: results.insertId });
    });
}


export function getForumQuestions(req, res, db) {  
    const sql = "SELECT * FROM forum inner join users on Users.UserID=forum.user_id";
  db.query(sql, (err, result) => {
      if (err) {
          return res.json({ error: "Error occurred" });
      }
      return res.json(result);
  });
   
  }



