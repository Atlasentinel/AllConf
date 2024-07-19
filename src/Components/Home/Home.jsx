import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Conferences from "../Conferences/Conferences";

function Home() {
    return (
        <>
            <Navbar />
            <div className="p-8">
            <Conferences />
            </div>
        </>
    );
}

export default Home;