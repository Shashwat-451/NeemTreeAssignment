import React, { useState, useRef } from 'react';
import '../css/UploadForm.css'
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';

const UploadForm = () => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [showUploadButton, setShowUploadButton] = useState(true);
    const [showThankYou, setShowThankYou] = useState(false);
    const [container, setContainer] = useState(true);
    const [message, setMessage] = useState('');
    const [successmessage, setSuccesssMessage] = useState(false);
    const [failuremessage, setFailureMessage] = useState(false);

    const handleClose = () => {
        setContainer(!container);
    }


    const handleFileSelect = () => {
        fileInputRef.current.click();
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setShowSubmitButton(true);

    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setSelectedFile(!selectedFile);
        setShowUploadButton(false)
        if (!selectedFile) {
            setMessage('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('excelFile', selectedFile);

        try {
            const response = await axios.post('http://localhost:4000/candidates/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setMessage('File Successfully Uploaded');
                setSuccesssMessage(true);
                setShowSubmitButton(false);
                setShowThankYou(true);
            } else {
                setMessage('Error uploading file');
            }
        } catch (error) {
            console.error('Error:', error);
            setFailureMessage(true);
            setMessage('An error occurred. File upload failed.');
        }
    };

    return (
        <div className='container'>
            <div className='row header'>
                <h3>Add from Excel</h3>
                <span className='close' onClick={handleClose}><IoCloseSharp /></span>
            </div>
            {container && <div className='bodycontainer'>
                <p style={{ marginBottom: "60px", marginTop: "30px" }}>Add Candidates to Database</p>
                <div className="body">
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    {showUploadButton && <span onClick={handleFileSelect}>
                        <FaUpload style={{ fontSize: "28px", marginBottom: "20px" }} />
                    </span>}
                    {!showSubmitButton && !showThankYou && <p style={{ marginBottom: "-10px" }}>Upload a .xlsx or .xls file here</p>}
                    {selectedFile && <p>{selectedFile.name}</p>}
                    {showSubmitButton && <button className='submitbtn' onClick={handleSubmit}>Submit</button>}
                    {showThankYou && <p className='thankyoumessage' style={{ color: "rgb(28, 151, 28)" }}>Thank You!</p>}
                    {successmessage && message && <p><FaCheck style={{ color: 'rgb(30, 183, 30' }} />  {message}</p>}
                    {failuremessage && message && <p>{message}</p>}
                    {showThankYou && <p>Your Records Will be processed Shortly.</p>}
                </div>
            </div>
            }</div>
    );
};

export default UploadForm;
