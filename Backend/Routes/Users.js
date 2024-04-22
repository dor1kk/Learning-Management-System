

export function getAllUsers(req,res,db){  // gets all the users in the database , needed in User Management page
    db.query('SELECT * FROM users', (error, results) => {
        if (error) {
          console.error('Error fetching users:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results); 
      });
}


export function DeleteUsers(req,res,db){  //Delete Users  , needed in Users Management page
    const userId = req.params.id;
  console.log("Deleting user with ID:", userId);

  const sql = "DELETE FROM users WHERE UserID = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error occurred during delete:", err);
      return res.status(500).json({ error: "An error occurred during delete" });
    }
    console.log("User deleted successfully"); 
    return res.json({ success: true, message: "User deleted successfully" });
  });
    
}


export function UpdateUsers(req,res,db){  // Update Users, needed in user management page
    const { id } = req.params;
  const { Username, Password, Role, Email } = req.body; 
  const sql = `UPDATE Users 
               SET Username = ?,
                   Password = ?,
                   Role = ?,
                   Email = ?
               WHERE UserID = ?`;

  db.query(sql, [Username, Password, Role, Email, id], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (result.affectedRows === 1) {
      res.status(200).send("User updated successfully");
    } else {
      res.status(404).send('User not found');
    }
  });

}



