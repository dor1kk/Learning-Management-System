import React, { useEffect, useState } from "react";
import { Card, Spin, Alert, Button, Tag } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

function CompletedCourses() {
    const [completedCourses, setCompletedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCompletedCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/completedcourses');
            setCompletedCourses(response.data.results);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompletedCourses();
    }, []);

    if (loading) return <Spin tip="Loading..." />;
    if (error) return <Alert message={`Error: ${error.message}`} type="error" />;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit"
        });
      };
    

    return (
        <div className="container p-5">
            <div className="d-flex flex-row flex-wrap justify-content-evenly">
                {completedCourses.map(course => (
                    <Card key={course.CourseID} title={<Tag color="green">Completed</Tag>} className="mt-3" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.1)", height:"200px", width:"400px" }}>
                        <div className="d-flex flex-row align-items-center">
                            <img src={course.Image} alt={course.Title} style={{ height: "80px", marginRight: "20px", borderRadius:"30px 30px" }} />
                            <div>
                                <p><strong>Completion Date:</strong> <br></br><Tag color="yellow">{formatDate(course.CompletionDate)}</Tag> </p>
                                <Button className="text-primary"><Link to={`/Home/Certificate/${course.CompletedCourseID}`} style={{ textDecoration:'none' }}>Get Certificate </Link></Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default CompletedCourses;
