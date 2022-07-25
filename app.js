import React from 'react';
import {useState} from 'react';
import './App.css';

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('myFile', selectedFile);

    fetch(
      'http://localhost:3600/files/upload',
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        debugger;
        console.log('Success:', result);
      })
      .catch((error) => {
        debugger
        console.error('Error:', error);
      });
  };

  

  return (
    <div className='App'>
      <input type="file" name="file" onChange={changeHandler} />
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {(selectedFile.size/1024/1024).toFixed(3)} MB</p>
          
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmit}>Upload</button>
      </div>
    </div>
  )
}
