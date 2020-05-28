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

    const [queue, setQueue] = useState({
        qSize: 0,
        qArray: [],
        cArray: []
    });

    const intervalRefQueue = useRef();
    useEffect(() => {
        let size = queue.qSize + 1;
        let array = [...queue.qArray, size];
        let compArray = mapQueueToComponent(array); 

        if (programTimer <= 1) {
            return;
        }
        const id = setInterval(() => {
            setQueue({ qSize: size, qArray: array, cArray: compArray });
        }, 2000);

        intervalRefQueue.current = id;
        return () => clearInterval(intervalRefQueue.current);
    },[queue]);

    console.log(queue);

    function addToQueue() {

    }

    function mapQueueToComponent(array) {
        const queueCompArray = array.map(client => {
            return <Client />;
        });
        return queueCompArray;
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
                {queue.cArray}
            </section>
            <h2>Queue:</h2>
            <section className='clients-queue-section'>
                {}
            </section>
        </div>
    );


}

export default App;