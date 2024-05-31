export function addAnnouncement(req, res, db) {
    const { CourseID, announcement_title, announcement_text } = req.body;
    const TutorId = req.session.userid;
    console.log('Received data:', req.body);

    const announcementSql = 'INSERT INTO announcements(TutorID, CourseID, announcement_title, announcement_text) VALUES (?,?,?,?)';
    db.query(announcementSql, [TutorId, CourseID, announcement_title ,announcement_text], (error, announcementResult) => {
        if (error) {
            console.error('Error creating announcement:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('Announcement created successfully.');

        const notificationSql = 'INSERT INTO notifications(UserID, NotificationType, NotificationText) VALUES (?,?,?)';
        const studentIdsSql = 'SELECT StudentID FROM enrollments WHERE CourseID = ?';

        db.query(studentIdsSql, [CourseID], (error, studentIds) => {
            if (error) {
                console.error('Error fetching student IDs:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            console.log('Student IDs:', studentIds); 

            studentIds.forEach(({ StudentID }) => {
                const notificationText = `New announcement (${announcement_title}): ${announcement_text}`;
                
                db.query(notificationSql, [StudentID, 'announcement', notificationText], (error, notificationResult) => {
                    if (error) {
                        console.error('Error inserting notification:', error);
                    }
                });
            });

            res.status(201).json({ message: 'Announcement created successfully' });
        });
    });
}




export function getAnnouncements(req, res, db) { 
    const CourseID=req.params.id;
    
   const sql = "SELECT * FROM announcements WHERE CourseID=?";
  db.query(sql,[CourseID], (err, result) => {
      if (err) {
          return res.json({ error: "Error occurred" });
      }
      return res.json(result);
  });
   
  }



  export function EditAnnouncement(req, res, db) {
    const {   AnnouncementID,announcement_title,announcement_text }=req.body;

    console.log("te dhenat", AnnouncementID,announcement_title,announcement_text );
  
    const sql = 'UPDATE announcements SET announcement_text = ?, announcement_title=? WHERE announcement_id = ?';
    const values = [announcement_text,announcement_title, AnnouncementID];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error editing lecture:', err);
        res.status(500).json({ error: 'An error occurred while editing the lecture' });
        return;
      }
      console.log('Lecture updated successfully');
      res.status(200).json({ message: 'Lecture updated successfully' });
    });
  }
  




  export function DeleteAnnouncement(req,res,db){
    const { id } = req.params;

    console.log(id)
    
    const sql = 'DELETE FROM announcements WHERE announcement_id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting lecture:', err);
        res.status(500).json({ error: 'An error occurred while deleting the lecture' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Lecture not found' });
        return;
      }
      console.log('Lecture deleted successfully');
      res.status(200).json({ message: 'Lecture deleted successfully' });
    });
  };
  






