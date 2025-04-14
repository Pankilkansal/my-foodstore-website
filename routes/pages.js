const express = require("express");
const Product = require("../models/Product");  // Import the Product model
const router = express.Router();

// Route to display all products from the database
router.get("/product", async (req, res) => {
    try {
        const products = await Product.find(); // Get all products from MongoDB
        res.render("product", { title: "Products", products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
});

// Add a new product to the database
router.post("/product/add", async (req, res) => {
    const { name, image, description, price } = req.body;  // Capture data from form

    // Validate the input fields to ensure they aren't empty
    if (!name || !image || !description || !price) {
        return res.status(400).send("All fields are required.");
    }

    const newProduct = new Product({
        name,
        image,
        description,
        price,
    });

    try {
        await newProduct.save(); // Save the new product in MongoDB
        res.redirect("/product"); // Redirect to the products page
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Error adding product");
    }
});


router.post("/product/:id/delete", async (req, res) => {
    const { id } = req.params; // Get the product ID from the URL
    console.log(`Attempting to delete product with ID: ${id}`); // Log for debugging

    try {
        const deletedProduct = await Product.findByIdAndDelete(id); // Delete the product from MongoDB

        if (!deletedProduct) {
            console.log("Product not found for deletion.");
            return res.status(404).send("Product not found");
        }

        console.log("Product deleted successfully:", deletedProduct);
        res.redirect("/product"); // Redirect to the products page after deletion
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Error deleting product");
    }
});




// Get the specific product to edit
router.get("/product/edit/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id); // Find product by ID
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render("edit", { title: "Edit Product", product });
    } catch (error) {
        console.error("Error fetching product to edit:", error);
        res.status(500).send("Error fetching product for edit");
    }
});

// Update the product in the database
router.post("/product/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { name, image, description, price } = req.body;  // Get updated data from the form

    // Validate the input fields
    if (!name || !image || !description || !price) {
        return res.status(400).send("All fields are required.");
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id, // Find product by ID
            { name, image, description, price }, // Update product details
            { new: true } // Return the updated document
        );
        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }
        res.redirect("/product"); // Redirect to the products page after update
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Error updating product");
    }
});


// Routes for other pages
router.get("/", (req, res) => res.render("home", { title: "Home" }));
router.get("/about", (req, res) => res.render("about", { title: "About Us" }));
router.get("/contact", (req, res) => res.render("contact", { title: "Contact" }));
router.get("/blog", (req, res) => res.render("blog", { title: "Blog" }));
router.get("/shop", (req, res) => res.render("shop", { title: "Shop or Gallery" })); // Updated route
router.get("/subscribe", (req, res) => res.render("subscribe", { title: "Subscribe" }));
router.get("/services", (req, res) => res.render("services", { assetsPath: 'public', title: "Services" }));
module.exports = router;
