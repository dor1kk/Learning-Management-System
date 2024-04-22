

export function SuggestedFriends(req,res, db){  // used to select max 3 students that will appear on suggested friends list on Friends page
    const loggedInUserId = req.session.userid; 
    db.query('SELECT students.*, users.Email FROM students INNER JOIN users ON students.UserID = users.UserID WHERE students.UserID != ? LIMIT 3', [loggedInUserId], (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
}


export function SendFriendRequest(req,res,db){  // checks if the status of friend request is accepted , if its not inserts in the friends table the info of the request sender , needed in Friends page
    const { receiverId } = req.body;
    const senderId = req.session.userid; 
  
    try {
      const existingRequest =  db.query(
        'SELECT * FROM friend_requests WHERE sender_id = ? AND receiver_id = ? AND status = "accepted"',
        [senderId, receiverId]
      );
  
      if (existingRequest.length > 0) {
        return res.status(400).json({ error: 'Friend request already accepted' });
      }
  
       db.query(
        'INSERT INTO friend_requests (sender_id, receiver_id, status) VALUES (?, ?, "pending")',
        [senderId, receiverId]
      );
  
      res.status(200).json({ message: 'Friend request sent successfully' });
    } catch (error) {
      console.error('Error sending friend request:', error);
      res.status(500).json({ error: 'An error occurred while sending the friend request' });
    }
}



export function FriendRequests(req,res,db){ // returns all the friend requests in the Recievers pov, needed in Friends Page
    const userId = req.session.userid; 

    const sql = `
      SELECT DISTINCT friend_requests.id, friend_requests.sender_id, friend_requests.receiver_id, friend_requests.status, friend_requests.created_at, students.Name, students.Image
      FROM friend_requests
      INNER JOIN students ON friend_requests.sender_id = students.UserId
      WHERE friend_requests.receiver_id = ? AND friend_requests.status = 'pending';
    `;
    
    db.query(sql, [userId], (error, results) => {
      if (error) {
        console.error('Error fetching friend requests:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
}



export function MyFriends(req,res,db){  // Select all the students that the logged in user has added as friends
    const userId = req.session.userid;
  db.query(
    `SELECT s.UserId AS ID, s.Name, s.Image
     FROM (
         SELECT CASE
                    WHEN sender_id = ? THEN receiver_id
                    ELSE sender_id
                END AS friend_id
         FROM friend_requests
         WHERE (sender_id = ? OR receiver_id = ?) AND status = 'accepted'
     ) AS friend_ids
     INNER JOIN students AS s ON friend_ids.friend_id = s.UserId;`,
    [userId, userId, userId],
    (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results); 
    }
  );
}



export function AcceptFriendRequest(req,res,db){ //Update the status from pending to accepted, meaning adding a new friend succesfully
    const requestId = req.body.requestId;

    try {
      db.query('UPDATE friend_requests SET status = "accepted" WHERE id = ?', [requestId]);
      
      res.status(200).json({ message: 'Friend request accepted successfully' });
    } catch (error) {
      console.error('Error accepting friend request:', error);
      res.status(500).json({ error: 'An error occurred while accepting friend request' });
    }
}


export function RejectFriendRequest(req,res,db){ // Update the status from pending to reject , meaning rejecting the request
    const requestId = req.body.requestId;

    try {
      db.query('UPDATE friend_requests SET status = "rejected" WHERE id = ?', [requestId]);
      
      res.status(200).json({ message: 'Friend request rejected successfully' });
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      res.status(500).json({ error: 'An error occurred while rejecting friend request' });
    }
}


export function DeleteFriend(req,res,db){  //Removes a friend from the friends table after clicking the remove button
    const { friendId } = req.body; 
    const userId = req.session.userid; 
    try {
      db.query(
        'DELETE FROM friend_requests WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) AND status = "accepted"',
        [userId, friendId, friendId, userId]
      );
  
      res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
      console.error('Error removing friend:', error);
      res.status(500).json({ error: 'An error occurred while removing friend' });
    }

}



