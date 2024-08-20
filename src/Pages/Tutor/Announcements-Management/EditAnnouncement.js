import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, notification } from 'antd';
import axios from 'axios';

const EditAnnouncement = ({ editAnnouncement, visible, onCancel, fetchAndDisplayAnnouncements, selectedCourse }) => {
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');

  useEffect(() => {
    if (editAnnouncement) {
      setNewAnnouncementTitle(editAnnouncement.announcement_title);
      setNewAnnouncementContent(editAnnouncement.announcement_text);
    }
  }, [editAnnouncement]);

  const handleEditAnnouncement = async () => {
    try {
      await axios.put('http://localhost:8080/editannouncement', {
        AnnouncementID: editAnnouncement.announcement_id,
        announcement_title: newAnnouncementTitle,
        announcement_text: newAnnouncementContent,
      });

      notification.success({
        message: 'Announcement Updated',
        description: 'The announcement has been successfully updated.',
      });

      fetchAndDisplayAnnouncements(selectedCourse.CourseID);

      setNewAnnouncementTitle('');
      setNewAnnouncementContent('');
      onCancel();
    } catch (error) {
      console.error('Error editing announcement:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while editing the announcement.',
      });
    }
  };

  return (
    <Modal
      title="Edit Announcement"
      visible={visible}
      onOk={handleEditAnnouncement}
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

export default EditAnnouncement;
