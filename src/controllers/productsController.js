const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(element => element.id == req.params.id);
		res.render('detail', {product});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let newProduct = {
			"id": products[products.length -1].id + 1,
			"name": req.body.name,
			"price": req.body.price,
			"discount": req.body.discount,
			"category": req.body.category,
			"description": req.body.description
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ''));
		res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(element => element.id == req.params.id);
		res.render('product-edit-form', {product});
	},
	// Update - Method to update
	update: (req, res) => {
		let productToUpdate = products.find(element => element.id == req.params.id);
		let newProduct = {
			"id": productToUpdate.id,
			"name": req.body.name,
			"price": req.body.price,
			"discount": req.body.discount,
			"category": req.body.category,
			"description": req.body.description,
		};

		let ProductsUpdated = products.map(element => {
			if (element.id == productToUpdate.id) {
				return element = newProduct;
			} else {
				return element;
			}
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(ProductsUpdated, null, ''));
		res.redirect('/');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let idToDelete = req.params.id;
		let productDelete = products.filter( element => element.id != idToDelete);
		fs.writeFileSync(productsFilePath, JSON.stringify(productDelete, null, ''));
		res.redirect('/');
	}
};

module.exports = controller;