import React, { useEffect, useState } from "react";
import "../assets/css/diseasepage.scss";
import one from "../assets/icons/one.png";
import two from "../assets/icons/two.png";
import Loader from "../Components/Loader";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function DiseasePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("name");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisease = async () => {
      setSearchResult(null);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/search-disease?disease=${searchQuery}`
        );
        console.log(res);
        setSearchResult(res.data);
      } catch (error) {
        console.log(error);
        setError("An error occured");
      }
    };

    fetchDisease();
  }, [searchQuery]);

  if (error) return <p>{error}</p>;

  if (!searchResult) return <Loader message={"Loading your query..."} />;

  return (
    <div className="disease-parent">
      <div className="images">
        <img src={one} alt="img-1" />
        <img src={two} alt="img-2" />
      </div>
      <div className="disease-details">
        {/* <div className="key-points">
          <h5>Key Points</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            dolorum aut architecto est sint, eum ratione porro accusantium
            assumenda numquam commodi, iure, iste officiis fugit. Aperiam
            eveniet illum explicabo doloremque?
          </p>
        </div>
        <div className="key-points">
          <h5>Common Medicines</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            dolorum aut architecto est sint, eum ratione porro accusantium
            assumenda numquam commodi, iure, iste officiis fugit. Aperiam
            eveniet illum explicabo doloremque?
          </p>
        </div>
        <div className="key-points">
          <h5>Preventive Measures</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            dolorum aut architecto est sint, eum ratione porro accusantium
            assumenda numquam commodi, iure, iste officiis fugit. Aperiam
            eveniet illum explicabo doloremque?
          </p>
        </div>
        <div className="key-points">
          <h5>Home Remedies</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            dolorum aut architecto est sint, eum ratione porro accusantium
            assumenda numquam commodi, iure, iste officiis fugit. Aperiam
            eveniet illum explicabo doloremque?
          </p>
        </div> */}
        <div
          className="key-points"
          style={{
            padding: "1rem",
          }}
        >
          <h3>
            Disease name : <i>{searchQuery}</i>
          </h3>
        </div>
        <div
          className="key-points"
          style={{
            padding: "2rem",
          }}
        >
          <h4>
            <strong>Main Points</strong>
          </h4>
          {searchResult["Key Points"].split("\n").map((k, i) => (
            <p key={i}>{k}</p>
          ))}
        </div>
        <hr style={{ width: "95%" }} />
        <div
          className="key-points"
          style={{
            padding: "2rem",
          }}
        >
          <h4>
            <strong>Solutions</strong>
          </h4>
          {searchResult["Common Symptoms"].split("\n").map((k, i) => (
            <p key={i}>{k}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiseasePage;
