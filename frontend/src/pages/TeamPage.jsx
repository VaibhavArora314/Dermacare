import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Loader from "../Components/Loader";

function TeamMemberCard({ name, profileUrl, image }) {
  const cardStyle = {
    width: 300,
    margin: 10,
    cursor: "pointer", // Add cursor pointer for clickability
    transition: "transform 1s",
  };

  const mediaStyle = {
    height: 350,
  };

  const cardContentStyle = {
    borderRadius: 18, // Adjust the border radius as needed
  };

  const handleCardClick = () => {
    // Redirect to the user's profile URL when the card is clicked
    window.location.href = profileUrl;
  };

  // const handleCardHover = (event) => {
  //   // Apply a slight scale transform on hover
  //   event.target.style.transform = "scale(1.05)";
  // };

  // const handleCardLeave = (event) => {
  //   // Reset the transform on hover exit
  //   event.target.style.transform = "scale(1)";
  // };

  return (
    <div onClick={handleCardClick} style={cardStyle}>
      <Card style={cardContentStyle}>
        <CardMedia style={mediaStyle} image={image} title={name} />
        <CardContent>
          <Typography variant="h5" component="div" align="center">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState(null);
  const [error, setError] = useState(null);

  const loadTeamMembers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/team");

      const members = [];
      for (let member of response.data.team) {
        try {
          const res = await axios.get(`https://api.github.com/users/${member}`);
          members.push(res.data);
        } catch (error) {
          console.log(member, error);
        }
      }

      console.log(members);
      setTeamMembers(members);
    } catch (error) {
      console.log(error);
      setTeamMembers(null);
      setError("Error retrieving team members");
    }
  };

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const gridContainerStyle = {
    flexGrow: 1,
    padding: 16,
    marginTop: 50,
    marginLeft: 100,
    marginRight: 100,
  };

  const handleCardHover = (event) => {
    // Apply a slight scale transform on hover
    event.target.style.transform = "scale(1.05)";
  };

  const handleCardLeave = (event) => {
    // Reset the transform on hover exit
    event.target.style.transform = "scale(1)";
  };

  if (error)
    return <h1 style={{ textAlign: "center", marginTop: "2rem" }}>{error}</h1>;

  if (!teamMembers) return <Loader message={"Loading info..."} />;

  return (
    <div style={gridContainerStyle}>
      <h1
        style={{
          textAlign: "center",
          margin: "2rem",
          fontFamily: "montserrat",
          fontSize: "2.5em",
        }}
      >
        Meet <span style={{ color: "#088586" }}>our</span> Team
      </h1>
      <Grid container justifyContent="center" spacing={3}>
        {teamMembers.map((member) => (
          <Grid
            item
            key={member.id}
            sx={{ transition: "transform 0.5s" }}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <TeamMemberCard
              name={member.name}
              image={member.avatar_url}
              profileUrl={member.html_url}
              style={{ height: "50%" }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Team;
