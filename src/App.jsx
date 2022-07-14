import React, { useState } from 'react'
import './app.css'

export function App() {  
  const [ text, setText ] = useState("");
  const [ repeatedWords, setRepeatedWords ] = useState("");

  function wordsCounter() {
    const array = text
      .replace(/([.,;:"()'{}/\|%$*“”+=_<>#@?!])/g, " ") // punctuation and others to " "
      .replace(/[\n\r]+(?!$)/g, " ") //linebreak n' last to " "
      .replace(/\s+/g, ' ') // multiplies spaces to one
      .trim() // ignore first and last space
      .toLowerCase() // same letters
      .split(" "); // words for " "  , e voilà      
    let count = {};
    let result = '';
    for (let i = 0; i < array.length; i++) {
      if(array[i] !== ""){
        if(count[array[i]]) {
          count[array[i]]+=1;
        } else {
          count[array[i]] = 1;
        }
      }
    }
    Object.keys(count).map(word => {
    result += word + ' [ '+ count[word] +' ] ' + '<br />' ;    
    });

    var sortedWords = Object
      .entries(count)
      .sort(function(a,b) { return [ b[1] - a[1] ] })
      .join('\n')      
      .replace(/([,])/g, "=>");
    
    console.log(sortedWords);
    setRepeatedWords(sortedWords);
  } 

  var words = text
    .replace(/([.,;:"()'{}/\|%$*“”+=_<>#@?!])/g, " ")
    .replace(/[\n\r]+(?!$)/g, " ")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .split(" ");
  
  var lengthWords = words.length;
  if(text === "" || text[0] === " "){    
    lengthWords = 0;
  }
  var resultRender = lengthWords + " words, and " + text.length + " characters." 
  
  return (
    <>
      <h2 className="title">Word Frequency Counter</h2>
      <textarea 
        id="input-area" 
        className="input-area"
        onChange={(e) => setText(e.target.value)}
      >        
      </textarea>
      <button id="button" className="button" onClick={wordsCounter}>Count Each Word and Sort</button>
      <h3 className="word-length">Words: {resultRender}</h3>
      <br></br>
      <h3 className="repeated-length">Sorted Words: <br></br> {repeatedWords}</h3>
    </>
  )
}