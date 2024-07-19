import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function AdminPanel() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-screen p-8 mt-10">
        <h1 className="text-2xl text-white font-extrabold mb-4">Panel d'administration</h1>
        <div className="flex flex-wrap mb-4">
          <Link to="/admin/conference/create">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2">
              Créer une conférence
            </button>
          </Link>
          <Link to="/admin/conference/show">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2">
              Voir les conférences
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2">
              Créer un utilisateur
            </button>
          </Link>
          <Link to="/admin/user/show">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2">
              Voir les utilisateurs
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
