export function getCompletedLecturesNumber(req, res, db) {
    const userId = req.session.userid;
    const courseId = req.query.courseId;

    console.log("completed course id ", courseId);
    console.log("userid ... ", courseId);


    const sql = "SELECT COUNT(id) AS completedCount FROM completed_lectures WHERE userId=? AND CourseID=?";
    db.query(sql, [userId, courseId], (error, completedResults) => {
        if (error) {
            console.error('Error getting completed lectures count:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(completedResults);

    });
}

export function getAllLecturesNumber(req, res, db) {
    const courseId = req.query.courseId;

    console.log("course id ", courseId);

    const sql = "SELECT COUNT(LectureId) AS totalLectures FROM lectures WHERE CourseID=?";
    db.query(sql, [courseId], (error, totalResults) => {
        if (error) {
            console.error('Error getting total lectures count:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(200).json(totalResults);
    });
}
