import { createServer, Model } from "miragejs";
import usersData from "./assets/data/user.json";
import productsData from "./assets/data/product.json";
import ordersData from "./assets/data/order.json";
import categoriesData from "./assets/data/category.json";
import reviewsData from "./assets/data/review.json";

export default function server() {
  createServer({
    models: {
      user: Model,
      product: Model,
      order: Model,
      category: Model,
      review: Model,
    },
    routes() {
      this.namespace = "api";

      //*********************************************users***********************************************

      // get all users

      this.get("/users", (schema) => {
        return schema.users.all();
      });

      //   get user by id
      this.get("/users/:id", (schema, request) => {
        let id = request.params.id;

        return schema.users.find(id);
      });

      let newId = 20;
      //user signup
      this.post("/signup", (schema, request) => {
        let newUser = JSON.parse(request.requestBody);
        newUser.id = newId + 1;
        const user = schema.users.create(newUser);

        return {
          success: true,
          message: "Signup successful!",
          user,
        };
      });

      //user login
      this.post("/login", (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ username, password });

        if (user) {
          return {
            success: true,
            message: "Login successful!",
            user,
          };
        } else {
          return {
            success: false,
            message: "Invalid username or password.",
          };
        }
      });

      //delete user

      this.delete("/users/:id", (schema, request) => {
        const userId = request.params.id;
        const user = schema.users.find(userId);

        if (user) {
          user.destroy();
          return { message: "User deleted successfully.", success: true };
        } else {
          return { message: "Failed to delete user", success: false };
        }
      });

      //update user

      this.put("/users/:id", (schema, request) => {
        let newUser = JSON.parse(request.requestBody);
        const userId = request.params.id;
        const user = schema.users.find(userId);

        if (user) {
          user.update(newUser);
          return {
            message: "User updated successfully.",
            success: true,
            user: newUser,
          };
        } else {
          return { message: "Failed to updated user", success: false };
        }
      });

      //-------------------------------------------products--------------------------------------------

      //get all products

      this.get("/products", (schema) => {
        return schema.products.all();
      });

      //get product by id

      this.get("/products/:id", (schema, request) => {
        let id = request.params.id;

        return schema.products.find(id);
      });

      //create product
      this.post("/products", (schema, request) => {
        const newProduct = JSON.parse(request.requestBody);
        const product = schema.products.create(newProduct);

        if (product) {
          return {
            success: true,
            message: "successfuly created product!",
            product,
          };
        } else {
          return {
            success: false,
            message: "Failed to create product.",
          };
        }
      });

      //update product

      this.put("/products/:id", (schema, request) => {
        let newProduct = JSON.parse(request.requestBody);
        const id = request.params.id;
        const product = schema.products.find(id);

        if (product) {
          product.update(newProduct);
          return {
            message: "Product updated successfully.",
            success: true,
            product: newProduct,
          };
        } else {
          return { message: "Failed to updated product", success: false };
        }
      });

      //delete product

      this.delete("/products/:id", (schema, request) => {
        const productId = request.params.id;
        const product = schema.products.find(productId);

        if (product) {
          product.destroy();
          return { message: "product deleted successfully.", success: true };
        } else {
          return { message: "Failed to delete product", success: false };
        }
      });

      //-------------------------------------------orders--------------------------------------------

      //get all orders

      this.get("/orders", (schema) => {
        return schema.orders.all();
      });

      //get order by id
      this.get("/orders/:id", (schema, request) => {
        const id = request.params.id;
        return schema.orders.find(id);
      });

      //update order

      this.put("/orders/:id", (schema, request) => {
        let newOrder = JSON.parse(request.requestBody);
        const id = request.params.id;
        const order = schema.orders.find(id);

        if (order) {
          order.update(newOrder);
          return {
            message: "Order updated successfully.",
            success: true,
            order: newOrder,
          };
        } else {
          return { message: "Failed to updated order", success: false };
        }
      });

      //delete order

      this.delete("/orders/:id", (schema, request) => {
        const id = request.params.id;
        const order = schema.orders.find(id);

        if (order) {
          order.destroy();
          return { message: "User deleted successfully.", success: true };
        } else {
          return { message: "Failed to delete user", success: false };
        }
      });

      //-------------------------------------------categires--------------------------------------------

      //get all categories

      this.get("/categories", (schema) => {
        return schema.categories.all();
      });

      //get products by category

      this.get("/products", (schema, request) => {
        const { category } = request.queryParams;
        if (category) {
          return schema.products.where({ category });
        }
        return schema.products.all();
      });

      //get category by id

      this.get("/categories/:id", (schema, request) => {
        const id = request.params.id;
        return schema.categories.find(id);
      });

      //update category
      this.put("/categories/:id", (schema, request) => {
        let newCategory = JSON.parse(request.requestBody);
        const id = request.params.id;
        const category = schema.categories.find(id);

        if (category) {
          category.update(newCategory);
          return {
            message: "Category updated successfully",
            success: true,
            category,
          };
        } else {
          return { message: "Failed to updated category", success: false };
        }
      });

      //delete category

      this.delete("/categories/:id", (schema, request) => {
        const id = request.params.id;
        const category = schema.categories.find(id);

        if (category) {
          category.destroy();
          return {
            message: "Category deleted successfully.",
            success: true,
            category,
          };
        } else {
          return { message: "Failed to delete category", success: false };
        }
      });
      //-------------------------------------------reviews--------------------------------------------

      this.get("/reviews", (schema) => {
        return schema.reviews.all();
      });

      //get review by id
      this.get("/reviews/:id", (schema, request) => {
        const id = request.params.id;
        return schema.reviews.find(id);
      });

      //update review
      this.put("/reviews/:id", (schema, request) => {
        let newReview = JSON.parse(request.requestBody);
        const id = request.params.id;
        const review = schema.reviews.find(id);

        if (review) {
          review.update(newReview);
          return {
            message: "review updated successfully.",
            success: true,
            review,
          };
        } else {
          return { message: "Failed to updated review", success: false };
        }
      });

      //delete review

      this.delete("/reviews/:id", (schema, request) => {
        const id = request.params.id;
        const review = schema.reviews.find(id);

        if (review) {
          review.destroy();
          return {
            message: "Review deleted successfully.",
            success: true,
            review,
          };
        } else {
          return { message: "Failed to delete Review", success: false };
        }
      });
    },

    seeds(server) {
      server.db.loadData({
        users: usersData,
        products: productsData,
        orders: ordersData,
        categories: categoriesData,
        reviews: reviewsData,
      });
    },
  });
}
