const express = require("express");
const product = require("./db/product");
const User = require("./db/user");
const Jwt = require("jsonwebtoken")
require("dotenv").config()

const router = express.Router()


router.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject()
    delete result.password
    Jwt.sign({ result }, process.env.jwtkey, { expiresIn: "5d" }, (err, token) => {
        if (err) {
            res.send("something went wrong")
        }
        res.send({ result, auth: token })
    })
})

router.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, process.env.jwtkey, { expiresIn: "5d" }, (err, token) => {
                if (err) {
                    res.send("somethng went wrong")
                }
                res.send({ user, auth: token })
            })

        } else {
            res.send({ result: "No user found" })
        }
    }
})

router.post("/add-product", async (req, res) => {
    let product = new product(req.body);
    let result = await product.save();
    res.send(result);
})

router.get("/products", async (req, res) => {
    const products = await Product.find();
    if (product.length > 0) {
        res.send(products)
    }
    else {
        res.send({ result: "No product found" })
    }
});

router.delete("/product/:id", async (req, res) => {
    res.send(result)
});

router.get("/produc/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    }
    else {
        res.send({ "result": "no recors found" })
    }
});


router.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body })
    res.send(result)
});


module.exports = router



