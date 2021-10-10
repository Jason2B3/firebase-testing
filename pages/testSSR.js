import React, { useState, useEffect, useRef } from "react";

export async function getServerSideProps(context) {
  return {
    // feed your new array as the comp ƒ() props
    props: { display: ["fauna", "materialUI"] },
  };
}

export default function testSSR({ display }) {
  const inputRef = useRef();
  const [list, setList] = useState(display);
  const postHandler = function (e) {
    e.preventDefault();
    setList((prev) => [...prev, inputRef.current.value]);
  };
  return (
    <>
      <div>
        {list.map((ent, index) => {
          return <p key={index}>{ent}</p>;
        })}
      </div>
      <div>
        <button onClick={postHandler}>Add to list</button>
        <input ref={inputRef} placeholder="Will be added to list"></input>
      </div>
    </>
  );
}
