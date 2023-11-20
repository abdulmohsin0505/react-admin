import React, { useEffect, useState } from "react";
import {
  getUserById,
  updateUser,
  deleteUser,
} from "../../Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./user.css";

const initialValue = {
  name: "",
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

function SingleUser() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user: userData, loading, error } = useSelector((state) => state.user);
  const deletedUser = useSelector((state) => state.deletedUser);
  const updatedUser = useSelector((state) => state.updatedUser);
  const navigate = useNavigate();
  const [user, setUser] = useState(userData);
  console.log("user", user);

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, userId]);

  const handleUserInfo = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUserAddress = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [name]: value,
      },
    }));
  };

  const updateUserData = (e) => {
    e.preventDefault();
    dispatch(
      updateUser(
        {
          ...user,
          created_at: user.created_at,
          updated_at: new Date().toJSON(),
        },
        userId
      )
    );

    navigate(-1);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(userId));
    navigate(-1);
  };

  return (
    <section>
      {loading && <h4>...loading</h4>}
      {!loading && error && <h4>{error}</h4>}
      {!loading && user ? (
        <form onSubmit={updateUserData} className="user-form">
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
                value={user?.username}
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
                value={user?.email}
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
                value={user?.phone}
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
                value={user?.address?.street}
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
                  value={user?.address?.city}
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
                  value={user?.address?.state}
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
                  value={user?.address?.zip}
                  onChange={handleUserAddress}
                />
              </div>
            </div>
          </div>
          {/* <div>
            <h4>Password</h4>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={user?.password}
                onChange={handleUserInfo}
              />
            </div>
          </div> */}
          <div className="btn_container">
            <button type="submit" className="update_btn">
              {updatedUser.loading ? "Updating" : "Update user"}
            </button>
            <button onClick={handleDeleteUser} className="delete_btn">
              {deletedUser.loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}

export default SingleUser;
