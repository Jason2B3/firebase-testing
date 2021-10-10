function reformat(obj) {
  let arr = [];
  for (let k in obj) arr.push(obj[k]);
  return arr;
}

export const firebaseGET = async function (firebaseLink) {
  const pullData = await fetch(firebaseLink);
  if (!pullData.ok) throw new Error("No shows found in the search results");
  const parsedData = await pullData.json();
  return reformat(parsedData);
};

export const firebasePOST = async function (firebaseLink, inp) {
  const postData = await fetch(firebaseLink, {
    method: "POST",
    body: JSON.stringify(inp), // the data we're storing
    headers: { "Content-Type": "application/json" },
  });
  if (!postData.ok) throw new Error("Sending cart data failed");
  return null;
};
