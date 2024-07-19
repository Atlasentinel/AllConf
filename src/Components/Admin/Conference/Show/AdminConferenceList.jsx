import React, { useState, useEffect } from 'react';
import AdminPanel from '../../AdminPanel'; // Assurez-vous que ce composant existe et est correctement importé
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

const AdminConferenceList = () => {
    const [conferences, setConferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [editConferenceId, setEditConferenceId] = useState(null);
    const [conferenceData, setConferenceData] = useState({});

    const navigate = useNavigate(); // Initialiser useNavigate
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchConferences = async () => {
            try {
                const response = await fetch('http://localhost:4555/conferences', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();
                setConferences(data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des conférences:", error);
                setErrors([error.message]);
                setLoading(false);
            }
        };

        fetchConferences();
    }, [token]);

    const handleConferenceChange = async (conferenceId, updatedData) => {
        try {
            const response = await fetch('http://localhost:4555/conferences', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: conferenceId, ...updatedData })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }

            setConferences(conferences.map(conference => 
                conference.id === conferenceId ? { ...conference, ...updatedData } : conference
            ));
            setEditConferenceId(null);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la conférence:", error);
            setErrors([error.message]);
        }
    };

    const handleDelete = async (conferenceId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette conférence ?')) {
            try {
                const response = await fetch(`http://localhost:4555/conference/${conferenceId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                setConferences(conferences.filter(conference => conference.id !== conferenceId));
            } catch (error) {
                console.error("Erreur lors de la suppression de la conférence:", error);
                setErrors([error.message]);
            }
        }
    };

    const handleEditClick = (conferenceId) => {
        // Redirection vers la page d'édition avec l'ID de la conférence
        navigate(`/admin/conference/edit/${conferenceId}`);
    };

    const handleInputChange = (e, conferenceId) => {
        const { name, value } = e.target;
        setConferenceData(prevData => ({
            ...prevData,
            [conferenceId]: {
                ...prevData[conferenceId],
                [name]: value
            }
        }));
    };

    const handleCancelEdit = () => {
        setEditConferenceId(null);
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <>
            <AdminPanel />
            <div className="flex items-center justify-center p-10">
                <div className="bg-white p-8 rounded shadow-md w-full md:w-3/4 lg:w-1/2">
                    <h1 className="text-2xl font-bold mb-4 text-center">Liste des Conférences</h1>
                    {errors.length > 0 && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className=" px-4 py-2">Titre</th>
                                <th className=" px-4 py-2">Description</th>
                                <th className=" px-4 py-2">Durée</th>
                                <th className=" px-4 py-2">Content</th>
                                <th className=" px-4 py-2">Date</th>
                                <th className=" px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conferences.map(conference => (
                                <tr key={conference.id}>
                                    <td className=" px-4 py-2">
                                        {editConferenceId === conference.id ? (
                                            <input
                                                type="text"
                                                name="title"
                                                value={conferenceData[conference.id]?.title || conference.title}
                                                onChange={(e) => handleInputChange(e, conference.id)}
                                                className="border border-gray-300 px-3 py-2 rounded-md"
                                            />
                                        ) : (
                                            conference.title
                                        )}
                                    </td>
                                    <td className=" px-4 py-2">
                                        {editConferenceId === conference.id ? (
                                            <input
                                                type="text"
                                                name="description"
                                                value={conferenceData[conference.id]?.description || conference.description}
                                                onChange={(e) => handleInputChange(e, conference.id)}
                                                className="border border-gray-300 px-3 py-2 rounded-md"
                                            />
                                        ) : (
                                            conference.description
                                        )}
                                    </td>
                                    <td className=" px-4 py-2">
                                        {editConferenceId === conference.id ? (
                                            <input
                                                type="text"
                                                name="duration"
                                                value={conferenceData[conference.id]?.duration || conference.duration}
                                                onChange={(e) => handleInputChange(e, conference.id)}
                                                className="border border-gray-300 px-3 py-2 rounded-md"
                                            />
                                        ) : (
                                            conference.duration
                                        )}
                                    </td>
                                    <td className=" px-4 py-2">
                                        {editConferenceId === conference.id ? (
                                            <input
                                                type="text"
                                                name="content"
                                                value={conferenceData[conference.id]?.content || conference.content}
                                                onChange={(e) => handleInputChange(e, conference.id)}
                                                className="border border-gray-300 px-3 py-2 rounded-md"
                                            />
                                        ) : (
                                            conference.content
                                        )}
                                    </td>
                                    <td className=" px-4 py-2">
                                        {editConferenceId === conference.id ? (
                                            <input
                                                type="date"
                                                name="date"
                                                value={conferenceData[conference.id]?.date || conference.date}
                                                onChange={(e) => handleInputChange(e, conference.id)}
                                                className="border border-gray-300 px-3 py-2 rounded-md"
                                            />
                                        ) : (
                                            new Date(conference.date).toLocaleDateString()
                                        )}
                                    </td>
                                    <td className=" px-4 py-2">
                                        {editConferenceId === conference.id ? (
                                            <>
                                                <button
                                                    onClick={() => handleConferenceChange(conference.id, conferenceData[conference.id])}
                                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                                >
                                                    Enregistrer
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="bg-gray-500 text-white px-2 py-1 rounded"
                                                >
                                                    Annuler
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEditClick(conference.id)}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(conference.id)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                >
                                                    Supprimer
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminConferenceList;
