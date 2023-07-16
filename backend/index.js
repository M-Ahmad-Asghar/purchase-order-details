const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api', (req, res) => {
    res.send({
        message: 'Your backend server is running. Time to create a frontend now!'
    });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

