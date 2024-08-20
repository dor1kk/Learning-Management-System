import React, { useState } from 'react';
import { Modal, Form, Input, notification } from 'antd';
import axios from 'axios';

const AddAnnouncement = ({ visible, onCancel, fetchAndDisplayAnnouncements, selectedCourse }) => {
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');

  const handleAddAnnouncement = async () => {
    try {
      await axios.post('http://localhost:8080/addannouncement', {
        CourseID: selectedCourse.CourseID,
        announcement_title: newAnnouncementTitle,
        announcement_text: newAnnouncementContent,
      });

      notification.success({
        message: 'Announcement Added',
        description: 'The announcement has been successfully added.',
      });

      fetchAndDisplayAnnouncements(selectedCourse.CourseID);

      setNewAnnouncementTitle('');
      setNewAnnouncementContent('');
      onCancel();
    } catch (error) {
      console.error('Error adding announcement:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while adding the announcement.',
      });
    }
  };

  return (
    <Modal
      title="Add New Announcement"
      visible={visible}
      onOk={handleAddAnnouncement}
      onCancel={onCancel}
    >
      <Form>
        <Form.Item label="Title">
          <Input
            value={newAnnouncementTitle}
            onChange={(e) => setNewAnnouncementTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Content">
          <Input.TextArea
            value={newAnnouncementContent}
            onChange={(e) => setNewAnnouncementContent(e.target.value)}
            rows={4}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAnnouncement;
