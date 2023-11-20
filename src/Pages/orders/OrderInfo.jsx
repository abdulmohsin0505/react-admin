import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "./formatDate";
import OrderItems from "./OrderItems";
import OrderTotal from "./OrderTotal";
import { deleteOrder, updateOrder } from "../../Redux/Actions/orderAction";
import "./order.css";
import { useNavigate } from "react-router-dom";

function OrderInfo({ order }) {
  const { created_at, id, shipping_address, status } = order;

  const [orderSatus, setOrderStatus] = useState(status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updatedOrder = useSelector((state) => state.updatedOrder);
  const deletedOrder = useSelector((state) => state.deletedOrder);

  const updateOrderDetail = (order) => {
    dispatch(
      updateOrder(
        {
          ...order,
          status: orderSatus,
          updated_at: new Date().toJSON(),
        },
        id
      )
    );
    navigate(-1);
  };

  const deleteOrderDetail = (id) => {
    dispatch(deleteOrder(id));
    navigate(-1);
  };
  return (
    <div>
      <div>
        <div className="order_info">
          <div>
            <div className="order-subheading">order</div>
            <p>{formatDate(created_at)}</p>
            <p>Order Id : {id}</p>
          </div>
          <div>
            <div className="order-subheading">customer</div>
            <p>name : admin</p>
            <p>email : admin@gmail.com</p>
          </div>
          <div>
            <div className="order-subheading">shipping address</div>
            <p>
              {shipping_address?.street}, {shipping_address?.city}
            </p>
            <p>
              {shipping_address?.state}, {shipping_address?.zip}
            </p>
          </div>
          <div style={{ justifySelf: "flex-start" }}>
            <div className="order-subheading">Status</div>
            <select
              value={orderSatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="cancelled">cancelled</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
        <OrderItems items={order.items} />
        <OrderTotal order={order} />
        <div className="order_btns">
          <button onClick={() => updateOrderDetail(order)}>
            {updatedOrder.loading ? "Updating" : "Update"}
          </button>
          <button
            onClick={() => deleteOrderDetail(order.id)}
            className="order_delete_btn"
          >
            {deletedOrder.loading ? "Deleting" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;
