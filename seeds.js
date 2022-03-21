const Product = require('./models/product')
// connecting to mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("Mongo Connection Successful");
    })
    .catch(err => {
        console.log("oh noo Mongo error");
        console.log(err);
    })



// const createDocument = async()=>{
//     try{
//         const p = new Product({
//             name : 'Ruby Grapefruit',
//             price : 1.99,
//             category : 'fruit'
//         });
//         const result = await p.save();
//         console.log(result);
//     }
//     catch(e){
//         console.log(e);
//     }
// }

// createDocument();

const createDocument = async () => {
    try {
        const p1 = new Product(
            {
                name: 'Fairy Eggplant',
                price: 1.99,
                category: 'vegetable'
            });
        const p2 = new Product(
            {
                name: 'Organic Goddess Melon',
                price: 4.99,
                category: 'fruit'
            });
        const p3 = new Product(
            {
                name: 'Organic Mini Seedless Watermelon',
                price: 3.99,
                category: 'fruit'
            });
        const p4 = new Product(
            {
                name: 'Organic Celery',
                price: 1.50,
                category: 'vegetable'
            });
        const p5 = new Product(
            {
                name: 'Chocolate Whole Milk',
                price: 2.69,
                category: 'dairy'
            });




        const result = await Product.insertMany([p1 , p2 , p3 , p4 , p5]);
        console.log(result);
    }
    catch (e) {
        console.log(e);
    }
}

createDocument();