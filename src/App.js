import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Attendant from './components/Attendant';
import Client from './components/Client';

function App() {

    // =============== iniciando state de contador de programa ============

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

    // ============== iniciando state de fila =============================

    const [queue, setQueue] = useState([]);
    const intervalRefQueue = useRef();
    useEffect(() => {
        if (programTimer <= 0) {
            return;
        } else {
            const id = setInterval(() => setProgTimer(programTimer - 1), 1000);
            intervalRefQueue.current = id;
            return () => clearInterval(intervalRefQueue.current);
        }
    });



    function mapClientsToRender() {

    }



    return (
        <div>
            <header>
                <h1>MQMS</h1>
                <p>Simulation time: {programTimer}s </p>
                <section className='attendants-section'>
                    <Attendant />
                    <Attendant />
                    <Attendant />
                </section>
                <section className='clients-attend-section'>
                    <Client />
                    <Client />
                    <Client />
                </section>
            </header>
        </div>
    );


}

export default App;