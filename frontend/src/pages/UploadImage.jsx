import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../assets/css/UploadImage.scss";
import uploadIcon from "../assets/icons/Upload.png";
import imageVector from "../assets/icons/image-vector.png";

export default function UploadImage() {
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

  const [images, setImages] = useState([]);
  const [trackers, setTrackers] = useState([false, false, false]);
  const [uploading, setUploading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (currentIndex < 3) {
      const newImages = [...images];
      newImages[currentIndex] = selectedFile;
      setImages(newImages);

      const newTrackers = [...trackers];
      newTrackers[currentIndex] = true;
      setTrackers(newTrackers);

      setCurrentIndex(currentIndex + 1);
      setUploading(true);
      console.log("1st run");
    }
  };
  // // Simulated upload progress
  useEffect(() => {
    if (uploading) {
      const timer = setInterval(() => {
        // Simulate upload completion
        const completed = trackers.filter((tracker) => tracker).length;
        if (completed === 3) {
          // All images uploaded
          setUploading(false);
        }
      }, 2000); // Simulated 2 seconds for upload

      return () => clearInterval(timer);
    }
  }, [uploading, trackers]);

  console.log(images, trackers);
  return (
    <>
      <div className="par-container">
        <div className="par-container__upload-section">
          <div className="par-container__upload-section__heading">
            <p>Upload Image of affected part of skin:</p>
          </div>
          <div className="image-upload">
            <div className="upload-container">
              <div className="upload-box">
                <input
                  type="file"
                  id="profile-picture"
                  accept=".pdf, .jpeg, .png"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  required
                />
                <label htmlFor="profile-picture" className="img-icon">
                  <img
                    src={uploadIcon}
                    alt="img-cloud"
                    height="80px"
                    width="100px"
                  />
                </label>
                <p>
                  Drag and Drop Files or
                  <button
                    className="input-btn"
                    onClick={() => {
                      document.getElementById("profile-picture").click();
                    }}
                    // onChange={(e) => handleImageChange(e)}
                  >
                    Browse
                    {/* {message ? { message } : "Browse"} */}
                  </button>
                </p>
                <p
                  className="upload-icon"
                  style={{ fontSize: "16px", opacity: "0.5" }}
                >
                  (Only pdf, jpeg, png supported)
                </p>
              </div>
            </div>
          </div>
          {images.map((image, index) => (
            <div key={index} className="progress-tracker">
              <p>Uploading Image {index + 1}</p>
              {trackers[index] && (
                <div className="progress-bar">
                  <div className="progress" style={{ width: "100%" }}></div>
                </div>
              )}
            </div>
          ))}
          <button onClick={handleUpload}>Upload File</button>
        </div>
        <div className="par-container__img-section">
          <img src={imageVector} alt="" className="img-vector" />
        </div>
      </div>
    </>
  );
}
