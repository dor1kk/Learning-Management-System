

export function getAllUsers(req,res,db){  // gets all the users in the database , needed in User Management page
    db.query('SELECT * FROM users', (error, results) => {
        if (error) {
          console.error('Error fetching users:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results); 
      });
}

export function DeleteUsers(req, res, db) {
    const userId = req.params.userId;
    console.log("Deleting user with ID:", userId);

    if (!userId) {
        console.error("UserID is undefined");
        return res.status(400).json({ error: "UserID is required" });
    }

    db.query("DELETE FROM users WHERE UserID = ?", [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({ error: "An error occurred during deletion" });
        }

        console.log("User deleted successfully");
        return res.json({ success: true, message: "User deleted successfully" });
    });
}
 

export function UpdateUsers(req, res, db) {
  const { id } = req.params;
  const { Role } = req.body;
 const sqlDeleteFromTutor = `DELETE FROM tutor WHERE UserID = ?`;
        const sqlDeleteFromStudent = `DELETE FROM students WHERE UserId = ?`;
        const sqlMoveToTutor = `INSERT INTO tutor (UserID) VALUES (?)`;
        const sqlMoveToStudent = `INSERT INTO students (UserId) VALUES (?)`;
        const sqlUpdateRole = `UPDATE users SET Role = ? WHERE UserID = ?`;
        const sqlGetCurrentRole = `SELECT Role FROM users WHERE UserID = ?`;
        const sqlCheckTutorExists = `SELECT 1 FROM tutor WHERE UserID = ?`;
        const sqlCheckStudentExists = `SELECT 1 FROM students WHERE UserID = ?`;
    
        if (Role === 'Admin') {
            db.query(sqlGetCurrentRole, [id], (err, result) => {
                if (err) return handleError(res, "Error fetching current role", err);
                if (result.length === 0) return res.status(404).send('User not found');
    
                const currentRole = result[0].Role;
                const deleteSql = currentRole === 'Tutor' ? sqlDeleteFromTutor : currentRole === 'Student' ? sqlDeleteFromStudent : null;
    
                if (deleteSql) {
                    db.query(deleteSql, [id], (err) => {
                        if (err) return handleError(res, "Error deleting from current role table", err);
                        updateRole();
                    });
                } else {
                    updateRole();
                }
            });
        } else {
            const checkSql = Role === 'Tutor' ? sqlCheckTutorExists : sqlCheckStudentExists;
            const deleteSql = Role === 'Tutor' ? sqlDeleteFromStudent : sqlDeleteFromTutor;
            const insertSql = Role === 'Tutor' ? sqlMoveToTutor : sqlMoveToStudent;
    
            db.query(checkSql, [id], (err, result) => {
                if (err) return handleError(res, "Error checking existence in target role table", err);
                if (result.length > 0) return res.status(400).send('User already exists in the target role table');
    
                db.query(deleteSql, [id], (err) => {
                    if (err) return handleError(res, "Error deleting from previous role table", err);
    
                    db.query(insertSql, [id], (err) => {
                        if (err) return handleError(res, "Error inserting into new role table", err);
                        updateRole();
                    });
                });
            });
        }
    
        function updateRole() {
            db.query(sqlUpdateRole, [Role, id], (err, updateResult) => {
                if (err) return handleError(res, "Error updating user's role", err);
                if (updateResult.affectedRows === 0) return res.status(404).send('User not found');
                res.status(200).send("User updated successfully");
            });
        }
    
        function handleError(res, message, err) {
            console.error(message, err);
            res.status(500).send(message);
        }
    }
    