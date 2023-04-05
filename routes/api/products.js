const router = require('express').Router();

const Product = require('../../models/product.model')

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products);
    } catch (err) {
        res.json({ fallo: err.message });
    }
});

router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const products = await Product.findById(productId);
        res.json(products);
    } catch (error) {
        res.json({ fallo: error.message });
    }
});

router.get('/department/:department', async (req, res) => {
    const { department } = req.params;
    try {
        const products = await Product.find({
            department: department //el primero es el nombre del campito, la constante es el segundo department
        })
        res.json(products)
    } catch (err) {
        res.json({ fallo: err.message })
    }
})

router.get('/price/:minPrice', async (req, res) => {
    const { minPrice } = req.params;
    try {
        //si tengo que encontrar algo en BD mongoDB-> con find
        const products = await Product.find({
            price: { $gte: minPrice }, // $gt, $gte, $lt, $lte, $eq, $neq, $in, $nin
            //si ponemos 50 -> este precio es fijo, con esto saldran los productos que exactamente tengan un precio de 50 
            available: true
        });
        res.json(products);
    } catch (err) {
        res.json({ fallo: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (err) {
        res.json({ fallo: err.message })
    }
});

router.put('/stock', async (req, res) => {
    try {
        const result = await Product.updateMany(
            {
                available: true,
                stock: { $lte: 10 } //precio menor que 10
                //con esto recupero los elementos
            },
            { available: false } //aquí metemos los cambios que queremos realizar
        );
        res.json(result);
    } catch (err) {
        res.json({ fallo: err.message })
    }
})

router.put('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const updatedProduct = Product.findByIdAndUpdate(productId, req.body, { new: true }); // no podemos poner req.body porque findByIdAndUpdate trabaja de una manera determina y para q se muestre el nuevo producto hay q poner new: true
        res.json(updatedProduct);
    } catch (error) {
        res.json({ fallo: error.message });
    }
});

router.delete('/productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const productDeleted = await Product.findByIdAndDelete(productId);
        res.json(productDeleted);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});




module.exports = router;