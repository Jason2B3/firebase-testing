import React, { useState, useRef } from "react";
import { firebaseGET, firebasePOST, firebasePOSTDIFF } from "../../helpers/requests";
import classes from "./http.module.css";

export default function http() {
  const firebaseLink =
    "https://auth-learn-ca7ef-default-rtdb.firebaseio.com/test.json";
  const inputRef = useRef();

  // firebaseGET();

  const postHandler = async function (e) {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    firebasePOSTDIFF(firebaseLink, inputValue);
    inputRef.current.value=""
  };

  return (
    <div className={classes.major}>
      <button type="submit" onClick={postHandler}>
        POST
      </button>
      <input ref={inputRef} placeholder="Send to Firebase..."></input>
    </div>
  );
}

function snapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
}
