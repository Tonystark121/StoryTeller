import React, { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import styles from "./popup.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCopy } from "react-icons/io5";
import {useNavigate, useLocation} from 'react-router-dom'

function Popup({handleShare, value, onChildValue}) {
  const [isCopied, setIsCopied] = useState(false);
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link Copied!");
    setIsCopied(true);
  };
//   console.log(value)
  const handlePath = () => {
    //  console.log(location.pathname)
     const path = location.pathname.slice(1)
     navigate(`/${value}`)
     onChildValue(value)
     handleShare()
  }

  useEffect(() => {
    setUrl(`http://localhost:5173/${value}`);
  }, []);

  return (
    <>
      <div className={styles.popup}>
        <div className={styles.link}>
          <p onClick={handlePath}>{url}</p>
        </div>
        {isCopied ? (
          <IoCopy className={styles.copy} onClick={handleCopy} />
        ) : (
          <MdOutlineContentCopy className={styles.copy} onClick={handleCopy} />
        )}
        <RxCross2 className={styles.cut} onClick={handleShare} />
        <ToastContainer />
      </div>
    </>
  );
}

export default Popup;
