import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import "./Upload.css";
import { storage, db } from "./firebase";
import firebase from "firebase";

function Upload({ username }) {
  const [progress, setProgress] = useState(0);
  const [imageUpload, setImageUpload] = useState(null);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImageUpload(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    const uploadTask = storage
      .ref(`images/${imageUpload.name}`)
      .put(imageUpload);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // function for progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(imageUpload.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              caption: caption,
              imageUrl: url,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username: username,
            });
            setCaption("");
            setImageUpload(null);
            setProgress(0);
          });
      }
    );
  };

  return (
    <div>
      <form className="upload">
        <progress
          className="upload__progress"
          value={progress}
          onChange={() => setProgress()}
          max="100"
        />
        <Input
          type="text"
          placeholder="Text a caption...."
          className="upload__caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}>upload</Button>
      </form>
    </div>
  );
}

export default Upload;
