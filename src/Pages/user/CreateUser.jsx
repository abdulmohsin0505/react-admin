import React from "react";
import { createUser } from "../../Redux/Actions/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./user.css";

const userData = {
  username: "",
  email: "",
  password: "",
  phone: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
};
function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(userData);

  const handleUserInfo = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserAddress = (e) => {
    setUser({
      ...user,
      address: { ...user.address, [e.target.name]: e.target.value },
    });
  };

  const saveUser = (e) => {
    e.preventDefault();
    const timeString = {
      created_at: new Date().toJSON(),
      Updated_at: new Date().toJSON(),
    };
    dispatch(createUser({ ...user, ...timeString }));
    navigate(-1);
  };

  const cancleCreatingUser = () => {
    setUser(userData);
    navigate(-1);
  };
  return (
    <section>
      <form onSubmit={saveUser} className="user-form">
        <div>
          <h4>User Information</h4>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              required
              type="text"
              id="username"
              placeholder="Username"
              name="username"
              value={user.username}
              onChange={handleUserInfo}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleUserInfo}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              required
              type="tel"
              id="phone"
              placeholder="Phone"
              name="phone"
              value={user.phone}
              onChange={handleUserInfo}
            />
          </div>
        </div>
        <div>
          <h4>Address</h4>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              required
              type="text"
              id="street"
              placeholder="Street Address"
              name="street"
              value={user.address.street}
              onChange={handleUserAddress}
            />
          </div>
          <div className="address-fields">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                required
                type="text"
                id="city"
                placeholder="City"
                name="city"
                value={user.address.city}
                onChange={handleUserAddress}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                required
                type="text"
                id="state"
                placeholder="State"
                name="state"
                value={user.address.state}
                onChange={handleUserAddress}
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip Code</label>
              <input
                required
                type="text"
                id="zip"
                placeholder="Zip Code"
                name="zip"
                value={user.address.zip}
                onChange={handleUserAddress}
              />
            </div>
          </div>
        </div>
        <div>
          <h4>Password</h4>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleUserInfo}
            />
          </div>
        </div>
        <div className="btn_container">
          <button type="submit" className="create_btn">
            Save
          </button>
          <button onClick={cancleCreatingUser} className="delete_btn">
            Cancle
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateUser;
