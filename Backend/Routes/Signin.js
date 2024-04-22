export function signUpUser(req, res, db) {
  const { username, password, email, name, image, country } = req.body;
  console.log('Received data:', { username, password, email });

  db.query('INSERT INTO users (Username, Password, Email, Country) VALUES (?, ?, ?,?)', [username, password, email, country], (error, userResults) => {
    if (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    db.query('SELECT UserID FROM users WHERE Username = ?', [username], (error, idResults) => {
      if (error) {
        console.error('Error retrieving UserID:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (idResults.length === 0) {
        console.error('No UserID found for username:', username);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const userId = idResults[0].UserID;

      db.query('INSERT INTO students (Name, Image, UserId, Country) VALUES (?, ?, ?,?)', [name, image, userId, country], (error) => {
        if (error) {
          console.error('Error adding user to students table:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
}

export function signInUser(req, res, db) {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE Username = ? AND Password = ?', [username, password], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log('Results:', results);

    if (results.length > 0) {
      const user = results[0];
      req.session.username = user.Username;
      req.session.userid = user.UserID;
      req.session.password = user.Password;
      req.session.Email = user.Email;
      req.session.role = user.Role;

      req.session.image = null;

      console.log('Session:', req.session);
      console.log('Stored username:', req.session.username);
      console.log('Stored UserID:', req.session.userid);

      return res.json({ Login: true });
    } else {
      return res.json({ Login: false });
    }
  });
}

export function checkUserId(req, res) {
  if (req.session.userid) {
    return res.json({ valid: true, userid: req.session.userid });
  } else {
    return res.json({ valid: false });
  }
}




export function checkUsername(req, res) {
    if (req.session.username) {
      return res.json({ valid: true, username: req.session.username });
    } else {
      return res.json({ valid: false });
    }
  }



  export function checkRole(req, res) {
    if (req.session.role) {
      return res.json({ valid: true, role: req.session.role});
    } else {
      return res.json({ valid: false });
    }
  }
  
  

export function Logout(req,res,db){
    res.clearCookie('token');
    return res.json({ Status: "Success" });
}
