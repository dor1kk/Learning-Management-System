
export function EnrollStudent(req, res,db) {  //Checks if the user is enrolled , if not the is used to enroll the student , needed in Course Details page


const { courseId } = req.body;
const studentId = req.session.userid;

db.query(
  "SELECT * FROM enrollments WHERE CourseId = ? AND StudentID = ?",
  [courseId, studentId],
  (error, results) => {
    if (error) {
      console.error("Error checking enrollment:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Student already enrolled in the course" });
    }

    db.query(
      "INSERT INTO enrollments (CourseId, StudentID) VALUES (?, ?)",
      [courseId, studentId],
      (error, result) => {
        if (error) {
          console.error("Error enrolling student:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({ message: "Enrolled successfully" });
      }
    );
  }
);
}



export function DeleteEnrollment(req, res,db) {  //is used to delete the enrollment of the student, needed in the My courses page

const courseId = req.params.courseId;
const userId = req.params.userId;

console.log("Deleting course with ID:", courseId, "for user ID:", userId); 

const sql = "DELETE FROM enrollments WHERE CourseID = ? AND StudentID = ?";
db.query(sql, [courseId, userId], (err, result) => {
  if (err) {
    console.error("Error occurred during delete:", err);
    return res.status(500).json({ error: "An error occurred during delete" });
  }
  console.log("Record deleted successfully"); 
  return res.json({ success: true, message: "Record deleted successfully" });
});

}



export function GetEnrolledCourses(req, res,db) { // gets all the courses that the loggedin user has been enrolled to

const studentId = req.session.userid;
  db.query(
    "SELECT * FROM courses INNER JOIN enrollments ON courses.CourseID = enrollments.CourseID WHERE enrollments.StudentID = ?",
    [studentId],
    (error, result) => {
      if (error) {
        console.log("Error Fetching enrolled courses ", error);
        return res.status(500).json({ error: "Internal error" });
      }
      res.status(200).json({ message: "Fetched successfully", enrolledCourses: result });
    }
  );


}