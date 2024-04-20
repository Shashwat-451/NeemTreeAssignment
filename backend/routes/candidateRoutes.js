const express = require('express');
const router = express.Router();
const { addCandidatesFromExcel } = require('../controllers/candidateController');

router.post('/upload', (req, res) => {

    if (!req.files || !req.files.excelFile) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const excelFileData = req.files.excelFile.data;
    addCandidatesFromExcel(excelFileData, (err, result) => {
        if (err) {
            console.error('Error processing candidates:', err);
            return res.status(500).json({ error: 'An error occurred while processing candidates' });
        } else {
            console.log('Processing successful:', result);
            return res.status(200).json({ message: 'Candidates processed successfully' });
        }
    });
});

module.exports = router;



