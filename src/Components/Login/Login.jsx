import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page
        try {
            const response = await fetch("http://localhost:4555/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    password: password,
                }),
            });

            const contentType = response.headers.get("content-type");
            const responseText = await response.text(); // Lire le texte brut

            if (!response.ok) {
                console.log("Erreur serveur:", responseText);
                throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
            }

            // Vérifier si la réponse est JSON
            if (contentType && contentType.includes("application/json") && responseText) {
                const data = JSON.parse(responseText); // Utiliser JSON.parse pour éviter des erreurs si response.json() échoue
                console.log("Token reçu:", data);
                sessionStorage.setItem("token", data);
                window.location.href = "/";
                setErrorMessage("");
            } else {
                throw new Error("Réponse du serveur non JSON.");
            }
        } catch (error) {
            setErrorMessage(error.message);
            setPassword(""); // Réinitialiser le mot de passe
        }
    };


    return (
        <form onSubmit={handleLogin}> {/* Utiliser onSubmit pour le formulaire */}
            <div className="bg-[#131B37] min-h-screen flex flex-col justify-center items-center">
                {errorMessage && <p className="text-red-600 font-bold mb-4">{errorMessage}</p>}
                <h1 className="text-orange-600 font-bold text-5xl mb-8 flex">
                    ALL&nbsp;<span className="text-white">CONF</span>
                </h1>
                <input
                    type="text"
                    className="bg-white px-4 py-2 rounded-lg text-lg mb-4 w-1/4"
                    placeholder="Identifiant"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    type="password"
                    className="bg-white px-4 py-2 rounded-lg text-lg mb-4 w-1/4"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex flex-col gap-4">
                    <button type="submit" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold text-lg uppercase w-fit">
                        Connexion
                    </button>
                    <Link to="/register">
                        <a type="submit" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold text-lg uppercase w-fit">
                            Register
                        </a>
                    </Link>
                </div>
            </div>
        </form>
    );
}
