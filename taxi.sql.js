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
    passQueueLength += 1;
}

export async function leaveQueue() {
    if(passQueueLength > 0){
        passQueueLength -= 1;
    }
}

export async function joinTaxiQueue() {
    tQueueLength += 1;
}

export async function queueLength() {
    return (passQueueLength);
}

export async function taxiQueueLength() {
    return (tQueueLength);
}

export function taxiDepart() {
    if(passQueueLength >= 12 && tQueueLength > 0){
        tQueueLength -= 1;
        passQueueLength -= 12;
    }
}