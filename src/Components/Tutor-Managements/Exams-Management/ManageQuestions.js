import axios from "axios";
import React, { useEffect, useState } from "react";

function ManageQuestions() {
  const [exam, setExam] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedExamDetails, setSelectedExamDetails] = useState(null);
  const [formData, setFormData] = useState({
    questionText: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "",
  });

  const fetchExam = async () => {
    const response = await axios.get("http://localhost:8080/exams");
    setExam(response.data);
  };

  useEffect(() => {
    fetchExam();
  }, []); 

  const handleExamChange = (e) => {
    const selectedExamId = parseInt(e.target.value);
    const examDetail = exam.find((exam) => exam.examId === selectedExamId);
    setSelectedExamDetails(examDetail);
    setSelectedExam(selectedExamId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData); // Log form data before submission
      await axios.post("http://localhost:8080/addQuestion", {
        Question: formData.questionText,
        Option1: formData.option1,
        Option2: formData.option2,
        Option3: formData.option3,
        Option4: formData.option4,
        correctOption: formData.correctOption,
        exam: selectedExam
      });
      // Clear form after successful submission
      setFormData({
        questionText: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctOption: "",
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input Change - Name:", name, "Value:", value); // Log input change
    if (name === "correctOption") {
      console.log("Correct Option Change - Value:", value); // Log correctOption change
    }
    setFormData({ ...formData, [name]: value });
  };
  
  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    console.log("Option Change - Name:", name, "Value:", value); // Log option change
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="exam-container p-5">
      <div className="row">
        <div className="col-md-11">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="examSelect">Select Exam:</label>
              <select
                id="examSelect"
                className="form-control bg-light"
                value={selectedExam}
                onChange={handleExamChange}
              >
                {exam.map((exam) => (
                  <option key={exam.examId} value={exam.examId}>
                    {exam.examName}
                  </option>
                ))}
              </select>
            </div>
            {selectedExamDetails && (
              <div>
                <h3 className="text-primary">Add Question for: {selectedExamDetails.examName}</h3>
                <div className="form-group">
                  <label htmlFor="questionText">Question:</label>
                  <input
                    type="text"
                    id="questionText"
                    className="form-control"
                    name="questionText"
                    value={formData.questionText}
                    onChange={handleInputChange}
                  />
                </div>
              <div className="d-flex flex-row" style={{gap:"20px"}}>
                <div className="form-group col-md-5">
                  <label htmlFor="option1">Option 1:</label>
                  <input
                    type="text"
                    id="option1"
                    className="form-control"
                    name="option1"
                    value={formData.option1}
                    onChange={handleOptionChange}
                  />
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="option2">Option 2:</label>
                  <input
                    type="text"
                    id="option2"
                    className="form-control"
                    name="option2"
                    value={formData.option2}
                    onChange={handleOptionChange}
                  />
                </div>
                </div>
                <div className="d-flex flex-row" style={{gap:"20px"}}>

                <div className="form-group col-md-5">
                  <label htmlFor="option3">Option 3:</label>
                  <input
                    type="text"
                    id="option3"
                    className="form-control"
                    name="option3"
                    value={formData.option3}
                    onChange={handleOptionChange}
                  />
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="option4">Option 4:</label>
                  <input
                    type="text"
                    id="option4"
                    className="form-control"
                    name="option4"
                    value={formData.option4}
                    onChange={handleOptionChange}
                  />
                </div>
                </div>
                <div className="form-group">
                <select
  id="correctOption"
  className="form-control"
  name="correctOption"
  value={formData.correctOption}
  onChange={handleInputChange}
>
  <option value="option1">{formData.option1}</option>
  <option value="option2">{formData.option2}</option>
  <option value="option3">{formData.option3}</option>
  <option value="option4">{formData.option4}</option>
</select>

                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageQuestions;
