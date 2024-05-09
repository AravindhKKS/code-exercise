
 const router = require('express').Router()
const axios = require('axios');
const WebSocket = require('ws');
const http = require('http')



// CREATE THE DATA METHOD
router.post('/datadog', async (req, res) => {
    try {
        const { message, name, query, type } = req.body;
        const data = {
            message,
            name,
            query,
            type
        };

        // DATADOG API HEADER
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'DD-API-KEY': "806ee99a72439ef2d0475c170047af37",
            'DD-APPLICATION-KEY': "e1875f594aee0cb1aa1a013f6ef5043767bbc582"
        };

        // POST THE DATA TO DATADOG USING DATADOG BASEURL
        const response = await axios.post('https://api.us5.datadoghq.com/api/v1/monitor', data, { headers });

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
});


//GET DATA FROM METHOD
router.get('/datadog', async (req, res) => {
    try {
        //DATADOG API HEADERS
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'DD-API-KEY': "806ee99a72439ef2d0475c170047af37",
            'DD-APPLICATION-KEY': "e1875f594aee0cb1aa1a013f6ef5043767bbc582"
        };
        //GET DATA FOR DATADOG
        const response = await axios.get('https://api.us5.datadoghq.com/api/v1/monitor',{headers});

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE THE DATA
router.delete('/datadog/:monitorId', async (req, res) => {
    try {
        const monitorId = req.params.monitorId;

        // DATADOG API HEADERS
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'DD-API-KEY': "806ee99a72439ef2d0475c170047af37",
            'DD-APPLICATION-KEY': "e1875f594aee0cb1aa1a013f6ef5043767bbc582"
        };

        // DELET THE DATA IN DATADOG USING MONITOR_ID
        const response = await axios.delete(`https://api.us5.datadoghq.com/api/v1/monitor/${monitorId}`, { headers });

        // Return the response from Datadog API to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
});


//WEBHOOK NOTIFICATION FORM DATADOG
const server = http.createServer();;
const wss = new WebSocket.Server({ server });

router.post('/webhook', (req, res) => {
    try {
        const { name,message,query ,type } = req.body;

        // CONNECT TO WEBSOCKET TO CLIENT
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ name,message,query ,type }));
            }
        });
        res.status(200).send('Webhook received successfully');
    } catch (err) {
        console.error('Error:', err);
    }
});

module.exports = router;