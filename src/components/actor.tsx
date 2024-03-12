import { useEffect, useState } from "react";
import axios from "axios";

const ActorPhoto = ({ actorName }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const fetchActorPhoto = async () => {
      try {
        const response = await axios.get("https://vision.googleapis.com/v1/", {
          params: {
            q: actorName + " professional photo",
            cx: "AIzaSyASw79h4imtrWaQ1G00Sbo1h9tGzVhlU2s",
            key: "AIzaSyCOlY7_h60sZUG_MC31Z5ABbMB3Qqv6fY0",
            searchType: "image",
            num: 1, // Get only one result
          },
        });

        const firstImage = response.data.items[0];
        if (firstImage) {
          setPhotoUrl(firstImage.link);
        }
      } catch (error) {
        console.error("Error fetching actor photo:", error);
      }
    };

    fetchActorPhoto();
    console.log("cunt");
  }, [actorName]);

  return (
    <div>
      {photoUrl ? (
        <img src={photoUrl} alt={`${actorName} professional photo`} />
      ) : (
        <p>No professional photo found for {actorName}</p>
      )}
    </div>
  );
};

export default ActorPhoto;
