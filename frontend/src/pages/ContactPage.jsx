import React, { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";

const ContactUsForm = () => {
  const paperStyle = {
    padding: "20px",
    textAlign: "center",
    width: "80%",
    margin: "auto",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const buttonStyle = {
    background: "#038c13",
    color: "white",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can add logic to send the form data to your server or perform any other actions.
    console.log(formData);
  };

  return (
    <div>
      <Grid container justifyContent="center" sx={{ marginTop: 10 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} style={paperStyle}>
            <Typography variant="h5">Contact Us</Typography>
            <form style={formStyle} onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                label="Subject"
                variant="outlined"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <TextField
                label="Message"
                variant="outlined"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                style={buttonStyle}
                fullWidth
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactUsForm;
