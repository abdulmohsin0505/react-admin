import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../Redux/Actions/categoryAction";
import { Error, Loading } from "../../Components";
import { useNavigateSearch } from "../../Hooks/useNavigateSearch";

function AllCaregories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const navigateSearch = useNavigateSearch();

  const categoryProductHandler = (category) => {
    navigate(`/categories/products/${category}`);
  };

  const categoryDetailHandler = (id) => {
    navigate(`/categories/${id}`);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (error) return <Error error={error} />;

  return loading ? (
    <Loading />
  ) : (
    // <div>
    <div className="cards">
      {categories.map((category) => {
        return (
          <div key={category.id} className="card">
            <div className="card_img_div">
              <img
                className="card_img"
                src={category.image}
                alt={category.name}
                loading="lazy"
              />
            </div>
            <p style={{ fontSize: "18px", marginTop: "10px" }}>
              {category.name}
            </p>
            <div className="cards_btns">
              <button
                className="product_btn"
                onClick={() => categoryProductHandler(category.name)}
              >
                Products
              </button>
              <button
                className="edit_btn"
                onClick={() => categoryDetailHandler(category.id)}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
    // </div>
  );
}

export default AllCaregories;
