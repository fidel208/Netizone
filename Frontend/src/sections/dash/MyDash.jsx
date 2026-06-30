import React from "react";
import "./dash.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UserTable = () => {
  const users = [
    {
      id: 1,
      phone: "0789455874",
      createdAt: "11:00",
      plan: "Bazu 2hrs",
      router: "Jeza",
    },
    {
      id: 2,
      phone: "0789455874",
      createdAt: "11:00",
      plan: "Bazu 2hrs",
      router: "Jeza",
    },
    {
      id: 3,
      phone: "0789455874",
      createdAt: "11:00",
      plan: "Bazu 2hrs",
      router: "Jeza",
    },
    {
      id: 4,
      phone: "0789455874",
      createdAt: "11:00",
      plan: "Bazu 2hrs",
      router: "Jeza",
    },
    {
      id: 5,
      phone: "0789455874",
      createdAt: "11:00",
      plan: "Bazu 2hrs",
      router: "Jeza",
    },
    {
      id: 6,
      phone: "0789455874",
      createdAt: "11:00",
      plan: "Bazu 2hrs",
      router: "Jeza",
    },
  ];
  return (
    <table id="day-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Phone No.</th>
          <th>Created At</th>
          <th>Plan</th>
          <th>Router</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.phone}</td>
            <td>{user.createdAt}</td>
            <td>{user.plan}</td>
            <td>{user.router}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function MyDash() {
  const data = [
    { name: "Jan", amount: 2000 },
    { name: "Feb", amount: 3000 },
    { name: "Mar", amount: 2500 },
    { name: "Apr", amount: 5000 },
    { name: "May", amount: 4000 },
    { name: "Jun", amount: 3000 },
    { name: "Jul", amount: 6000 },
    { name: "Aug", amount: 5500 },
    { name: "Sep", amount: 7000 },
    { name: "Oct", amount: 6000 },
    { name: "Nov", amount: 5000 },
    { name: "Dec", amount: 8000 },
  ];
  return (
    <>
      <div className="my-dashboard">
        <div className="my-dash-top">
          <div className="sales">
            <span id="sales-today">
              <h4>Your sales today</h4>
              <p id="day-amount">
                <sup>Kes. </sup>500
              </p>
            </span>
            <span id="month-sales">
              <i class="fa-solid fa-chart-line"></i>
              <span>
                <p id="month-amount">
                  <sup>Kes. </sup>12000
                </p>
                <h4>Monthly sales</h4>
              </span>
            </span>
          </div>
          <div className="dash-users">
            <span>
              <span id="small-dash-box">
                <p id="small-number">5</p>
                <i class="fa-solid fa-user"></i>
              </span>
              <p id="desc-words">Online Users</p>
              <hr />
            </span>
            <span>
              <span id="small-dash-box">
                <p id="small-number">500</p>
                <i class="fa-solid fa-users"></i>
              </span>
              <p id="desc-words">Total Users</p>
              <hr />
            </span>
          </div>
          <div className="data-usage">
            <span>
              <span id="small-dash-box">
                <p id="small-number">13</p>
                <i class="fa-solid fa-user-check"></i>
              </span>
              <p>Active accounts</p>
              <hr />
            </span>
            <span>
              <span id="small-dash-box">
                <p id="small-number">5GB</p>
                <i class="fa-solid fa-signal"></i>
              </span>
              <p>Data usage</p>
              <hr />
            </span>
          </div>
        </div>
        <div className="my-dash-bottom">
          <div className="graph">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 30, left: 0 }}>
                <XAxis dataKey="name" />
                <YAxis dataKey="amount" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#121416",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                />
                <Legend iconType="circle" />
                <Bar
                  dataKey="amount"
                  name="Amount"
                  fill="rgb(8, 172, 123)"
                  opacity="0.7"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="day-users">
            <p>Day Users</p>
            <div className="table-wrapper">
              <UserTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyDash;
