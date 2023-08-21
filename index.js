import express from "express";
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

// use the SQL methods in the API routes below

const app = express();

app.use(express.static('public'))

// add middleware to make post routes work
app.use(express.json());

const PORT = process.env.PORT || 4015;

const  db = await sqlite.open({
    filename:  './taxi_queue.db',
    driver:  sqlite3.Database
});
// passenger joins the queue


app.post('/api/passenger/join', async (req, res) => {
    const queue = await db.all(`SELECT * FROM taxi_queue`);
    const passenger_queue_count = queue[0].passenger_queue_count;
    
    const result = await db.run(`UPDATE taxi_queue SET passenger_queue_count = ?`, 
    passenger_queue_count + 1 );

    res.json({
        queueCoun : passenger_queue_count 
    })
})

// passenger leaves the queue
app.post('/api/passenger/leave', async (req, res) => {

    const queue = await db.all(`SELECT * FROM taxi_queue`);
    const passenger_queue_count = queue[0].passenger_queue_count;
    
    const result = await db.run(`UPDATE taxi_queue SET passenger_queue_count = ?`, 
    passenger_queue_count - 1 );

    res.json({
        queueCoun : passenger_queue_count 
    })
});

app.post('/api/taxi/join', async (req, res) => {
    
    const queue = await db.all(`SELECT * FROM taxi_queue`);
    const taxi_queue_count = queue[0].taxi_queue_count;

    const result = await db.run(`UPDATE taxi_queue SET taxi_queue_count = ?`, 
    taxi_queue_count + 1 );

    res.json({
        queueCoun : passenger_queue_count
    })
});

// Note there needs to be at least 12 people in the queue for the taxi to depart
app.post('/api/taxi/depart', async (req, res) => {
    
    const queue = await db.all(`SELECT * FROM taxi_queue`);
    const taxi_queue_count = queue[0].taxi_queue_count;
    const passenger_queue_count = queue[0].passenger_queue_count;

    const result = await db.run(`UPDATE taxi_queue SET taxi_queue_count = ?`, 
    taxi_queue_count - 1 );

    res.json({
        queueCount : passenger_queue_count,
        queueCountTaxi : taxi_queue_count
    })
});


// return the number of people in the queue
app.get('/api/passenger/queue', async (req, res) => {
    //  return test the API call
    const queue = await db.all(`SELECT * FROM taxi_queue`);
    const passenger_queue_count = queue[0].passenger_queue_count;

    res.json({
        queueCount : passenger_queue_count
    })
});

// return the number of taxis in the queue
app.get('/api/taxi/queue', async (req, res) => {

    const queue = await db.all(`SELECT * FROM taxi_queue`);
    const taxi_queue_count = queue[0].taxi_queue_count;

    res.json({
        queueCount : taxi_queue_count
    })
});

app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))