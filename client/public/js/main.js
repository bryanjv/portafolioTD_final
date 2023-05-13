function addition(menuid) { //Funcion en el cliente para sumar cantidad a un producto
    let counterElement = document.getElementById(`counter_${menuid}`);
    let stock = document.getElementById(`stock_${menuid}`);
    if (counterElement) { //Logica para descontar del stock lo que se quiere comprar
        let counter = parseInt(counterElement.innerText);
        if (counter > 0 && counter <= stock.innerText) {
            if (counter != stock.innerText) {
                counter++;
                counterElement.innerText = counter;
            } else {
                counterElement.innerText = counter
            }
        }
    }
}

function subtraction(menuid) { //Funcion en el cliente para restar cantidad a un producto
    let counterElement = document.getElementById(`counter_${menuid}`);
    let stock = document.getElementById(`stock_${menuid}`);
    if (counterElement) { //logica para sumar al stock lo que se elimino del pedido
        let counter = parseInt(counterElement.innerText);
        if (counter > 0 && counter <= stock.innerText) {
            if (counter != 1) {
                counter--;
                counterElement.innerText = counter;
            } else {
                counterElement.innerText = counter
            }
        }
    }
}

function order(menuid, menuprice, user, restaurant_id) { //Utilizacion de sessionStorage para almacenar la orden de un cliente mientras aun no se envie a la base de datos
    let counterElement = document.getElementById(`counter_${menuid}`);
    let menuname = document.getElementById(`menuname_${menuid}`)
    let order = JSON.parse(sessionStorage.getItem("order"));
    var flag = false;
    if (!order) { //Si no existe la orden se crea
        order = {
            userid: user,
            items: [],
            restaurant_id: restaurant_id
        };
    }
    if (counterElement) { //
        order.items.forEach(element => {
            if (element.menuid == menuid) { //logica para que los botones de ordenes funcionen de acuerdo al platillo que corresponde
                element.quantity = element.quantity + parseInt(counterElement.innerText);
                flag = true;
            }
        });
        if (flag == false) {
            order.items.push({
                menuid: menuid,
                menuname: menuname.innerText,
                menuprice: parseInt(menuprice),
                quantity: parseInt(counterElement.innerText)
            })
        }
    }

    let stock = document.getElementById(`stock_${menuid}`);
    stock.innerText = stock.innerText - counterElement.innerText;
    if (stock.innerText <= 0) { //Se oculta el platillo si el stock es cero
        document.getElementById(`row_${menuid}`).setAttribute("hidden", true)
    }

    counterElement.innerText = 1;

    sessionStorage.setItem("order", JSON.stringify(order));
}

function checkout() { //Funcion resumen del pedido
    let order = JSON.parse(sessionStorage.getItem("order"));
    let container = document.querySelector(".container");

    order.items.forEach(element => {
        console.log(element)
        container.innerHTML = container.innerHTML + `
            <p>Nombre Platillo: ${element.menuname}<br>
            Cantidad: ${element.quantity}<br>
            Precio: ${element.menuprice}<br>
            Total: ${parseInt(element.menuprice) * parseInt(element.quantity)}<br></p>`
    })
}

function sendOrder() { //Funcion para enviar el pedido a la base de datos
    let order = JSON.parse(sessionStorage.getItem("order"));

    fetch('/newOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    }).then(response => {
        response
        sessionStorage.removeItem("order"); //Se elimina de sessionStorage si se realiza correctamente la orden en la base de datos
    }).catch(error => {
        console.log(error);
    });
}

function ordersCompleted() { //Codigo para crear un .csv con las ordenes completadas de un restaurant
    var table = document.getElementById('ordersCompleted');

    var csv = '';

    for (var i = 0; i < table.rows.length; i++) { //Obtencion de datos de la tabla ordenes completadas
        var row = table.rows[i];

        for (var j = 0; j < row.cells.length; j++) {
            var cell = row.cells[j];

            csv += '"' + cell.textContent.replace(/"/g, '""') + '",';
        }

        csv += '\n';
    }

    var csvFile = new Blob([csv], { type: 'text/csv' }); //logica para crear el csv y descargarlo
    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.download = 'tabla.csv';
    downloadLink.click();
}


