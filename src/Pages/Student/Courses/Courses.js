import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHtml5, FaNodeJs, FaDatabase, FaCalculator, FaPython, FaJava, FaCloud } from 'react-icons/fa';
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/coursestutorinfo');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  if (courses.length === 0) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const filteredCourses = courses.filter((course) => {
    if (category && course.Category && course.Category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    return true;
  });

  const sortedCourses = filteredCourses.slice().sort((a, b) => {
    if (sortBy === "title") {
      return a.Title.localeCompare(b.Title);
    } else if (sortBy === "rating") {
      return b.AverageRating - a.AverageRating;
    } else {
      return 0;
    }
  });

  return (
    <main className="container">
      <div className="flex justify-between items-center mb-5">
        <div className="flex space-x-4">
          {[
            { category: '', label: 'All', icon: null },
            { category: 'Frontend', label: 'Frontend', icon: <FaHtml5 className="text-red-600" /> },
            { category: 'Backend', label: 'Backend', icon: <FaNodeJs className="text-green-600" /> },
            { category: 'Database', label: 'Database', icon: <FaDatabase className="text-blue-600" /> },
            { category: 'Math', label: 'Mathematics', icon: <FaCalculator className="text-yellow-600" /> },
            { category: 'Python', label: 'Python', icon: <FaPython className="text-blue-800" /> },
            { category: 'Cloud', label: 'Cloud', icon: <FaCloud className="text-gray-600" /> },
          ].map(item => (
            <button
              key={item.category}
              onClick={() => setCategory(item.category)}
              className={`flex items-center p-3 rounded-lg ${item.category === category ? 'bg-blue-100' : 'bg-gray-100'} hover:bg-blue-200`}
            >
              {item.icon && <div className="text-xl mr-2">{item.icon}</div>}
              <span className="text-lg font-semibold text-gray-800">{item.label}</span>
            </button>
          ))}
        </div>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)} 
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="default">Default</option>
          <option value="title">Title</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedCourses.map((course) => (
          <div key={course.CourseID} className="bg-white shadow rounded-lg overflow-hidden h-[320px]">
            <img alt="Course" src={course.Image} className="w-full h-40 object-cover" />
            <div className="p-4 h-[550px)] flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800">{course.Title}</h2>
              <p className="text-gray-600 mt-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className={`text-lg ${index < Math.floor(course.AverageRating) ? 'text-yellow-500' : 'text-gray-400'}`}>
                    &#9733;
                  </span>
                ))}
                <span className="ml-2 text-sm">
                  {course.AverageRating}/5 ({course.NumberOfReviews} reviews)
                </span>
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center">
                  <img src="https://www.svgrepo.com/show/192244/man-user.svg" alt="Tutor" className="w-8 h-8 rounded-full mr-2" />
                  <p className="text-gray-600 font-bold">{course.TutorName}</p>
                </div>
                <Link to={`/Home/CourseDetail/${course.CourseID}`}>
                  <button className="text-blue-500 hover:underline">
                    See more...
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Courses;
