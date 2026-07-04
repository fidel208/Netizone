import React from "react";
import "./clients.css";

function OnlineClients() {
  const OnlineUsers = () => {
    const onlineUsers = [
      {
        username: "ACC00001",
        number: "0789455874",
        created: "Bazu 2hrs",
        plan: "Bazu 2hrs",
        mac: "122.6.7.1",
        router: "Jeza",
        usage: "2.3kb",
      },
      {
        username: "ACC00002",
        number: "0789455874",
        created: "Bazu 2hrs",
        plan: "Bazu 2hrs",
        mac: "122.6.7.1",
        router: "Jeza",
        usage: "2.3kb",
      },
      {
        username: "ACC00003",
        number: "0789455874",
        created: "Bazu 2hrs",
        plan: "Bazu 2hrs",
        mac: "122.6.7.1",
        router: "Jeza",
        usage: "2.3kb",
      },
      {
        username: "ACC00004",
        number: "0789455874",
        created: "Bazu 2hrs",
        plan: "Bazu 2hrs",
        mac: "122.6.7.1",
        router: "Jeza",
        usage: "2.3kb",
      },
      {
        username: "ACC00005",
        number: "0789455874",
        created: "Bazu 2hrs",
        plan: "Bazu 2hrs",
        mac: "122.6.7.1",
        router: "Jeza",
        usage: "2.3kb",
      },
      {
        username: "ACC00006",
        number: "0789455874",
        created: "Bazu 2hrs",
        plan: "Bazu 2hrs",
        mac: "122.6.7.1",
        router: "Jeza",
        usage: "2.3kb",
      },
    ];
    return (
      <table id="online-clients-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Phone Number</th>
            <th>Created</th>
            <th>Plan</th>
            <th>Mac Address</th>
            <th>Router</th>
            <th>Data usage</th>
          </tr>
        </thead>
        <tbody>
          {onlineUsers.map((onlineUser) => (
            <tr key={onlineUser.username}>
              <td>{onlineUser.username}</td>
              <td>{onlineUser.number}</td>
              <td>{onlineUser.created}</td>
              <td>{onlineUser.plan}</td>
              <td>
                <code>{onlineUser.mac}</code>
              </td>
              <td>{onlineUser.router}</td>
              <td>{onlineUser.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <>
      <div className="online-clients">
        <span id="online-clients-top">
          <p>Online Clients</p>
          <button>
            Export <i className="fa-solid fa-download"></i>
          </button>
        </span>
        <span className="online-clients-table">
          <OnlineUsers />
        </span>
      </div>
    </>
  );
}

export default OnlineClients;
