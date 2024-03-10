import React, { useEffect, useState } from "react";
// import { database } from "./Story";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// react icons
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useContext } from "react";
import { StoryContext } from "./context/firebase";
import Popup from "./popup";

// share Icons
import { CiShare1 } from "react-icons/ci";

export default function Popular({ onChildValue }) {
  function ListItem({ value }) {
    const [share, setShare] = useState(false)
    const [staredItem, setStaredItem] = useState([]);

    const handleShare = () => {
      setShare(prev => !prev)
    }

    const handleClick = () => {
      onChildValue(value);
    };

    useEffect(() => {
      const likedItems = localStorage.getItem("starredItems");
      if (likedItems) {
        setStaredItem(JSON.parse(likedItems));
      }
    }, []);

    useEffect(() => {
      localStorage.setItem("starredItems", JSON.stringify(staredItem));
    }, [staredItem]);

    const handleFavourite = (value) => {
      setStaredItem((prevStaredItem) => {
        const itemIdx = prevStaredItem.indexOf(value);
        if (itemIdx === -1) {
          return [...prevStaredItem, value];
        } else {
          const updateItems = [...prevStaredItem];
          updateItems.splice(itemIdx, 1);
          return updateItems;
        }
      });
    };

    const isStarted = (item) => {
      return staredItem.includes(item);
    };

    return (
      <>
        <li>
          {value}
          {isStarted(value) ? (
            <FaStar
              className="icon1 star"
              onClick={() => handleFavourite(value)}
            />
          ) : (
            <FaRegStar
              className="star"
              onClick={() => handleFavourite(value)}
            />
          )}
          <CiShare1 className="shareIcon" onClick={handleShare} />
        </li>
        {share && (
          <div className="popBox">
            <Popup handleShare={handleShare} onChildValue={onChildValue} value={value} />
          </div>
        )}
      </>
    );
  }

  const { orderedCat } = useContext(StoryContext);

  return (
    <div className="popular">
      {JSON.parse(localStorage.getItem("starredItem"))?.length ? (
        <h1>Favourite Topics</h1>
      ) : (
        <h1>What’s popular right now?</h1>
      )}
      <div className="list">
        {orderedCat ? (
          <ul className="list-items">
            {orderedCat.slice(0, 10).map((category, idx) => (
              <>
                <ListItem key={idx} value={category.name} />
              </>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
