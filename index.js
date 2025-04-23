const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config;
const userRouter = require('./src/routes/user.routes')
const product = require('./src/routes/product.routes')


const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('hello world!!');
});

app.use('', userRouter)
app.use('', product)

app.listen(port, () => {
    console.log(`server is runing on port ${port}`);
})