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
    },[programTimer]);

    // ============== iniciando state de fila =============================

    const [queue, setQueue] = useState([]);
    const [queueSize, setQueueSize] = useState(0);

    const intervalRefQueue = useRef();
    useEffect(() => {
        if (programTimer > 0) {
            const id = setInterval(() => setQueueSize(queueSize + 1), 2000);
            intervalRefQueue.current = id;
            console.log(queueSize);
            return () => clearInterval(intervalRefQueue.current);
        } else {

        }
    },[queueSize]);



    function addToQueue() {

    }

    function mapToRender() {

    }



    return (
        <div>
            <header>
                <h1>MQMS</h1>
                <p>Simulation time: {programTimer}s </p>
            </header>
            <h2>Attendants:</h2>
            <section className='attendants-section'>
                <Attendant />
                <Attendant />
                <Attendant />
            </section>
            <h2>In attendance:</h2>
            <section className='clients-attend-section'>
                <Client />
                <Client />
                <Client />
            </section>
            <h2>Queue:</h2>
            <section className='clients-queue-section'>
                <Client />
                <Client />
                <Client />
            </section>
        </div>
    );


}

export default App;