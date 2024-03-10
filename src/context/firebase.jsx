import React, { useState, useEffect } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { createContext } from "react";

const appSetting = {
  databaseURL:
    "https://bookify-4f078-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(appSetting);
export const database = getDatabase(app);
export const cat = ref(database, "Category");
export const StoryContext = createContext(null);

export const StoryContextProvider = ({ children }) => {
  const [orderedCat, setOrderedCat] = useState([]);
  
  const fetchData = () => {
    onValue(ref(database, "List"), function (snapshot) {
      if (snapshot.exists()) {
        // console.log(Object.keys(snapshot.val()))
        const categories = Object.keys(snapshot.val()).map((category) => ({
          name: category,
          count: Object.keys(snapshot.val()[category]).length,
        }));
        categories.sort((a, b) => b.count - a.count);
        // console.log(categories);
        setOrderedCat(categories);
      }
    });
  };
  
  useEffect(()=>{
    fetchData()
  },[])

  return <StoryContext.Provider value={{orderedCat}}>{children}</StoryContext.Provider>;
};
