import express from "express";
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors';

// use the SQL methods in the API routes below
import { joinQueue } from "./taxi.sql.js";
import { leaveQueue } from "./taxi.sql.js";
import { joinTaxiQueue } from "./taxi.sql.js";
import { taxiQueueLength} from "./taxi.sql.js";
import { taxiDepart } from "./taxi.sql.js";
import { queueLength } from "./taxi.sql.js";

const app = express();

app.use(express.static('public'))

// add middleware to make post routes work
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 4015;

const  db = await sqlite.open({
    filename:  './taxi_queue.db',
    driver:  sqlite3.Database
});
// passenger joins the queue


app.post('/api/passenger/join', async (req, res) => {
    
    await joinQueue();

    res.json({
        message : 'join queue'
    })
})

// passenger leaves the queue
app.post('/api/passenger/leave', async (req, res) => {

    await leaveQueue();

    res.json({
        message : 'leave queue'
    })
});

app.post('/api/taxi/join', async (req, res) => {

    await joinTaxiQueue();

    res.json({
        message : 'join queue'
    })
});

// Note there needs to be at least 12 people in the queue for the taxi to depart
app.post('/api/taxi/depart', async (req, res) => {

    await taxiDepart();

    res.json({
        message : 'taxi depart from queue'
    })
});


// return the number of people in the queue
app.get('/api/passenger/queue', async (req, res) => {
    //  return test the API call

    res.json({
        queueCount : await queueLength()
    })
});

// return the number of taxis in the queue
app.get('/api/taxi/queue', async (req, res) => {

    res.json({
        queueCount : await taxiQueueLength()
    })
});

app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))