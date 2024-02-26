import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const App: React.FC = () => {

  const [keyword, setKeyword] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'localhost',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  };
  const fetchImages = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(keyword);
      // const response = await axios.get(`http://127.0.0.1:3000/${keyword}`,axiosConfig);
      // const response = await axios.get(`http://127.0.0.1:3000`,axiosConfig);
      const response = await fetch(`http://127.0.0.1:3001/${keyword}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        //mode: 'no-cors' // Add this line to disable CORS
      });
      console.log(response);
      const data = await response.json(); // Await the response.json() method
      setImages(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="App">
      <nav>
        <h1>Image Gallery</h1>
      </nav>
      <header>
        <h2>Find your favorite images</h2>
        <form onSubmit={fetchImages}>
          <input 
            type="text" 
            placeholder="Enter keyword" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        <div className="image-grid">
          {images.map((image, index) => (
            <img key={index} src={image} alt="" />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;