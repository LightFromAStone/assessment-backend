const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.


//----- Endpoints -----//
const ctrl = require('./controller');

app.get("/api/compliment", ctrl.getCompliments);
app.get('/api/fortune', ctrl.getFortune);

app.get('/api/cars', ctrl.getAllCars);
app.get('/api/cars/:id', ctrl.getCar);
app.post('/api/cars', ctrl.addCar);
app.put('/api/cars/:id', ctrl.editCar);
app.delete('/api/cars/:id', ctrl.deleteCar);

app.listen(4000, () => console.log("Server running on 4000"));
