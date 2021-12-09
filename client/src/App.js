import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing ] = useState(false)
  const [color, setColor] = useState('')

useEffect(()=> {
  const canvas = canvasRef.current;
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  const context = canvas.getContext("2d");
  context.scale(2,2)
  context.lineCap = "round"
  context.strokeStyle = 'black'
  context.lineWidth = 5;
  contextRef.current = context;
},[])






  const startDrawing = ({nativeEvent}) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);

  }

const finishDrawing = () => {
  contextRef.current.closePath();
  setIsDrawing(false);

}

const draw = ({nativeEvent}) => {
  if (!isDrawing ){
    return 
  }
  let background = document.getElementById('canvas').getContext('2d')
  background.strokeStyle = `${color}`
  const { offsetX, offsetY } = nativeEvent;
  contextRef.current.lineTo(offsetX, offsetY)
  contextRef.current.stroke()
}

  return (
    <div>
    <canvas id="canvas"
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      
    />
    <button value="black" onClick={(e) => setColor(e.target.value)}>Black</button>
    <button value="red" onClick={(e)=> setColor(e.target.value)}>Red</button>
    <button value="blue" onClick={(e)=> setColor(e.target.value)}>Blue</button>

   </div>
  );
}

export default App;
