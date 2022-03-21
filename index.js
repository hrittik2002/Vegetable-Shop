const express = require('express');
const app = express();

const methodOverride = require('method-override');

// scema
const Product = require('./models/product.js')


// connecting to mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand')
.then(()=>{
    console.log("Mongo Connection Successful");
})
.catch(err =>{
    console.log("oh noo Mongo error");
    console.log(err);
})



// connecting to ejs
const path = require('path');
app.set('views', path.join(__dirname , '/views'))
app.set('views engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));


app.get('/products' , async (req , res)=>{
    const products = await Product.find({});
    console.log(products)
    res.render('products/index.ejs' , {products});
})




// Creating new products (Post request)
app.get('/products/new' , (req , res)=>{
    res.render('products/new.ejs')
})

app.post('/products' , async (req , res) => {
    const newProduct =  new Product(req.body)
    await newProduct.save();
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`)
})




// Reading existing product
app.get('/products/:id' , async (req , res) =>{
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/show.ejs' , { product })
})



// Upgreading the form (put request)
app.get('/products/:id/edit' , async (req , res)=>{
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit.ejs' , { product })
})

app.put('/products/:id' , async (req , res) =>{
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id , req.body , { runValidators : true, new : true});
    res.redirect(`/products/${product._id}`)
})



// Deleting a product
app.delete('/products/:id' , async (req , res) =>{
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products');
})

app.listen(3000 , ()=>{
    console.log("I AM HRITTIK")
})
