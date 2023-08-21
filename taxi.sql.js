import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const  db = await sqlite.open({
    filename:  './taxi_queue.db',
    driver:  sqlite3.Database
});

await db.migrate();

let passQueueLength = 0;
let tQueueLength = 0;

export async function joinQueue() {
    // console.log('join queue')
    const queue = await db.all(`SELECT * FROM taxi_queue`);
    const passenger_queue_count = queue[0].passenger_queue_count;

    const result = await db.run(`UPDATE taxi_queue SET passenger_queue_count = ?`, 
    passenger_queue_count + 1 );
}

export async function leaveQueue() {
    const queue = await db.all(`SELECT * FROM taxi_queue`);
    const passenger_queue_count = queue[0].passenger_queue_count;
    
    if(passenger_queue_count > 0){
        const result = await db.run(`UPDATE taxi_queue SET passenger_queue_count = ?`, 
        passenger_queue_count - 1 );
    }
}

export async function joinTaxiQueue() {
    const queue = await db.all(`SELECT * FROM taxi_queue`);
    const taxi_queue_count = queue[0].taxi_queue_count;

    const result = await db.run(`UPDATE taxi_queue SET taxi_queue_count = ?`, 
    taxi_queue_count + 1 );
}

export async function queueLength() {
    const queue = await db.all(`SELECT * FROM taxi_queue`);
    const passenger_queue_count = queue[0].passenger_queue_count;
    return(passenger_queue_count);
}

export async function taxiQueueLength() {
    const queue = await db.all(`SELECT * FROM taxi_queue`);
    const taxi_queue_count = queue[0].taxi_queue_count;
    return (taxi_queue_count);
}

export async function taxiDepart() {
    const queue = await db.all(`SELECT * FROM taxi_queue`);
    const taxi_queue_count = queue[0].taxi_queue_count;
    const passenger_queue_count = queue[0].passenger_queue_count;

    if(taxi_queue_count > 0 && passenger_queue_count >= 12){
        const result = await db.run(`UPDATE taxi_queue SET taxi_queue_count = ?, passenger_queue_count = ?`, 
        taxi_queue_count - 1, passenger_queue_count - 12 );   
    }
}