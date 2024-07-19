import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './input.css';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Admin from "./App.css"
import AdminPanel from './Components/Admin/AdminPanel';
import Register from './Components/Register/Register';
import AdminConferenceCreate from './Components/Admin/Conference/Create/AdminConferenceCreate';
import AdminConferenceList from './Components/Admin/Conference/Show/AdminConferenceList';
import AdminUserList from './Components/Admin/User/Show/AdminUserList';
import AdminConferenceEdit from './Components/Admin/Conference/Edit/AdminConferenceEdit';
import Conference from './Components/Conferences/Show/Conference';
const root = ReactDOM.createRoot(document.getElementById('root'));

// Vérifiez l'authentification en consultant la présence d'un token
const isAuthenticated = !!sessionStorage.getItem('token');

root.render(
  <BrowserRouter>
    <Routes>
      {/* Route publique pour la connexion */}
      <Route path="/login" element={<Login />} />

      {/* Routes protégées */}
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin"
        element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />}
      />

      <Route
        path="/register"
        element={isAuthenticated ? <Register /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin/conference/create"
        element={isAuthenticated ? <AdminConferenceCreate /> : <Navigate to="/login" />}
      />


      <Route
        path="/admin/conference/edit/:id"
        element={isAuthenticated ? <AdminConferenceEdit /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin/conference/show"
        element={isAuthenticated ? <AdminConferenceList /> : <Navigate to="/login" />}
      />

      <Route
        path="/conference/show/:id"
        element={isAuthenticated ? <Conference /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin/user/show"
        element={isAuthenticated ? <AdminUserList /> : <Navigate to="/login" />}
      />

      {/* Route 404 ou redirection par défaut */}
      <Route path="*" element={<Navigate to="/" />} /> {/* Redirige vers la page d'accueil */}
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
