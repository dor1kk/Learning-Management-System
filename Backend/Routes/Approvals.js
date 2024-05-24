export function getContentApproval(req, res,db) { 
  
    const sql = "SELECT * FROM approval_requests WHERE Status='pending'";
    
    db.query(sql,(err, result) => {
      if (err) {
        console.error('Error fetching tutor courses:', err);
        return res.status(500).json({ error: "Error occurred while fetching tutor courses" });
      }
      return res.json(result);
    });
    
    }

  
  
  
  
  export function InsertCourseRequest(req, res, db) {
    const { title, description, category, image, prerequisites, duration, lectures, assignments, tutorid } = req.body;
  
    const requestDetails = JSON.stringify({
      title,
      description,
      category,
      image,
      prerequisites,
      duration,
      lectures,
      assignments,
    });
  
    db.query(
      "INSERT INTO approval_requests (UserID, RequestType, RequestDetails) VALUES (?, ?, ?)",
      [tutorid, 'course_creation', requestDetails],
      (error, result) => {
        if (error) {
          console.error("Course creation request error:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
  
        res.status(201).json({ message: 'Course creation request submitted successfully', RequestID: result.insertId });
      }
    );
  }

  export function RejectRequest(req, res, db) {
    const { status, responseMessage, requestId } = req.body;
  
    console.log(status, "---", responseMessage, "===", requestId);
  
    const sql = "UPDATE approval_requests SET Status=?, ResponseMessage=? WHERE RequestID=?";
  
    db.query(sql, [status, responseMessage, requestId], (err, result) => {
      if (err) {
        console.error('Error rejecting request:', err);
        return res.status(500).json({ error: "Error occurred while rejecting request" });
      }
      return res.json(result);
    });
  }
  
  export function ApproveCourseRequest (req, res, db) {
  const {approval, responseMessage, requestId  } = req.body; 

  db.query(
    "SELECT * FROM approval_requests WHERE RequestID = ?",
    [requestId],
    (error, results) => {
      if (error) {
        console.error("Fetching approval request error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Request not found" });
      }

      const request = results[0];
      const requestDetails = JSON.parse(request.RequestDetails);

      if (approval === 'approved') {
        db.query(
          "INSERT INTO courses (Title, Description, Category, Image, Prerequisites, Duration, Lectures, Assignments, TutorID) VALUES (?,?,?,?,?,?,?,?,?)",
          [
            requestDetails.title,
            requestDetails.description,
            requestDetails.category,
            requestDetails.image,
            requestDetails.prerequisites,
            requestDetails.duration,
            requestDetails.lectures,
            requestDetails.assignments,
            request.UserID,
          ],
          (error, result) => {
            if (error) {
              console.error("Adding course error:", error);
              return res.status(500).json({ error: "Internal server error" });
            }

            db.query(
              "UPDATE approval_requests SET Status = ?, ResponseDate = NOW(), ResponseMessage = ? WHERE RequestID = ?",
              ['approved', responseMessage, requestId],
              (error) => {
                if (error) {
                  console.error("Updating approval request error:", error);
                  return res.status(500).json({ error: "Internal server error" });
                }

                const notificationSql = 'INSERT INTO notifications (UserID, NotificationType, NotificationText) VALUES (?, ?, ?)';
                const studentIdsSql = 'SELECT UserID FROM users WHERE Role="Student"';

                db.query(studentIdsSql, (error, studentIds) => {
                  if (error) {
                    console.error("Error fetching student IDs:", error);
                    return res.status(500).json({ error: "Internal server error" });
                  }

                  studentIds.forEach(({ UserID }) => {
                    db.query(notificationSql, [UserID, 'course_upload', `${requestDetails.title}`], (error) => {
                      if (error) {
                        console.error("Error inserting notification:", error);
                      }
                    });
                  });

                  res.status(200).json({ message: 'Course approved and created successfully', CourseID: result.insertId });
                });
              }
            );
          }
        );
      } else {
    
        res.status(400).json({ error: "Invalid request" });
      }
    }
  );
}

