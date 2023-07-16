const express = require('express');
const multer = require('multer');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


app.post('/upload', upload.single('csvFile'), (req, res) => {
    const results = {};

    // Parse the uploaded CSV file
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
            // Validate the CSV data
            const modelNumber = data['Model Number'];
            const unitPrice = parseFloat(data['Unit Price']);
            const quantity = parseInt(data['Quantity']);

            // check if the modekNumber is a string and unitPrice if float and quantity is int
            if (typeof modelNumber !== 'string' || isNaN(unitPrice) || isNaN(quantity)) {
                results['data'] = data;
                results['message'] = 'Validation failed';
                results['status'] = 'failed';
                res.send(results);
                return;
            }
            res.send({ message: 'Validation passed', data: csvModel, status: "success" });
        })
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
