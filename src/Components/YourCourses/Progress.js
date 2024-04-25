import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Progress, Tag } from "antd";

function Progressi() {
    const location = useLocation();
    const courseId = location.pathname.split("/")[3];

    const [lecturesNumber, setLecturesNumber] = useState(null);
    const [completedLecturesNumber, setCompletedLecturesNumber] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLecturesNumber = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/lectures-number?courseId=${courseId}`);
                setLecturesNumber(response.data[0].totalLectures); 
            } catch (error) {
                console.error("Error fetching total lectures:", error);
            }
        };

        const fetchCompletedLecturesNumber = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/completed-lectures-number?courseId=${courseId}`);
                setCompletedLecturesNumber(response.data[0].completedCount); 
            } catch (error) {
                console.error("Error fetching completed lectures:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchLecturesNumber();
        fetchCompletedLecturesNumber();
    }, [courseId]);

    const completionPercentage = ((completedLecturesNumber / lecturesNumber) * 100).toFixed(2);

    return (
        <div className="c-container d-flex flex-column justify-content-start align-items-center p-5">
 <h2 className="text-primary">
                <Tag color="blue" style={{ fontSize: '20px', padding:"10px" }}>Progress For Course: {courseId}</Tag>
            </h2>            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="d-flex flex-column">
                    <Progress className="mt-4"  type="circle" percent={parseFloat(completionPercentage)} width={300}  format={() => `${completionPercentage}%`} />

                </div>
            )}
        </div>
    );
}

export default Progressi;
