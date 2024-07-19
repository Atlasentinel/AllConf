import React, { useState, useEffect } from 'react';
import AdminPanel from '../../AdminPanel'; // Assurez-vous que ce composant existe et est correctement importé

const AdminUserList = () => {
    // États pour stocker les utilisateurs, les erreurs, et les états d'édition
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [userRole, setUserRole] = useState({});

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:4555/users', {
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
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs:", error);
                setErrors([error.message]);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    const handleRoleChange = async (userId, newType) => {
        try {
            const response = await fetch(`http://localhost:4555/usertype/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({newType: newType })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }

            // Mettre à jour localement la liste des utilisateurs après la modification
            setUsers(users.map(user => 
                user.id === userId ? { ...user, type: newType } : user
            ));
        } catch (error) {
            console.error("Erreur lors de la mise à jour du type:", error);
            setErrors([error.message]);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            try {
                const response = await fetch(`http://localhost:4555/user/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                // Mettre à jour localement la liste des utilisateurs après la suppression
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.error("Erreur lors de la suppression de l'utilisateur:", error);
                setErrors([error.message]);
            }
        }
    };

    const handleEditClick = (userId, currentType) => {
        setEditUserId(userId);
        setUserRole(prevRole => ({ ...prevRole, [userId]: currentType }));
    };

    const handleRoleSelectChange = (e, userId) => {
        setUserRole(prevRole => ({ ...prevRole, [userId]: e.target.value }));
    };

    const handleCancelEdit = () => {
        setEditUserId(null);
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <>
            <AdminPanel />
            <div className="flex items-center justify-center p-10">
                <div className="bg-white p-8 rounded shadow-md w-full md:w-3/4 lg:w-1/2">
                    <h1 className="text-2xl font-bold mb-4 text-center">Liste des Utilisateurs</h1>
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
                                <th className="border px-4 py-2">Nom</th>
                                <th className="border px-4 py-2">Rôle</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td className="border px-4 py-2">{user.id}</td>
                                    <td className="border px-4 py-2">
                                        {editUserId === user._id ? (
                                            <select
                                                value={userRole[user._id] || user.type}
                                                onChange={(e) => handleRoleSelectChange(e, user._id)}
                                                className="border border-gray-300 px-3 py-2 rounded-md"
                                            >
                                                <option value="user">Utilisateur</option>
                                                <option value="admin">Administrateur</option>
                                            </select>
                                        ) : (
                                            user.type
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {editUserId === user._id ? (
                                            <>
                                                <button
                                                    onClick={() => handleRoleChange(user.id, userRole[user._id])}
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
                                                    onClick={() => handleEditClick(user._id, user.type)}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
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

export default AdminUserList;
