import { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [undid, setUndidi] = useState([]);

  const handleClick = (event) => {
    console.log("X:", event.clientX);
    console.log("Y:", event.clientY);

    const click = {
      clientX: event.clientX,
      clientY: event.clientY
    }

    setList((prev) => [...prev, click]);
    setUndidi([]);
  }

  const handleUndo = (event) => {
    event.stopPropagation();

    if (list.length === 0) return;

    const lastItem = list[list.length - 1];
    setUndidi((prev) => [...prev, lastItem]);

    setList((prev) => {
      const newArray = [...prev].slice(0, -1);
      return newArray;
    });
  }

  const handleRedo = (event) => {
    event.stopPropagation();
    
    if (undid.length === 0) return;

    const recoveredItem = undid[undid.length - 1];
    setUndidi((prev) => {
      const newArray = [...prev].slice(0, -1);
      return newArray;
    });

    setList((prev) => [...prev, recoveredItem]);
  }

  return (
    <div id="page" onClick={handleClick}>
      {list.map((item, index) =>
        <span key={index} className='circle' style={{left: item.clientX, top: item.clientY}}/>
      )}
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
    </div>
  );
}

export default App;
