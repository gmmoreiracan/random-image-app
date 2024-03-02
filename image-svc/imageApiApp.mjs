import express from 'express';
import axios from 'axios';
const app = express();


app.get('/:q', async (req, res) => {
    try {
        const response = await axios.get(`https://list.ly/api/v4/search/image?q=${req.params.q}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                }
                }
            );
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.send(response.data);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send({ error: 'An error occurred while fetching images.' });
    }
});

app.listen(3000, () => console.log('Image API app is running on port 3000'));