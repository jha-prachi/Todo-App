import React, { useState,useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import db from './firebase';
import './App.css';
import Todo from './Todo';
import firebase from 'firebase';
import SpeakerNotesSharpIcon from '@material-ui/icons/SpeakerNotesSharp';
import InputAdornment from '@material-ui/core/InputAdornment';


function App() {
  const [todos, settodo] = useState(['abc','def']);
  const [input, setinput] = useState('');
  // console.log(input);
   //When the app runs we need to listen to the db  and fetch new todos as they got added
  
  useEffect(() => {
    // this code here... fires when the app.js loads
    // useEffect takes 2 parameter function,dependancies
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log("hi"+snapshot.docs.map(doc => doc.data().todo));
      
      settodo(snapshot.docs.map(doc => ({id:doc.id,todo:doc.data().todo})))
    })
  }, []);
// just want to run the snippet of code once when the App is load and never again cause we want to attach a 
// listner to the db that ping me with new update


   // input field ke liye i created new state
  // const admin = require('firebase-admin')
  // const fieldValue = admin.firestore.FieldValue; 
 
 function  handleChange  (event)
   {
    setinput(event.target.value);
 }
  
  const addtodo = (event) => {
    // ab mujhe chaiye todo add ho jaye
    // phele se kuch hain unko add karleti hu 
    event.preventDefault();
    db.collection('todos').add({
      // add to the db which then fires off a snapshot :then it change and it takes new snapshot  
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }) 
    // settodo([...todos, input]); ye karne ki zarut nahi
    // ab jo input aayega wo todos ke state mein jakar update hoga.
    // alert("Yes! you clicked");
    // for setting up the default input we have to update the input state
    setinput('');
    // console.log(todos);

    
  }
  return (
    <div className="app">
      <h1 className="header-to-do">WRITE YOUR NOTES HERE</h1>
      <form id ="to-do-form">
        {/* <input value={input} onChange={handleChange} /> */}
        <FormControl >
          <InputLabel>Add Your Todo</InputLabel>
          <Input id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                < SpeakerNotesSharpIcon/>
              </InputAdornment>
            }value={input} onChange={handleChange} />
         
        </FormControl>

        {/* <Button disabled={!input} type="submit" onClick={addtodo} variant="contained" color="secondary">Add todo</Button> */}
        <button disabled={!input} type="submit" onClick={addtodo}>ADD TODO</button>
        {/* disabled={!input} this helps me  to prevent  additional spacing dure to setinput*/}
      </form>
      
      <ul>
        {todos.map(todo => (
      <Todo todo={todo}/>
       ))}
      </ul>
    </div>
  );
}

export default App;
