import React, { useEffect, useRef, useState } from "react";
import { firebaseGET, firebasePOST } from "../helpers/requests";
import classes from "./index.module.css";

export async function getStaticProps(context) {
  const firebaseLink =
    "https://auth-learn-ca7ef-default-rtdb.firebaseio.com/test.json";
  const pullData = await fetch(firebaseLink);
  const parsedData = await pullData.json();
  let show404 = false;
  if (!parsedData) show404 = true;

  // Reorganize the object data Firebase returns and place it in an array
  function reformat(obj) {
    let arr = [];
    for (let k in obj) arr.push(obj[k]);
    return arr;
  }
  const arrayVersion = reformat(parsedData);
  return {
    // feed your new array as the comp ƒ() props
    props: { display: arrayVersion },
    notFound: show404,
    // no need for revalidate since SSR will fire again after each new request
  };
}

export default function index({ display }) {
  // Load the data from firebase (has been reformatted into an array)
  const [list, setList] = useState(display);
  const inputRef = useRef();
  const firebaseLink =
    "https://auth-learn-ca7ef-default-rtdb.firebaseio.com/test.json";

  // Send data to Firebase backend
  function postHandler(e) {
    // e.preventDefault();
    firebasePOST(firebaseLink, inputRef.current.value);
    //! Find a way to update the rendered list
    setList((prevState) => {
      prevState.push(inputRef.current.value);
      return prevState;
    });
    inputRef.current.value = "";
  }

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
