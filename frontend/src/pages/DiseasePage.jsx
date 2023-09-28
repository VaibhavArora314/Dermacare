import React, { useEffect, useState } from "react";
import "../assets/css/disease.scss";
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
        <div className="key-points">
          <h4>Disease name {searchQuery}</h4>
        </div>
        <div className="key-points">
          <h5>Main Points</h5>
          {searchResult["Key Points"].split("\n").map((k, i) => (
            <p key={i}>{k}</p>
          ))}
        </div>

        <div className="key-points">
          <h5>Solutions</h5>
          {searchResult["Common Symptoms"].split("\n").map((k, i) => (
            <p key={i}>{k}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiseasePage;
