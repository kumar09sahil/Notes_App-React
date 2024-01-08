import React from "react";
import { useContext,useState, useEffect, useRef } from "react";
import Notecontext from "../context/notes/Notecontext";
import NotesItem from "./NotesItem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const [note, setnote] = useState({id:"", etitle: "", edescription: "", etag:"" });
  const context = useContext(Notecontext);
  const { notes, fetchallnotes, editnote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      fetchallnotes();
    }
    else{
      navigate('/login')
    }
  }, []);

  const updatenote = (currentnote) =>{
      ref.current.click()
      setnote({id:currentnote._id, etitle: currentnote.title, edescription: currentnote.description})
      
    }
    
    const handleclick = (e) => {
      console.log("text updated",note)
      editnote(note.id, note.etitle, note.edescription, note.etag)
      refclose.current.click()
      props.showalert("Notes updated","success")

    // addnote(note)
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  };

  const ref = useRef(null)
  const refclose = useRef(null)
  return (
    <>
      <Addnote showalert={props.showalert}/>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="container my-3">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="etitle"
                name="etitle"
                aria-describedby="emailHelp" 
                value={note.etitle}
                onChange={onchange}
              />  
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="edescription"
                name="edescription"
                value={note.edescription}
                onChange={onchange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="etag"
                name="etag"
                value={note.etag}
                onChange={onchange}
              />
            </div>
          </form>
        </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refclose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button"  className="btn btn-primary" onClick={handleclick} disabled={note.etitle.length<5 || note.edescription.length<5}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="container mx-3">
        <h2>your notes</h2>
        {notes.length=== 0 && 'no note available ..!'}
        </div>
        {notes.map((note) => {
          return <NotesItem key={note._id} showalert={props.showalert} updatenote={updatenote} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
