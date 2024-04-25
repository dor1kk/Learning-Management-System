import React, { useState, useEffect } from "react";
import axios from "axios";
import { List } from "antd";

function Announcements({ courseId }) {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/announcements/${courseId}`);
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  return (
    <div className="p-5">
      <List
        dataSource={announcements}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.announcement_title}
              description={item.announcement_text}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Announcements;
