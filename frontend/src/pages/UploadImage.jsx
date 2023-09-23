import React, { useEffect, useState } from "react";
import "../assets/css/UploadImage.scss";
import uploadIcon from "../assets/icons/Upload.png";
import imageVector from "../assets/icons/image-vector.png";

export default function UploadImage() {
  const [picture, setPicture] = useState(null);

  const handleProfilePictureChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setPicture(selectedFile);
    }
  };

  const [images, setImages] = useState([]);
  const [trackers, setTrackers] = useState([false, false, false]);
  const [uploading, setUploading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageChange = (event) => {
    const selectedFile = event.target.file && event.target.files[0];
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

  console.log(picture);
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
                  onChange={handleProfilePictureChange}
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
                    onChange={(e) => handleImageChange(0, e)}
                  >
                    Browse
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
        </div>
        <div className="par-container__img-section">
          <img src={imageVector} alt="" className="img-vector" />
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
      </div>
    </>
  );
}
