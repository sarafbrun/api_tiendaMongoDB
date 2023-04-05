const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/user.model');
const { createToken } = require('../../helpers/utils');
const { checkToken } = require('../../helpers/middlewares');

router.get('/buy/:productId', checkToken, async (req, res) => {
    const { productId } = req.params;
    //la unica forma de obtener el id del usuario es si paso el filtro del checkToken
    //podemos poner el checkToken para la funcion manejadora concreta, para hacer la compra necesitamos estar logados, por eso ponemos el checkToken
    //console.log(productId, req.user._id);
    req.user.cart.push(productId);
    await req.user.save(); //Esto hace q se guarde en la base de datos

    res.json({ success: 'Producto agregado' })
})

router.get('/cart', checkToken, (req, res) => {
    //si le obligo a pasar por el checkToken, dentro del metodo tengo los datos del usuario logado
    res.json(req.user.cart);
    //cojo el carrito, y como paso a traves del checkToken, tengo los id de los objetos comprados en user.cart
});


router.post('/register', async (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 8);

    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.json({ fallo: err.message });
    }
});

router.post('/login', async (req, res) => {
    // Comprobamos si el email existe en la BD
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.json({ fatal: 'Error en usuario y/o contraseña' });
    }

    const iguales = bcrypt.compareSync(req.body.password, user.password);
    if (!iguales) {
        return res.json({ fatal: 'Error en usuario y/o contraseña' });
    }

    res.json({
        success: 'Login correcto!',
        token: createToken(user)
    });
});






module.exports = router;