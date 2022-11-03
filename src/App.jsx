import { useState } from "react";
import "./App.css";
import { storage } from "./config/firebaseConfig";
import { ref, uploadBytes, listAll } from "firebase/storage";
import { useEffect } from "react";

function App() {
  //state penampung preview image
  const [imagePrev, setImagePrev] = useState("");
  const[imageData, setImageData]=useState([])
  const[refresh, setRefresh]= useState(false)

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
        //reset
        setImagePrev("");
        setRefresh(!refresh)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //list semua image di folder simple_upload
  const listImage = async () => {

    let newArr = []
    //ref dari folder simple_upload
    const sfRef = ref(storage, "/simple_upload");

    
    await listAll(sfRef)
      .then((res) => {
        res.items.forEach((e, i) => {
          console.info(e.name);
          newArr.push({
            id: i,
            url: `https://firebasestorage.googleapis.com/v0/b/jumat23okt-5e3d6.appspot.com/o/simple_upload%2F${e.name}?alt=media&token=00dbe180-8828-4211-985e-600e19754345`
          })
        });
      })
      .catch((err) => {
        console.info(err);
      });
      return newArr
  };

  //cls
  useEffect(() => {
    listImage()
    .then((res)=>{
      //console.info(res)
      setImageData(res)
    })
  }, [refresh]);

  return (
    <div className="App">
      <form action="form_image" onSubmit={handleSubmit}>
        <label htmlFor="image">Image</label>
        <input type="file" accept="image/jpg, image/jpeg, image/png, image/gif" onChange={handlePreviewImage} id="image" />
        <img src={imagePrev} alt="image prev" width={200} />
        <button type="submit">submit</button>
      </form>

      {imageData.map((e)=>(
        <img src={e.url} alt={e.url} key={e.id} style={{width:100, height:100, objectFit:'cover', margin:10}} />
      ))}

    </div>
  );
}

export default App;
