import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Attendant from './components/Attendant';
import Client from './components/Client';
import Empty from './components/Empty';


let renderedAtt;
let renderedClients;

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

    const inicialQueue = {
        id: 0,
        qSize: 0,
        qArray: []
    };



    const [state, setState] = useState({
        attendantNum: 4,
        queueNum: 4,
        queues: []
    });

    let tempState = state;

    const intervalRefQueue = useRef();
    useEffect(() => {

        if (programTimer <= 1) {
            return;
        }
         //initializing system
        if (state.queues == 0) {
            renderedClients = createQueueComponent(state.queueNum);
            renderedAtt = mapAttToComponent(state.attendantNum);
            let increment = 0;
            let q = [];
            while (increment<=state.queueNum) {
                let iniQ = inicialQueue;
                iniQ.id = increment++;
                q.push(iniQ);
                increment++;
            }

            tempState = { ...tempState, queues: q };
            //console.log(tempState)
        } else {

        }
        const id = setInterval(() => {
            setState({ ...tempState });
        }, 2000);

        intervalRefQueue.current = id;
        return () => clearInterval(intervalRefQueue.current);
    },[state]);

    console.log(state);

    function mapAttToComponent(attendantNum) {
        let AttCompArray = [];
        for (let i = 0; i < attendantNum; i++) {
            AttCompArray.push(<div key={i}>< Attendant /></div>);
        }
        //console.log(AttCompArray);
        return AttCompArray;
    }
        /*
        let size = queue.qSize + 1;
        let array = [...queue.qArray, size];
        let compArray = mapQueueToComponent(array);

        const queueCompArray = array.map(client => {
            return <Client />;
        });
        return queueCompArray;
        */
    function createQueueComponent(queueNum) {
        let queueCompArray = [];
        for (let i = 0; i < queueNum; i++) {
            queueCompArray.push(

                <section key={i} className='clients-queue-section'>
                    <Client />
                </section>);
        }

        //console.log(queueCompArray)
        return queueCompArray; 
    }

    function manageQueue() {

    }
   

    return (
        <div>
            <header>
                <h1>MQMS</h1>
                <p>Simulation time: {programTimer}s </p>
            </header>
            <div className='container-flex'>
                <div id='attendant-parent' style={{ flexGrow: '1', margin: '2rem' }}>
                    {renderedAtt}
                </div>
                <div id='client-parent' style={{ flexGrow: '1', margin: '2rem'}}>
                    <Empty />
                </div>
                <div style={{flexGrow: '8',margin: '2rem'}}>
                    {renderedClients}
                </div>
            </div>
        </div>
    );
    

}

export default App;