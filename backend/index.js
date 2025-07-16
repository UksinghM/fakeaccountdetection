const express = require('express');
const UserRouter = require('./routers/userRouter.js'); //importing user router
const cors = require('cors');

//creating new express app

const app = express();

const port = 5000;

//middleware

app.use(cors({
    origin: '*'
}));

app.use(express.json()); //to parse json data from request body

app.use('/user', UserRouter);

//routes or endpoints
app.get('/', (req, res) => {
    res.send('Response From Express')
})

app.get('/add', (req, res) => {
    res.send('Response From Add Route')
})

app.get('/getall', (req, res) => {
    res.send('Response From Get All Route')
})

app.listen(port, () => {
    console.log(`Server is running on Port - ${port}`);
})