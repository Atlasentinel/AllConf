import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const [isAdmin, setIsAdmin] = useState(false);
    const token = sessionStorage.getItem("token");
  

    useEffect(() => {
        if (token) {
            fetch("http://localhost:4555/isAdmin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setIsAdmin(data.isAdmin); // Si l'API retourne directement un booléen
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    }, [token]);

    return (
        <div className="flex text-white justify-around h-20 w-screen">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <h1 className="flex flex-row font-extrabold tracking-widest justify-center cursor-pointer items-center w-fit text-2xl mt-10 rounded-lg ">
                <Link to="/">AllConf</Link>
            </h1>
            {isAdmin && (
                <div className="flex flex-row gap-2 justify-center cursor-pointer items-center w-fit hover:bg-[#286cff] delay-50 bg-[#0c1bf0] p-2 mt-10 rounded-xl text-white">
                    <Link to="/admin"><span className="flex h-fit font-bold text-lg tracking-widest">ADMIN</span></Link>
                </div>
            )}
        </div>
    );
}

export default Navbar;
