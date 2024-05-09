const express= require('express')
const app = express()
// const dotenv = require('dotenv')
const cors = require('cors')
const userTable = require('./router/table')
const bodyParser = require('body-parser');



// dotenv.config()

app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use('/api/table',userTable )


app.listen('5500', () => {
    console.log('Background Server is Connected...!')
})

