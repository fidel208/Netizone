import React, { useState } from "react";
import "./network.css";

function IpPool() {
  const [poolOpen, setPoolOpen] = useState(false);
  return (
    <>
      <div className="ip-pool">
        <p>IP Pool</p>
        <div className="pool-search">
          <span id="pool-search-div">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <span>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  name="hotspot-search"
                  id="hotspot-search"
                  placeholder="Search by name"
                />
                <button>Search</button>
              </span>
            </form>
          </span>
          <button onClick={() => setPoolOpen(true)}>
            <i class="fa-solid fa-plus"></i> New Pool
          </button>
        </div>
        <div className="pool-table">
          <table id="pool-table">
            <thead>
              <tr>
                <th>Pool Name</th>
                <th>Range IP</th>
                <th>Routers</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <span className="manage-btns">
                    <button id="pool-edit">Edit</button>
                    <button id="pool-delete">Delete</button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {poolOpen && (
          <div className="modal-overlay" onClick={() => setPoolOpen(false)}>
            <div className="pool-overlay" onClick={(e) => e.stopPropagation()}>
              <div className="add-pool-top">
                <p>Add a pool</p>
                <button onClick={() => setPoolOpen(false)}>
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
              <form>
                <div className="add-pool-div">
                  <label htmlFor="pool-name">Pool Name</label>
                  <input type="text" name="pool-name" id="pool-name" />
                </div>
                <div className="add-pool-div">
                  <label htmlFor="range-ip">Range IP</label>
                  <input type="text" name="range-ip" id="range-ip" />
                </div>
                <div className="add-pool-div">
                  <label htmlFor="pool-routers">Routers</label>
                  <input type="text" name="pool-routers" id="pool-routers" />
                </div>
                <div className="pool-btns">
                  <button id="pool-save">Save</button>
                  <button id="pool-cancel" onClick={() => setPoolOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default IpPool;
