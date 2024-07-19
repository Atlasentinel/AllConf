import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Conferences() {
  const [conferences, setConferences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4555/conferences');
      const data = await response.json();
      setConferences(data);
    };

    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate(`/conference/show/${id}`);
  };

  return (
    <div className="px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {conferences.map(conference => (
          <div 
            key={conference.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" 
            onClick={() => handleClick(conference.id)}
          >
            <img src={conference.img} alt={conference.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-4xl font-bold mb-2 text-red-500">
                {conference.title}
              </h2>
              <p className="text-gray-600 mb-2">{conference.description}</p>
              <p className="text-gray-600 mb-2">{conference.date}</p>
              <p className="text-gray-600 mb-2">{conference.duration}</p>
              <p className="text-gray-600 mb-2">{conference.osMap.addressl1}, {conference.osMap.postalCode} {conference.osMap.city}</p>
              <h3 className="text-xl font-bold mb-2 text-green-500">Intervenants :</h3>
              <ul className="flex flex-wrap">
                {conference.speakers.map(speaker => (
                  <li key={speaker._id} className="bg-orange-400 px-2 py-1 rounded mr-1 mb-1 text-sm">{speaker.firstname} {speaker.lastname}</li>
                ))}
              </ul>
              <h3 className="text-xl font-bold mb-2 text-yellow-500">Parties prenantes :</h3>
              <ul className="flex flex-wrap">
                {conference.stakeholders.map(stakeholder => (
                  <li key={stakeholder._id} className="flex items-center space-x-2 mb-2">
                    <img src={stakeholder.img} alt={`${stakeholder.firstname} ${stakeholder.lastname}`} className="w-8 h-8 object-cover rounded-full" />
                    <div>
                      <p className="bg-blue-400 px-2 py-1 rounded mr-1 mb-1 text-sm">{stakeholder.firstname} {stakeholder.lastname}</p>
                      <p className="text-gray-500">{stakeholder.job}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Conferences;
