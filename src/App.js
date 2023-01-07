import logo from "./logo.svg";
import LsUsers from "./components/LsUsers";
import React, { useEffect } from "react";

async function getData(totalUsers) {
  const data = await fetch(
    `https://reqres.in/api/users?per_page=${totalUsers}`,
    { mode: "cors" }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
}
async function getTotalUsers() {
  const data = await fetch(`https://reqres.in/api/users`, { mode: "cors" })
    .then((res) => res.json())
    .then((data) => {
      return data.total;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
}
function App() {
  const [data, setData] = React.useState(null);

  useEffect(() => {
    getTotalUsers().then((totalUsers) => {
      getData(totalUsers).then((data) => {
        setData(data);
      });
    });
  }, []);

  return <>{data && <LsUsers allUsersData={data} />}</>;
}

export default App;
