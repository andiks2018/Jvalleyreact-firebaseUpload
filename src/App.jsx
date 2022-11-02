import { useState } from "react";
import "./App.css";
import { storage } from "./config/firebaseConfig";
import { ref, uploadBytes, listAll } from "firebase/storage";

function App() {
  //state penampung preview image
  const [imagePrev, setImagePrev] = useState("");

  //preview image before upload
  const handlePreviewImage = (e) => {
    //console.info(e);

    const file = e.target.files[0];
    //console.info(file);
    const reader = new FileReader();

    reader.onload = (res) => {
      //console.info(res.target.result);
      setImagePrev(res.target.result);
    };

    reader.readAsDataURL(file);
  };

  //handle upload to firebase
  const handleSubmit = (e) => {
    e.preventDefault();

    //tangkap file dari form
    const file = e.target.image.files[0];

    //buat reference
    const uploadRef = ref(storage, "/simple_upload/" + file.name);

    //upload process
    uploadBytes(uploadRef, file)
      .then((res) => {
        console.info("file berhasil di upload");
      })
      .catch((err) => {
        console.error(err);
      });

    //reset
    e.target.image.files = [];
    setImagePrev("");
  };

  return (
    <div className="App">
      <form action="form_image" onSubmit={handleSubmit}>
        <label htmlFor="image">Image</label>
        <input type="file" accept="image/jpg, image/jpeg, image/png, image/gif" onChange={handlePreviewImage} id="image" />
        <img src={imagePrev} alt="image prev" width={200} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
