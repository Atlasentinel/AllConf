// ConferenceDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

function ConferenceDetails() {
    const { id } = useParams(); // Récupère l'ID de la conférence depuis l'URL
    const [conference, setConference] = useState(null);

    useEffect(() => {
        const fetchConference = async () => {
            const response = await fetch(`http://localhost:4555/conference/${id}`);
            const data = await response.json();
            setConference(data);
        };

        fetchConference();
    }, [id]);

    console.log(conference);

    if (!conference) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={conference.img} alt={conference.title} className="w-full h-64 object-cover" />
                    <div className="p-6">
                        <h1 className="text-5xl font-bold mb-4 text-red-500">{conference.title}</h1>
                        <p className="text-gray-600 mb-4">{conference.description}</p>
                        <p className="text-gray-600 mb-2"><strong>Date:</strong> {conference.date}</p>
                        <p className="text-gray-600 mb-2"><strong>Duration:</strong> {conference.duration}</p>
                        <p className="text-gray-600 mb-2"><strong>Address:</strong> {conference.osMap.addressl1}, {conference.osMap.postalCode} {conference.osMap.city}</p>

                        <h2 className="text-2xl font-bold mb-2 text-green-500">Intervenants :</h2>
                        <ul className="flex flex-wrap mb-6">
                            {conference.speakers.map(speaker => (
                           <li key={speaker._id} className="px-2 py-1 rounded mr-1 mb-1 text-sm" style={{ backgroundColor: conference.design.mainColor }}>{speaker.firstname} {speaker.lastname}</li>
                            ))}
                        </ul>

                        <h2 className={`text-2xl font-bold mb-2 text-yellow-500`}>Parties prenantes :</h2>
                        <ul className="flex flex-wrap">
                            {conference.stakeholders.map(stakeholder => (
                                <li key={stakeholder._id} className="flex items-center space-x-2 mb-2">
                                    <img src={stakeholder.img} alt={`${stakeholder.firstname} ${stakeholder.lastname}`}  className="w-8 h-8 object-cover rounded-full" />
                                    <div>
                                        <p style={{ backgroundColor: conference.design.secondColor }} className="px-2 py-1 rounded mr-1 mb-1 text-sm">{stakeholder.firstname} {stakeholder.lastname}</p>
                                        <p className="text-gray-500">{stakeholder.job}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConferenceDetails;
