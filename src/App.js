import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Attendant from './components/Attendant';
import Client from './components/Client';
import Empty from './components/Empty';

// ===== Os componentes para renderizar =================================
let renderedAtt;
let renderedClients;

function App() {

    // ============= iniciando state de contador de programa ============

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

    const [state, setState] = useState({
        attendantNum: 3,
        queueNum: 3,
        queues: [],
        inAtt: [],
    });

    let tempState = state;

    const intervalRefQueue = useRef();
    useEffect(() => {
        //========= verifica se o contador do system chegou a 0 ============
        if (programTimer <= 1) {
            return;
        }
         // ======= inicializa sistema (roda 1 vez)=========================
        if (state.queues == 0) {
            renderedClients = createQueueComponent(state.queueNum);
            renderedAtt = mapAttToComponent(state.attendantNum);
            let increment = 0;
            let q = [];
            while (increment<state.queueNum) {
                let inicialQueue = {
                    id: increment,
                    qSize: 0,
                    qArray: []
                };
                q.push(inicialQueue);
                increment++;
            }
            tempState = { ...tempState, queues: q };
            setState({ ...tempState });

            return;
        } else {
            // === Inicializa fila, atualiza chegada de clientes 2 em 2 segundos ====

            let newState = addToQueue(tempState);
            renderedClients = mapQueueToComp(newState);

            const id = setInterval(() => {
                setState({ ...newState });
            }, 2000);
            intervalRefQueue.current = id;

            return () => clearInterval(intervalRefQueue.current);
        }

    }, [state]);

    // =========================== ATENDIMENTO ==============================

    const intervalRefQueue = useRef();
    useEffect(() => {
        //========= verifica se o contador do system chegou a 0 ============
        if (programTimer <= 1) {
            return;
        }
        // ======= inicializa sistema (roda 1 vez)=========================
        if (state.queues == 0) {
            renderedClients = createQueueComponent(state.queueNum);
            renderedAtt = mapAttToComponent(state.attendantNum);
            let increment = 0;
            let q = [];
            while (increment < state.queueNum) {
                let inicialQueue = {
                    id: increment,
                    qSize: 0,
                    qArray: []
                };
                q.push(inicialQueue);
                increment++;
            }
            tempState = { ...tempState, queues: q };
            setState({ ...tempState });

            return;
        } else {
            // === Inicializa fila, atualiza chegada de clientes 2 em 2 segundos ====

            let newState = addToQueue(tempState);
            renderedClients = mapQueueToComp(newState);

            const id = setInterval(() => {
                setState({ ...newState });
            }, 2000);
            intervalRefQueue.current = id;

            return () => clearInterval(intervalRefQueue.current);
        }

    }, [state]);




    // ===== Roda 1 vez (inicio de programa) e após atualizar o n de atendentes ====
    function mapAttToComponent(attendantNum) {
        let AttCompArray = [];
        for (let i = 0; i < attendantNum; i++) {
            AttCompArray.push(<div key={i}>< Attendant /></div>);
        }
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
                </section>);
        }
        return queueCompArray; 
    }

    function mapQueueToComp(newState) {

        let queueCompArray = [];
        let tempArray = [];
        let clients = [];
        for (let i = 0; i < newState.queueNum; i++) {
            for (let j = 0; j < newState.queues[i].qSize; j++) {
                clients.push(<Client />); 
            }
            tempArray.push(
                <section className='clients-queue-section'>
                    {clients}
                </section>
            );
            queueCompArray[i] = tempArray;
            tempArray = [];
            clients = [];
        }
        console.log(queueCompArray);
        return queueCompArray;
    }

    function addToQueue(curState) {
        //console.log('Estado cur ->', curState)

        let q = curState.queues;
        
        let id = 0;
        let prevSize = q[0].qSize;
        let currSize = q[0].qSize;
        // ======== verificando a menor fila ====================
        for (let i = 0; i < curState.queueNum; i++) {
            currSize = q[i].qSize;
            if (currSize == prevSize && prevSize == 0) {
                id = q[i].id;
                break;
            } else if (currSize > prevSize) {
                continue;
            } else if (currSize < prevSize) {
                prevSize = currSize;
                id = q[i].id;
                continue;
            }
        }
        // ========= adicionando na menor fila ==================
        
        const updatedQ = curState.queues.map(s => {
            if (s.id == id) {
                s.qSize++;
                s.qArray.push(1);
            }
            return s;
        }); 
        
        const updatedState = { ...curState, queues: updatedQ};

        return updatedState;
    
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