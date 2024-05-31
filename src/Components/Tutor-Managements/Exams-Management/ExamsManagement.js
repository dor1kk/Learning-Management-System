import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddExamForm from './AddExam';
import EditExam from './EditExam';
import AddQuestion from './AddQuestion';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const ExamManagement = () => {
    const [examToDelete, setExamToDelete] = useState(null);
    const [exams, setExams] = useState([]);
    const [addExamModalVisible, setAddExamModalVisible] = useState(false);
    const [deleteExamModalVisible, setDeleteExamModalVisible] = useState(false);
    const [editExamModalVisible, setEditExamModalVisible] = useState(false);
    const [manageQuestionsModalVisible, setManageQuestionsModalVisible] = useState(false);
    const [examToEdit, setExamToEdit] = useState(null);
    const [selectedExamForQuestions, setSelectedExamForQuestions] = useState(null);

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await axios.get('http://localhost:8080/exams');
            setExams(response.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    const handleAddExam = () => {
        setAddExamModalVisible(true);
    };

    const handleAddExamModalClose = () => {
        setAddExamModalVisible(false);
    };

    const handleDelete = async () => {
        if (examToDelete) {
            try {
                await axios.delete(`http://localhost:8080/exams/${examToDelete}`, { data: { examId: examToDelete } });
                fetchExams();
                setDeleteExamModalVisible(false);
            } catch (error) {
                console.error('Error deleting exam:', error);
            }
        }
    };

    const handleDeleteConfirmation = (examId) => {
        setDeleteExamModalVisible(true);
        setExamToDelete(examId);
    };

    const handleEdit = (exam) => {
        setExamToEdit(exam);
        setEditExamModalVisible(true);
    };

    const handleEditExamModalClose = () => {
        setEditExamModalVisible(false);
        setExamToEdit(null);
    };

    const handleManageQuestions = (exam) => {
        setSelectedExamForQuestions(exam);
        setManageQuestionsModalVisible(true);
    };

    const handleManageQuestionsModalClose = () => {
        setManageQuestionsModalVisible(false);
        setSelectedExamForQuestions(null);
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "numeric",
    
      });
  };
  

  const columns = [
    {
        title: 'Exam Name',
        dataIndex: 'examName',
        key: 'examName',
    },
    {
        title: 'Start Time',
        dataIndex: 'startTime',
        key: 'startTime',
        render: (text, record) => formatDate(text),
    },
    {
        title: 'End Time',
        dataIndex: 'endTime',
        key: 'endTime',
        render: (text, record) => formatDate(text),
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
            <Space size="middle">
                <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                <Button type='secondary' onClick={() => handleDeleteConfirmation(record.examId)} danger icon={<DeleteOutlined />} />
                <Button type="primary" icon={<FaPlus />} onClick={() => handleManageQuestions(record)} />
            </Space>
        ),
    },
]

    

    return (
        <div className="container p-5">
            <div className="exam-management-links">
                <Button type="primary" onClick={handleAddExam}>Add Exam</Button>
                <Modal
                    title="Add Exam"
                    visible={addExamModalVisible}
                    onCancel={handleAddExamModalClose}
                    footer={null}
                >
                    <AddExamForm fetchExams={fetchExams} closeModal={handleAddExamModalClose} />
                </Modal>
                <Link to={'/home/ManageQuestions'} type="primary"  style={{textDecoration:"none", marginLeft:"10px"}}>
                    Manage Questions
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={exams}
                rowKey="examId"
            />
            <Modal
                title="Delete Exam"
                visible={deleteExamModalVisible}
                onOk={handleDelete}
                onCancel={() => setDeleteExamModalVisible(false)}
            >
                <p>Are you sure you want to delete this exam?</p>
            </Modal>
            <Modal
                title="Edit Exam"
                visible={editExamModalVisible}
                onCancel={handleEditExamModalClose}
                footer={null}
            >
                {examToEdit && <EditExam exam={examToEdit} fetchExams={fetchExams} closeModal={handleEditExamModalClose} />}
            </Modal>
            <Modal
                title={`Add Question for ${selectedExamForQuestions?.examName}`}
                visible={manageQuestionsModalVisible}
                onCancel={handleManageQuestionsModalClose}
                footer={null}
            >
                {selectedExamForQuestions && <AddQuestion exam={selectedExamForQuestions} />}
            </Modal>
        </div>
    );
};

export default ExamManagement;
