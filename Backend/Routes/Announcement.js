export function addAnnouncement(req, res, db) {
    const { CourseID, AnnouncementTitle, AnnouncementContent } = req.body;
    const TutorId = req.session.userid;
    console.log('Received data:', req.body);

    const announcementSql = 'INSERT INTO announcements(TutorID, CourseID, announcement_title, announcement_text) VALUES (?,?,?,?)';
    db.query(announcementSql, [TutorId, CourseID, AnnouncementTitle, AnnouncementContent], (error, announcementResult) => {
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

            console.log('Student IDs:', studentIds); // Log the student IDs array

            studentIds.forEach(({ StudentID }) => {
                const notificationText = `New announcement (${AnnouncementTitle}): ${AnnouncementContent}`;
                
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



