import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const token = sessionStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      id,
      password,
    };

    if (token) {
      try {
        const response = await fetch('http://localhost:4555/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        });

        console.log("User Data Sent:", user);
        window.location.href = "/home";

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error Response:", errorData);
          throw new Error('Erreur lors de la création de l\'utilisateur');
        }

        const createdUser = await response.json();
        console.log('Utilisateur créé :', createdUser);
        // Rediriger l'utilisateur vers la page d'accueil ou une page de confirmation
      } catch (error) {
        console.error("Catch Error:", error);
        // Afficher un message d'erreur à l'utilisateur
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-3/4 lg:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">Créer un utilisateur</h1>
        <form onSubmit={handleSubmit} className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label htmlFor="id" className="block mb-2 font-medium">
              Identifiant
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label htmlFor="password" className="block mb-2 font-medium">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label htmlFor="type" className="block mb-2 font-medium">
              Type
            </label>
          </div>
          <div className="w-full gap-4 flex px-3 mb-6 md:mb-0">
            <Link to="/login">         <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Se connecter
            </button>
            </Link>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Créer l'utilisateur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
