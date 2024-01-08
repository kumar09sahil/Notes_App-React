import React from "react";
import { useState } from "react";
import Notecontext from "./Notecontext";

const NoteState = (props) => {
  const url = "http://localhost:5000";
  const note = [{
    _id: "65133719a68cf887154ae15a",
    user: "6511e2821bf050d2f25f6c16",
    title: "hello world",
    description: "description",
    tag: "tag",
    Date: "2023-09-26T19:55:05.998Z",
    __v: 0,
  }]
  const [notes, setnotes] = useState(note);
  

  // get all notes
  const fetchallnotes = async () => {
    const response = await fetch(`${url}/api/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
          
      },
    });
    const json = await response.json();
    setnotes(json)
  };
  
  // add a note
  const addnote = async (title, description, tag) => {
    // api call
    const response = await fetch(`${url}/api/note/createnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
          
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json =await response.json();

    const note = {
      _id: "65133719a68cf887154ae15a",
      user: "6511e2821bf050d2f25f6c16",
      title: title,
      description: description,
      tag: tag,
      Date: "2023-09-26T19:55:05.998Z",
      __v: 0,
    };
    setnotes(notes.concat(note));
  };
  //delete a node
  const deletenote = async (id) => {
    const response = await fetch(`${url}/api/note/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
          
      },
    });
    const newnote = notes.filter((note) => {
      return id !== note._id;
    });
    setnotes(newnote);
  };

  //edit a node
  const editnote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${url}/api/note/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
          
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json =await response.json();

    const newnotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newnotes.length; index++) {
      let Element=newnotes[index]
      if (Element._id === id) {
        newnotes[index].title = title
        newnotes[index].description = description
        newnotes[index].tag = tag
        break;
      }
    }
    setnotes(newnotes)
  };

  return (
    <Notecontext.Provider
      value={{ notes, addnote, deletenote, editnote, fetchallnotes }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};

export default NoteState;
