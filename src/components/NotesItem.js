import React from "react";
import { useContext } from "react";
import Notecontext from "../context/notes/Notecontext";

const NotesItem = (props) => {
  const context = useContext(Notecontext);
  const {deletenote, editnote} = context;

  const { note, updatenote } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description} </p>
          <i className="fa-regular fa-trash-can mx-2" onClick={() => {deletenote(note._id); props.showalert("Note deleted succesfully","success")}}></i>
          <i className="fa-sharp fa-solid fa-pen-to-square mx-2" onClick={()=>updatenote(note)}> </i>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
