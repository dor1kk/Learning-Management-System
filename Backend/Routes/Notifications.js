export function getNotifications(req, res, db) {
    const UserID = req.session.userid;
  
    const sql = "SELECT * FROM notifications WHERE UserID = ? AND isRead=0 LIMIT 100";
  
    db.query(sql, [UserID], (err, result) => {
      if (err) {
        console.error('Error fetching notifications:', err);
        return res.status(500).json({ error: "Error occurred while fetching notifications" });
      }
      return res.json(result); // Return the entire result array
    });
  }


  export function markNotificationsAsRead(req, res, db) {
    const UserID = req.session.userid;
    const NotificationId=req.params.id;
  
    const updateSql = "UPDATE notifications SET isRead = 1 WHERE UserID = ? AND isRead = 0 AND NotificationID=?";
  
    db.query(updateSql, [UserID, NotificationId], (err, result) => {
        if (err) {
            console.error('Error updating notifications:', err);
            return res.status(500).json({ error: "Error occurred while updating notifications" });
        }
        return res.status(200).json({ message: "Notifications marked as read successfully" });
    });
}




  