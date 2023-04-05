const request = require('supertest');
const app = require('../../app')
const mongoose = require('mongoose');


const Producto = require('../../models/product.model')


describe('Api de products', () => {

    beforeAll(async () => {
        //me conecto a la BD
        await mongoose.connect('mongodb://127.0.01/tienda_online');
    })


    afterAll(async () => {
        //me desconecto de la BD
        await mongoose.disconnect()
    })


    describe('Pruebas de GET /api/products', () => {
        let response;
        beforeAll(async () => {
            response = await request(app).get('/api/products').send();//ponemos la app q quiero probar
        });

        test('deberia funcionar la peticion', async () => {
            expect(response.statusCode).toBe(200);
        });

        test('deberia responder con un JSON', async () => {
            expect(response.headers['content-type']).toContain('application/json');
        });

        test('deberia responder con un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });

    });

    describe('Pruebas de POST /api/products', () => {
        let response;
        const body = { name: 'Test', description: 'This is for test', price: 21, department: 'test', available: true, stock: 21 };

        beforeAll(async () => {
            response = await request(app).post('api/products').send(body);
        });

        afterAll(async () => {
            await Producto.deleteMany({ department: 'test' });
            //de esta manera borro todos los tests q haya hecho usando los test y no ensucio mi BD
        });

        test('la url deberia funcionar', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        //la respuesta debe incluir el campo _id
        test('la respuesta debería devolver el campo _id', () => {
            expect(response.statusCode).toBe(200);
            expect(response.body._id).toBeDefined();
        });

        test('la respuesta debería tener los mismos valores que el objeto que inserto', () => {
            expect(response.body.name).toBe(body.name);
        });

    });

    describe('Pruebas PUT /api/products', () => {
        let response;
        let newProduct;
        const body = { name: 'Test', description: 'This is for test', price: 21, department: 'test', available: true, stock: 21 };

        beforeAll(async () => {
            //Creo un nuevo producto especifico para las pruebas
            newProduct = await Producto.create(body);
            // Lanzo la petición
            response = await request(app)
                .put(`/api/products/${newProduct._id}`)
                .send({ name: 'Producto Nuevo', stock: 233 })//Aqui incluimos el producto modificado, modificamos los parametros que queramos

        });

        afterAll(async () => {
            await Producto.findByIdAndDelete(newProduct._id);
        });

        test('La url debe existir y debe devolver un JSON', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Deberiamos recibir el producto con los datos modificados', () => {
            expect(response.body.name).toBe('Producto Nuevo');
            expect(response.body.stock).toBe('233');
        })
    });

    describe('Pruebas de DELETE /api/products', () => {

        let response;
        let newProduct;
        const body = { name: 'Test', description: 'This is for test', price: 21, department: 'test', available: true, stock: 21 };

        beforeAll(async () => {
            newProduct = await Producto.create(body);
            response = await request(app)
                .delete(`/api/products/${newProduct._id}`)
                .send();//no le paso ningun body, lo paso sin parametros
        });

        test('debería existir la URL y nos devuelve un JSON', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('debería borrar el producto de la base de datos', async () => {
            const productFound = await Producto.findById(newProduct._id);
            expect(productFound).toBeNull();
            //quiero que al buscar ese producto en la base de datos sea nulo, sino es q no ha funcionado
        })

    });

});