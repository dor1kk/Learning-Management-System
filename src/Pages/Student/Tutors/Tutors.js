import React, { useState, useEffect } from "react";
import axios from "axios";
import BecomeTutor from "./BecomeTutor";

function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchTutors();
  }, [searchQuery, filter]);

  const fetchTutors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tutors");
      setTutors(response.data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-4 lg:mb-0 items-center lg:items-start">
          <input
            type="text"
            placeholder="Search tutors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Filter by experience</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tutors.slice(0, 6).map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src={tutor.image_url}
              alt={tutor.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{tutor.name}</h2>
            <p className="text-sm text-gray-600 mb-4">Full-stack developer</p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="text-gray-600 hover:text-blue-500 transition duration-300"
              >
                <svg
                  viewBox="0 0 496 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-600 hover:text-blue-500 transition duration-300"
              >
                <svg
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path d="M100.28 464H7.4V152.53h92.88V464zm-46.58-355.3c-30.62 0-55.5 24.9-55.5 55.5 0 30.6 24.88 55.6 55.5 55.6 30.6 0 55.6-25 55.6-55.6-.01-30.6-25-55.5-55.6-55.5zm358.48 355.3h-92.88v-148.3c0-35.2-12.5-59.3-43.8-59.3-23.9 0-38.1 16.2-44.3 31.8-2.3 5.5-2.9 13.1-2.9 20.8v155.1h-92.88V152.53h92.88v41.8c12.3-18.7 34.7-45.6 84.3-45.6 61.5 0 108.1 40.2 108.1 126.4v151.1h.03z"></path>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <BecomeTutor modalVisible={modalVisible} onClose={handleModalClose} />
    </div>
  );
}

export default Tutors;
