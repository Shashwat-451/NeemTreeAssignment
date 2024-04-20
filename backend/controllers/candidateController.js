const xlsx = require('xlsx');
const async = require('async');
const Candidate = require('../models/candidateModel');

  const addCandidatesFromExcel = async (excelFileData, callback) => {
    try {
      
      const workbook = xlsx.read(excelFileData, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const candidates = xlsx.utils.sheet_to_json(worksheet);

      await async.eachSeries(candidates, async (candidate) => {
        
        const existingCandidate = await Candidate.findOne({ email: candidate['Email'] });
  
        if (existingCandidate) {
          console.log('Duplicate email found, skipping candidate:', candidate['Name of the Candidate']);
          return; 
        }
  
        const newCandidate = await Candidate.create({
          name: candidate['Name of the Candidate'],
          email: candidate['Email'],
          mobileNumber: String(candidate['Mobile No.']),
          dob: new Date(candidate['Date of Birth']),
          workExperience: candidate['Work Experience'],
          resumeTitle: candidate['Resume Title'],
          currentLocation: candidate['Current Location'],
          postalAddress: candidate['Postal Address'],
          currentEmployer: candidate['Current Employer'],
          currentDesignation: candidate['Current Designation']
        });
  
        console.log('Candidate added:', newCandidate.name);
      })
  
      console.log('All candidates processed successfully');
      callback(null, 'success');
    } catch (error) {
      console.error('Error processing candidates:', error);
      callback(error, null);
    }
  };

module.exports = {
  addCandidatesFromExcel,
};
