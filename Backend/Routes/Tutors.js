

export function GetAllTutors(req, res,db) {  // returns all the tutors that exists, needed in the Tutors page
const sql = 'SELECT * FROM tutor';
db.query(sql, (err, result) => {
  if (err) {
    console.error('Error retrieving tutors from database:', err);
    res.status(500).send('Internal Server Error');
    return;
  }
  console.log('Tutors retrieved from database:', result);
  res.status(200).json(result);
});

}


export function AddTutor(req, res,db) {// INSERTS A NEW TUTOR IN THE TUTORS TABLE , needed in the Become A Tutor page
const { name, email, expertise, bio, courses, experience, education, location, contact, availability, image_url } = req.body;
  const userId = req.session.userid;

  if (!userId) {
    return res.status(401).send('Unauthorized');
  }

  const updateSql = 'UPDATE users SET role = "Tutor", username = ?, email = ? WHERE UserID = ?';
  db.query(updateSql, [name, email, userId], function(err, updateResult) {
    if (err) {
      console.error('Error updating user role:', err);
      return res.status(500).send('Internal Server Error');
    }

    const tutorSql = 'INSERT INTO tutor (name, email, expertise, bio, courses, experience, education, location, contact, availability, image_url, UserID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(tutorSql, [name, email, expertise, bio, courses, experience, education, location, contact, availability, image_url, userId], function(err, tutorInsertResult) {
      if (err) {
        console.error('Error inserting into tutors table:', err);
        return res.status(500).send('Internal Server Error');
      }

      console.log('Data saved successfully');
      res.status(200).send('Data saved successfully');
    });
  });

}



export function GetTutorById(req,res,db){ //Returns the tutor info based on his id, needed in Tutor Details page

const tutorId = req.params.id;

const sql = "SELECT * FROM tutors WHERE TutorID = ?";

db.query(sql, [tutorId], (err, result) => {
  if (err) {
    console.error('Error fetching tutor:', err);
    return res.status(500).json({ error: "Error occurred while fetching tutor" });
  }
  if (result.length === 0) {
    return res.status(404).json({ error: "Tutor not found" });
  }
  return res.json(result[0]);
});
}



export function getLoggedInTutorInfo(req,res,db){ // used to get the info of the Logged in tutor, needed in the Account page
    if (!req.session.userid) {
        return res.status(401).send('Unauthorized');
    }
  
    const sql = 'SELECT * FROM tutor INNER JOIN users ON users.UserId = tutor.UserId WHERE users.UserId = ?';
    const userId = req.session.userid;
  
    db.query(sql, userId, (err, result) => {
        if (err) {
            console.error('Error retrieving tutor from database:', err);
            return res.status(500).send('Internal Server Error');
        }
        
        console.log('Tutor retrieved from database:', result);
        res.status(200).json(result);
    });
}