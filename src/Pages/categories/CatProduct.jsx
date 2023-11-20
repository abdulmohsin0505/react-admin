import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../Components";
import { getProductsByCategory } from "../../Redux/Actions/categoryAction";
import "./category.css";

function CatProduct() {
  const { catProducts, loading, error } = useSelector(
    (state) => state.catProducts
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useParams();

  const navigateToUpdate = (id) => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    dispatch(getProductsByCategory(category));
  }, [dispatch, category]);

  if (loading) return <Loading />;

  if (catProducts.length === 0) return <section>No Products Available</section>;
  if (error) return <section>{error}</section>;
  return (
    <section className="category_products">
      <div className="category_heading">{category.toLocaleUpperCase()}</div>
      <div className="cards">
        {catProducts.map((products) => {
          return (
            <div
              key={products.id}
              className="card"
              onClick={() => navigateToUpdate(products.id)}
            >
              <div className="card_img_div">
                <img
                  className="card_img"
                  src={products.image_url}
                  alt={products.title}
                />
              </div>
              <div className="card_body">
                <h4 style={{ margin: "10px 0" }}>{products.title}</h4>
                <p>Price - {products.price} $</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CatProduct;
