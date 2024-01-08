import React, { useState } from "react";
import { useContext } from "react";
import Notecontext from "../context/notes/Notecontext";

const Addnote = () => {
  const context = useContext(Notecontext);
  const { addnote } = context;

  const [note, setnote] = useState({ title: "", description: "", tag:"" });
  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag:"" })
    // addnote(note)
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  };
  return (
    <div>
      <div className="container my-3">
        <h2 className="text-center">Add Note</h2>
        <div className="container my-3">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                aria-describedby="emailHelp"
                value={note.title}
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
                id="description"
                name="description"
                value={note.description}
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
                id="tag"
                name="tag"
                value={note.tag}
                onChange={onchange}
              />
            </div>

            <button
              type="submit"
              disabled={note.title.length<5 || note.description.length<5}
              className="btn btn-primary"
              onClick={handleclick}
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addnote;
