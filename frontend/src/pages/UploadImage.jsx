import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const config = {
        headers: {
          token, // Replace 'your_token_value_here' with the actual token value you want to send.
        },
      };

      // Replace 'YOUR_SERVER_URL' with the actual server endpoint to handle the image upload
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        config
      );

      console.log("Image uploaded successfully:", response.data);
      setMessage("Image uploaded successfully");
      // You can add additional logic here, such as displaying a success message.
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error, e.g., show an error message to the user.
    }
  };

  return (
    <div className="App">
      <h1>Image Upload Form</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload Image</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadImage;
