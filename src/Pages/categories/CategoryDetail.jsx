import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCategory,
  getCategoryDetail,
  getProductsByCategory,
  updateCategory,
} from "../../Redux/Actions/categoryAction";
import CatProductList from "./CatProductList";
import "./category.css";

function CategoryDetail() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { category, loading } = useSelector((state) => state.category);
  const [cat, setCat] = useState({
    name: "",
    image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategoryDetail(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (category) {
      setCat({
        name: category.name,
        image: category.image,
      });
      dispatch(getProductsByCategory(category.name));
    }
  }, [category]);

  const categoryHandler = (e) => {
    setCat({ ...cat, [e.target.name]: e.target.value });
  };

  const updateCategoryDetail = (category, id) => {
    dispatch(updateCategory(category, id));
    navigate(-1);
  };

  const deleteCatgoryDetail = (id) => {
    dispatch(deleteCategory(id));
    navigate(-1);
  };

  return (
    <section>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              margin: "20px 0",
              flexWrap: "wrap",
            }}
          >
            <label htmlFor="catName">
              Category
              <input
                id="catName"
                name="name"
                value={cat?.name}
                onChange={categoryHandler}
                className="input_field"
              />
            </label>
            <label htmlFor="catImage">
              Category image
              <input
                id="catImage"
                name="image"
                value={cat?.image}
                onChange={categoryHandler}
                className="input_field"
              />
            </label>
          </div>
          <div>
            <h4>Products</h4>
            <CatProductList />
          </div>
          <div className="cards_btns">
            <button onClick={() => updateCategoryDetail(cat, category?.id)}>
              Save
            </button>
            <button
              onClick={() => deleteCatgoryDetail(category?.id)}
              className="delete_btn"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default CategoryDetail;
