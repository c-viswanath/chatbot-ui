import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [mode, setMode] = useState('automatic');
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);

  const toggleCategoryField = (event) => {
    setMode(event.target.value);
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const submitForm = async () => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });
    formData.append('mode', mode);
    if (mode === 'manual') {
      formData.append('category', category);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/upload_file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Upload Success:', data);
      alert('Files uploaded successfully!');
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };

  const submitQuery = async (event) => {
    event.preventDefault();

    if (!query) {
      alert('Please enter a question.');
      return;
    }

    const payload = { query };

    try {
      const response = await fetch('http://127.0.0.1:8000/answer_query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Query Success:', data);
      setResponse(data.answer.content);
    } catch (error) {
      console.error('Query Error:', error);
      alert('Failed to get an answer.');
    }
  };

  return (
    <div className="Sidebar">
      <div className="container">
        <h2>Upload Documents</h2>
        <form id="uploadForm" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="files">Choose Files:</label>
            <input type="file" id="files" name="files" multiple onChange={handleFileChange} />
          </div>
          <div className="form-group">
            <label htmlFor="mode">Categorization Mode:</label>
            <select id="mode" name="mode" value={mode} onChange={toggleCategoryField}>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          {mode === 'manual' && (
            <div className="form-group" id="categoryField">
              <label htmlFor="category">Enter Category:</label>
              <input type="text" id="category" name="category" value={category} onChange={handleCategoryChange} />
            </div>
          )}
          <button type="button" onClick={submitForm}>Upload</button>
        </form>
      </div>

      <div className="container">
        <h2>Ask a Question</h2>
        <form id="chatForm" onSubmit={submitQuery}>
          <div className="form-group">
            <label htmlFor="query">Enter your question:</label>
            <textarea id="query" name="query" rows="4" value={query} onChange={handleQueryChange}></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
        {response && <div id="response">{response}</div>}
      </div>
    </div>
  );
};

export default Sidebar;
