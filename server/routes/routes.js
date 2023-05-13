import { Router } from "express";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/functions.js";

const myRouter = Router();

myRouter.get("/", (req, res) => { //Trae el index
	res.render("index", { loggedin: req.session.loggedin, username: req.session.user })
});

myRouter.get("/restaurants", async (req, res) => { //Trae todos los restaurants
	const resultado = await fetch("http://localhost:4000/api/v1/restaurants");
	const data = await resultado.json();
	res.render("restaurants", { "restaurants": data, loggedin: req.session.loggedin, username: req.session.user });
});

myRouter.get("/restaurant/:restaurantid/menu", async (req, res) => { //Trae el menu de un restaurant por id
	const resultado = await fetch(`http://localhost:4000/api/v1/restaurant/${req.params.restaurantid}/menu`);
	const data = await resultado.json();
	res.render("menu", { "menu": data, loggedin: req.session.loggedin, username: req.session.user });
});

myRouter.get("/employee", async (req, res) => { //Formulario de creacion de empleado
	const resultado = await fetch("http://localhost:4000/api/v1/restaurants");
	const data = await resultado.json();
	res.render("employee", { "restaurants": data, loggedin: req.session.loggedin, username: req.session.user })
})

myRouter.get("/login", (req, res) => {//Pagina de Login
	res.render("login");
});

myRouter.get("/inventory", async (req, res) => { //Inventario de un restaurant
	console.log(req.session.user);
	const resultado = await fetch(`http://localhost:4000/api/v1/restaurant/${req.session.user.restaurant_id}/menu`);
	const data = await resultado.json();
	res.render("inventory", { loggedin: req.session.loggedin, username: req.session.user, menu: data });
})

myRouter.get('/profile/:restaurantid', async (req, res) => { //Perfil de un restaurant, si el empleado pertenece al restaurant, este podra usar la funcionalidad de trabajador de restaurant, sino solo le aparecera la info del restaurant, y un cliente solo podra ver la info de un restaurant
	const resultado = await fetch(`http://localhost:4000/api/v1/restaurant/${req.params.restaurantid}`);
	const data = await resultado.json();
	console.log(req.session.loggedin);
	if (typeof req.session.loggedin != "undefined") {
		if (req.session.user.isemployee == true) {
			if (req.params.restaurantid == req.session.user.restaurant_id) {
				res.render("profile", { username: req.session.user, restaurant: req.session.restaurant, loggedin: req.session.loggedin, info: data[0], owner: true });
			} else {
				res.render("profile", { username: req.session.user, restaurant: req.session.restaurant, loggedin: req.session.loggedin, info: data[0], owner: false });
			}
		} else {
			res.render("profile", { username: req.session.user, restaurant: req.session.restaurant, loggedin: req.session.loggedin, info: data[0], owner: false });
		}
	} else {
		res.render("profile", { username: req.session.user, restaurant: req.session.restaurant, loggedin: req.session.loggedin, info: data[0], owner: false });
	}

});

myRouter.get('/register', (req, res) => {//Formulario de registro de cliente
	res.render("register");
});

myRouter.get('/starFood/:restaurantid', async (req, res) => { //Platillos ordenados por mayor ganancia
	const resultado = await fetch(`http://localhost:4000/api/v1/starFood/${req.params.restaurantid}`);
	const data = await resultado.json();
	console.log(data);
	res.render("starFood", { username: req.session.user, restaurant: req.session.restaurant, loggedin: req.session.loggedin, starFood: data })
})

myRouter.get("/checkout", async (req, res) => { //Pagina de checkout con el resumen
	res.render("checkout", { username: req.session.user, loggedin: req.session.loggedin });
})

myRouter.get("/orders/:restaurantid", async (req, res) => { //Ordenes de un restaurant
	const resultado = await fetch(`http://localhost:4000/api/v1/restaurant/${req.params.restaurantid}/orders`)
	const data = await resultado.json();
	console.log(data);
	res.render("activeOrders", { orders: data, username: req.session.user, loggedin: req.session.loggedin })
})

myRouter.post('/auth', async (req, res) => { //Verificacion de usuario
	let username = req.body.username;
	const resultado = await fetch(`http://localhost:4000/api/v1/user/${username}`)

	const data = await resultado.json();

	if (data.length == 0) { //Significa que el select no arrojo coincidencias
		console.log("No hay coincidencias");
		res.redirect("/login")
	} else if (data.length > 1) { //Significa que hay error en la BD por duplicado de usuario
		console.log("Error de duplicado de Usuario");
		res.redirect("/login")
	} else if (data.length == 1) { //Se encuentra usuario y se procede a comparar contraseña
		bcrypt.compare(req.body.userpassword, data[0].userpassword, async function (err, result) {
			if (err) {
				console.log(err);
			} else if (result) {
				if (data[0].isemployee == true) { //Si es empleado, el session guardara datos relacionados a un trabajador

					req.session.user = data[0];
					req.session.loggedin = true;

					const resultado2 = await fetch(`http://localhost:4000/api/v1/restaurant/${data[0].restaurant_id}`)
					const data2 = await resultado2.json();

					req.session.restaurant = data2[0];

					res.redirect(`/profile/${data[0].restaurant_id}`)
				} else { //Si es cliente, solo se le desplegara la info relacionada a un cliente
					// La contraseña es correcta
					req.session.loggedin = true;
					req.session.user = data[0];
					console.log("contraseña correcta");
					res.redirect("/")
				}
			} else { //Fallo en la comparacion de contraseña
				// La contraseña es incorrecta
				console.log('Contraseña incorrecta');
				res.redirect("/login")
			}
		});
	}
});

myRouter.post('/create', async (req, res) => { //Crea un usuario y un cliente

	let data = {
		username: req.body.username,
		userpassword: await hashPassword(req.body.password),
		clientname: req.body.name,
		clientphone: req.body.phone,
		clientemail: req.body.email
	}

	const resultado = await fetch("http://localhost:4000/api/v1/client", {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" }
	})
});

myRouter.post('/newRestaurant', async (req, res) => { //Crea un restaurant
	const resultado = await fetch("http://localhost:4000/api/v1/restaurant", {
		method: "POST",
		body: JSON.stringify(req.body),
		headers: { "Content-Type": "application/json" }
	})
})

myRouter.post('/newOrder', async (req, res) => { //Crea una nueva orden

	const data = req.body;

	const info = JSON.stringify(data);
	console.log(info);


	const resultado = await fetch("http://localhost:4000/api/v1/newOrder", {
		method: "POST",
		body: JSON.stringify(req.body),
		headers: { "Content-Type": "application/json" }
	})

	res.json({ message: 'La orden fue procesada correctamente' });
})

myRouter.get("/newMenu", (req, res) => { //Crea un nuevo platillo para un restaurant
	res.render("newMenu", { loggedin: req.session.loggedin, username: req.session.user })
})

myRouter.post("/newMenu", async (req, res) => { //Crea un nuevo platillo para un restaurant
	console.log(req.session.user);
	let menu_details = {
		menuname: req.body.menuname,
		menuprice: parseInt(req.body.price),
		stock: parseInt(req.body.stock),
		category: req.body.category,
		restaurant_id: req.session.user.restaurant_id
	}

	const resultado = await fetch("http://localhost:4000/api/v1/newMenu", {
		method: "POST",
		body: JSON.stringify(menu_details),
		headers: { "Content-Type": "application/json" }
	})
	res.redirect("inventory")
})

myRouter.post('/newEmployee', async (req, res) => { //Crea un nuevo Empleado

	const data = {
		username: req.body.username,
		user_restaurantname: req.body.name,
		user_restaurantid: req.body.restaurant,
		userpassword: await hashPassword(req.body.password)
	}

	const resultado = await fetch("http://localhost:4000/api/v1/user/restaurant", {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" }
	})
})

myRouter.get("/orderComplete/:orderid", async (req, res) => { //Modifica el estado de una orden
	const resultado = await fetch("http://localhost:4000/api/v1/orderComplete", {
		method: "PUT",
		body: JSON.stringify({ orderid: req.params.orderid }),
		headers: { "Content-Type": "application/json" }
	})

	res.redirect(`/orders/${req.session.restaurant.restaurantid}`)
})

myRouter.get('/new', (req, res) => { //Pagina de registro de restaurant
	res.render("new", { loggedin: req.session.loggedin, username: req.session.user })
})

myRouter.get('/logout', function (req, res) { //Cierre se sesion

	req.session.destroy();
	res.redirect('/');
});

export default myRouter;