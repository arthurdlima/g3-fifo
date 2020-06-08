import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Attendant from './components/Attendant';
import Client from './components/Client';
import Empty from './components/Empty';


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
            <div className='container-flex'>
                <div id='attendant-parent' style={{ flexGrow: '1', margin: '2rem'}}>
                    <Attendant />
                </div>
                <div id='client-parent' style={{ flexGrow: '1', margin: '2rem'}}>
                    <Empty />
                </div>
                <div style={{flexGrow: '8',margin: '2rem'}}>
                    <section className='clients-queue-section'>
                        {queue.cArray}  
                    </section>
                </div>
            </div>
        </div>
    );
    

}

export default App;