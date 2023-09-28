import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../assets/css/UploadImage.scss";
import uploadIcon from "../assets/icons/Upload.png";
import imageVector from "../assets/icons/image-vector.png";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function UploadImage() {
  const [progress, setProgress] = useState(Array(3).fill(10));
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { token } = useContext(AuthContext);
  const [uploadingImageIndex, setUploadingImageIndex] = useState(-1);
  const [uploadedFileName, setUploadedFileName] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (file) => {
    if (file && !uploading) {
      setSelectedFile(file);
      setImages((prevImages) => [...prevImages, file]);
      setProgress((prevProgress) => [...prevProgress, 0]);
      setCurrentIndex(currentIndex + 1);
      setUploadingImageIndex(currentIndex);
      setUploading(true);
      setUploadedFileName((prevFileNames) => [...prevFileNames, file.name]);
    }
  };

  const handleUpload = async () => {
    // along with upload image api done below vaibhav and harsh add report genrating wali api in this function only

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      setLoading(true);

      try {
        const res = await axios.post("http://127.0.0.1:7000/predict", formData);
        console.log(res);
        formData.append(
          "diseaseName",
          res.data.prediction ? res.data.prediction : "Model error"
        );
      } catch (error) {
        formData.append("diseaseName", "model is not connected");
      }

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

      console.log(response);

      navigate(`/report/${response.data.index}`);
      // You can add additional logic here, such as displaying a success message.
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      // Handle error, e.g., show an error message to the user.
    }
  };

  // image-progress-bar loader

  useEffect(() => {
    if (uploadingImageIndex >= 0 && uploadingImageIndex < images.length) {
      // Simulated upload progress
      let uploadProgress = [...progress];
      const timer = setInterval(() => {
        if (uploadProgress[uploadingImageIndex] < 100) {
          uploadProgress[uploadingImageIndex] += 10; // Update the progress for the specific image
          setProgress([...uploadProgress]);
        } else {
          clearInterval(timer);
          setUploading(false);

          if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setProgress((prevProgress) => [...prevProgress, 0]);
            setUploading(true);
          }
        }
      }, 1000); // Simulated 1 second for each 10% progress
    }
  }, [
    currentIndex,
    images,
    uploading,
    uploadingImageIndex,
    progress,
    uploadedFileName,
  ]);
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  // drag-drop functionality
  const handleDrop = (e) => {
    e.preventDefault();

    // Get the dropped files
    const files = e.dataTransfer.files[0];
    handleFileChange(files);
    console.log(files);
  };

  if (loading) return <Loader message={"Generating Results"} />;

  return (
    <>
      <div className="par-container">
        <div className="par-container__upload-section">
          <div className="par-container__upload-section__heading">
            <p>Upload Image of affected part of skin:</p>
          </div>
          <div className="image-upload">
            <div
              className="upload-container"
              onDrop={(e) => handleDrop(e)}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="upload-box">
                <input
                  type="file"
                  id="profile-picture"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleFileChange(e.target.files[0])}
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
                      if (currentIndex === 1)
                        return alert("Only 3 image uploads allowed");

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
                  (Only jpg, jpeg, png supported)
                </p>
              </div>
            </div>
          </div>
          {images.map((img, index) => (
            <div key={index} className="progress-tracker">
              {progress[index] === 100 ? (
                <>
                  <p className="upload ">Uploaded</p>
                  <div className="progress-bar" style={{ padding: "10px" }}>
                    <b style={{ color: "gray" }}>File: </b>
                    {uploadedFileName[index]}
                    {/* <LinearProgressWithLabel value={progress[index]} /> */}
                  </div>
                </>
              ) : (
                <>
                  <p className="upload">Uploading...</p>
                  <div className="progress-bar">
                    Your file:
                    <LinearProgressWithLabel value={progress[index]} />
                  </div>
                </>
              )}
            </div>
          ))}

          <button
            className={`generate-btn ${
              images.length !== 1 ? "gen-inactive" : ""
            }`}
            onClick={handleUpload}
          >
            Generate Report
          </button>
        </div>

        <Box
          className="par-container__img-section"
          sx={{
            display: "none",
            "@media (min-width: 960px)": {
              display: "initial",
            },
          }}
        >
          <img src={imageVector} alt="" className="img-vector" />
        </Box>
      </div>
    </>
  );
}
