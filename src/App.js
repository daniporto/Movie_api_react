import React, { useState, useEffect } from 'react';
import './App.css';

function App() {


  const [endPoint, setEndPoint] = useState('');
  const [container, setContainer] = useState([]);

  useEffect(() => {
    if (endPoint.trim() !== '') {
      fetchMe();
    }
  }, [endPoint]);

  const fetchMe = () => {
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${endPoint}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '65e845c99fmshfb7070778d6ea7fp1c7901jsn4ba7a127ff3f',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (!data || !data.d) {
          throw new Error('Empty response or invalid data format');
        }
        setContainer(data.d);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  };

  const onChangeHandler = e => {
    setEndPoint(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    fetchMe();
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
      <h1> Search for your Movie or TV Show</h1>
      <div className="box">
        <input  type="text" placeholder=" Hey! Search for your movie or TV Show" value={endPoint} onChange={onChangeHandler} />
        <button type="submit">Submit</button>
        </div>
      </form>
      <div className="element">
      {container && container.length > 0 && container.map(item => (
        <div key={item.id} className="element-div">
          <img src={item.i?.imageUrl} alt="" />
          <p>{item.l}</p>
          <p>{item.s}</p>
          <p>{item.y}</p>
        
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;