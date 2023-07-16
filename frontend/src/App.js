import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [date, setDate] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setErrorMessage('');
    // Perform form validation
    if (!date || !vendorName || !file) {
      setErrorMessage('Please fill in all fields.');
      setLoading(false)
      return;
    }

    const formData = new FormData();
    formData.append('date', date);
    formData.append('vendorName', vendorName);
    formData.append('csvFile', file);
    const url = 'http://localhost:4000/upload';


    axios
      .post(url, formData)
      .then((res) => {
        if (res.data.status === 'failed') {
          setErrorMessage(res.data.message);
        }
        if (res.data.status === 'success') {
          setSuccessMessage(res.data.message);
          setDate('');
          setVendorName('');
          setFile(null);
          setErrorMessage('');
        }
        setLoading(false)
      })
      .catch((err) => {
        setErrorMessage('Something went wrong.');
        setLoading(false)
      });
  };


  return (
    <div className="purchase-order-form">
      <h1>Purchase Order Form</h1>
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vendorName">Vendor Name:</label>
          <input
            type="text"
            id="vendorName"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">CSV File:</label>
          <input
            type="file"
            id="file"
            accept=".csv"
            name='file'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit">{loading ? 'Getting Results...' : 'Submit'}</button>
      </form>
    </div>
  );
};


export default App;
