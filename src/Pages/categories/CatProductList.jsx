import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CatProductList() {
  const dispatch = useDispatch();
  const { catProducts, loading } = useSelector((state) => state.catProducts);
  const navigate = useNavigate();

  const navigateToUpdate = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div>
      {loading && <h1>Loading...</h1>}

      {!loading && catProducts ? (
        <div className="categories_table_wrapper">
          <table>
            <thead>
              <tr>
                <td>ProductId</td>
                <td>Title</td>
                <td>Price</td>
                <td>Rating</td>
                <td>Stock</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {catProducts.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.rating}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button onClick={() => navigateToUpdate(product.id)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default CatProductList;
