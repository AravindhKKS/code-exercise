const express= require('express')
const app = express()
// const dotenv = require('dotenv')
const cors = require('cors')
const userTable = require('./router/table')
const bodyParser = require('body-parser');



// dotenv.config()

app.use(express.json())
app.use(bodyParser.json());
app.use(cors({
    origin: ["https://code-exercise-uv68.vercel.app"],
    methods: ["GET", "POST"], // Allow only GET and POST requests
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use('/api/table',userTable )


app.listen('5500', () => {
    console.log('Background Server is Connected...!')
})

