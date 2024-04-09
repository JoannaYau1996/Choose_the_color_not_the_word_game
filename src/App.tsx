import './App.css'
import { useState, useEffect } from 'react';
import { words } from "./word.jsx";

var newWord = [...words];
var cuerrentColorindex = Math.floor(Math.random() * newWord.length);

export default function App() {
  const [score, setScore] = useState(0)
  const [cuerrntindex, setCuerrntindex] = useState(cuerrentColorindex);
  const [timer, setTimer] = useState(100);
  const [start, setStart] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (start == true) {
      if (timer == 0) {
        setGameover(true);
      }
      const intervalId = setInterval(() => {
        setTimer((t) => {
          return (t == 0) ? t : t - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  });



  function check(e) {
    if (e == newWord[cuerrntindex].color) {
      newWord.splice(cuerrntindex, 1);
      const next = Math.floor(Math.random() * newWord.length);
      console.log(newWord);
      if (newWord.length >= 1) {
        setScore(score + 1);
        setCuerrntindex(next);
        setTimer(2);
      } else if (newWord.length === 0) {
        setScore(score + 1);
        setWin(true);
        setStart(false)
      }
    } else if (e !== newWord[cuerrntindex].color) {
      setStart(false)
      setGameover(true)
    }
  }


  function gamestart() {
    setTimer(2);
    newWord = [...words];
    cuerrentColorindex = Math.floor(Math.random() * newWord.length);
    setCuerrntindex(cuerrentColorindex);
    setGameover(false);
    setWin(false);
    setScore(0);
    setStart(true);
  }


  return (
    <>
      {!start && !gameover && !win && <div className='container-fluid min-vh-100 w-100 m-0 text-center main bg-dark d-flex flex-column justify-content-center align-items-center'>
        <h1 className='fw-bold mb-5 hometitle'>Choose the color not the word</h1>
        <p className='rule py-5 px-4'>
          <span className='my-3 fw-bold text-dark' style={{ fontSize: "5vh" }}>How To Play:</span>
          <br />
          you have 2 seconds to select the color of the word<br /> not the word itself</p>
        <span className='text-light my-3'>Are you Ready?</span>
        <button onClick={gamestart} className="startbtn px-5 py-2 fw-bold">Start</button>
      </div>}




      {start && !gameover && <div className='container-fluid text-center main min-vh-100 w-100 m-0 bg-dark d-flex flex-column justify-content-center align-items-center'>
        <h4 className='mb-3' style={{ color: "#ff6633" }}>choose the color not the word</h4>
        <h1 style={{ color: newWord[cuerrntindex].color }} className="fw-bold mb-2 mb-md-4 title">{newWord[cuerrntindex].word}</h1>
        <p className='text-light m-0 timer py-2'>Time: {timer}</p>
        <div className='row m-0 w-100'>
          {newWord[cuerrntindex].ans.map((option) => (
            < div className='col-12' >
              <button className="option mt-4 p-2 min-w-100" style={{ color: option.anscolor, fontWeight: "bold" }} onClick={() => check(option.answord)}>{option.answord}</button>
            </div>
          ))}
        </div>
      </div>}


      {
        gameover && <div className='container-fluid min-vh-100 w-100 m-0 text-center main bg-dark d-flex flex-column justify-content-center align-items-center'>
          <h1 className='fw-bold mb-5 hometitle'>Game Over</h1>
          <p className='score py-5 px-4 mb-5'>
            <span className='my-3 fw-bold text-dar' style={{ fontSize: "5vh" }}>Your Score: {score}</span></p>
          <button onClick={gamestart} className="startbtn px-5 py-2 fw-bold">Restart</button>
        </div>
      }


      {
        win && <div className='container-fluid min-vh-100 w-100 m-0 text-center main bg-dark d-flex flex-column justify-content-center align-items-center'>
          <h1 className='fw-bold mb-5 hometitle'>You Win</h1>
          <p className='score py-5 px-4 mb-5'>
            <span className='my-3 fw-bold text-dar' style={{ fontSize: "5vh" }}>Your Score: {score}</span></p>
          <button onClick={gamestart} className="startbtn px-5 py-2 fw-bold">Restart</button>
        </div>
      }

    </>
  )
}
