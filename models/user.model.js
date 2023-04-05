const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    active: Boolean,
    cart: [{ type: Schema.Types.ObjectId, ref: 'product' }]
    //vamos a almacenar una relacion con otro modelo dentrod e cart, almacenaremos id de otros documentos de otra colección, con el campo ref se relacionen diferentes colecciones
}, {
    timestamps: true
});

module.exports = model('user', userSchema);