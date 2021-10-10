import React, { useEffect, useRef, useState } from "react";
import { firebaseGET, firebasePOST, reformat } from "../helpers/requests";
import classes from "./index.module.css";

export async function getServerSideProps(context) {
  const firebaseLink =
    "https://auth-learn-ca7ef-default-rtdb.firebaseio.com/test.json";

  const pullData = await fetch(firebaseLink);
  const parsedData = await pullData.json();
  const arrayVersion = reformat(parsedData); // obj → array

  return {
    props: { display: arrayVersion },
  };
}

export default function index({ display }) {
  // Load the data from firebase (has been reformatted into an array)
  const [list, setList] = useState(display);
  const inputRef = useRef();
  const firebaseLink =
    "https://auth-learn-ca7ef-default-rtdb.firebaseio.com/test.json";

  // Send data to Firebase backend, and update the list browser-side as well
  function postHandler(e) {
    e.preventDefault();
    firebasePOST(firebaseLink, inputRef.current.value);
    setList((prev) => [...prev, inputRef.current.value]);
    // inputRef.current.value="" // causes a bug where list items get rendered blank
  }

  // Give people a chance to send data up if your list is empty
  if (!list) {
    return (
      <div>
        <button onClick={postHandler}>POST on backend</button>
        <input ref={inputRef} placeholder="Will be sent to Firebase..."></input>
      </div>
    );
  }
  // If we do have data in our backend, render the following
  return (
    <section className={classes.section}>
      <h1>Current data on the backend:</h1>
      <ul>
        {list.map((ent, index) => {
          return <li key={index}>{ent}</li>;
        })}
      </ul>
      <div>
        <button onClick={postHandler}>POST on backend</button>
        <input ref={inputRef} placeholder="Will be sent to Firebase..."></input>
      </div>
    </section>
  );
}
