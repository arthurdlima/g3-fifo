import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Attendant from './components/Attendant';


function App() {

    // =============== iniciando state + contador de programa

    const [programTimer, setProgTimer] = useState(60);
    const intervalRef = useRef();
    useEffect(() => {
        if (programTimer <= 0) {
            return;
        } else {
            const id = setInterval(() => setProgTimer(programTimer - 1), 1000);
            intervalRef.current = id;
            return () => clearInterval(intervalRef.current);
        }
    });


    function mapClientsToRender() {

    }



    return (
        <div>
            <header>
                <h1>MQMS</h1>
                <p>Simulation time: {programTimer}s </p>
                <Attendant />
            </header>
        </div>
    );


}

export default App;