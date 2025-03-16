const express = require("express");
const router = express.Router();

const products = [
    { name: "Summer Salad", image: "/images/plate-1.png" },
    { name: "Russian Salad", image: "/images/plate-2.png" },
    { name: "Greek Salad", image: "/images/plate-3.png" },
    { name: "Cottage Pie", image: "/images/plate-4.png" }
];

router.get("/product", (req, res) => {
    res.render("product", { title: "Products", products });
});


router.get("/", (req, res) => res.render("home", { title: "Home" }));
router.get("/about", (req, res) => res.render("about", { title: "About Us" }));
router.get("/contact", (req, res) => res.render("contact", { title: "Contact" }));
router.get("/blog", (req, res) => res.render("blog", { title: "Blog" }));
router.get("/shop", (req, res) => res.render("shop", { title: "Shop" }));
router.get("/subscribe", (req, res) => res.render("subscribe", { title: "Subscribe" }));
router.get("/shop", (req, res) => res.render("shop", { title: "Gallery" }));
router.get('/services', (req, res) => {
    res.render('services', { assetsPath: 'public', title: "Services" }); 
});


module.exports = router;
