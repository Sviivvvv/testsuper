const buttons = document.querySelectorAll('.cartBtn');

buttons.forEach(btnElement => {
    btnElement.addEventListener("click", event => {
        addToCart(event.target)
    })
});

const addFavouriteBtn = document.getElementById("addFavourite")
addFavouriteBtn.addEventListener("click", event => addFavourite())

const applyFavouriteBtn = document.getElementById("applyFavourite")
applyFavouriteBtn.addEventListener("click", event => applyFavourite())

const emptyCartBtn = document.getElementById("emptyCart")
emptyCartBtn.addEventListener("click", event => emptyCart())

let cartQty = new Array();
let cartPrice = new Array();

function emptyCart() {
    // remove the cart html body elements and clear the total
    document.getElementById("orderBody").innerHTML = ""
    document.getElementById("totalPrice").innerHTML = "0.00"

    // empty the cart in local storage
    localStorage.setItem("cartQty", "");
    localStorage.setItem("cartPrice", "");
    localStorage.setItem("total", "");

    // empty the cart letiables
    cartQty = new Array();
    cartPrice = new Array();
}

function addToCart(buttonElement) {

    // find price, name, qty of provided element/obj
    let parent = buttonElement.parentElement;
    let price = parent.querySelector(".itemPrice").innerHTML
    let name = parent.querySelector(".itemName").innerHTML
    let qty = parent.querySelector(".numItem").value

    // check if qty is mentioned, if not show message and discontinue
    if (qty <= 0) {
        alert('Please enter quanity')
        return false
    }

    // adding qty if already available, if not insert product
    if (cartQty[name]) {
        cartQty[name] += Number(qty)
    } else {
        cartQty[name] = Number(qty)
    }

    cartPrice[name] = price

    // clear the cart table before appending products
    document.getElementById("orderBody").innerHTML = ""

    let total = 0

    // loop through objects in the cart and add to table
    for (let item in cartPrice) {
        const tr = document.createElement("tr");
        const nameTd = document.createElement("td");
        const qtyTd = document.createElement("td");
        const priceTd = document.createElement("td");
        const subTotal = document.createElement("td");

        // adding values to html 
        nameTd.innerHTML = item
        qtyTd.innerHTML = cartQty[item]
        priceTd.innerHTML = cartPrice[item]
        subTotal.innerHTML = cartPrice[item] * cartQty[item]
        total += cartPrice[item] * cartQty[item]

        tr.appendChild(nameTd);
        tr.appendChild(qtyTd);
        tr.appendChild(priceTd);
        tr.appendChild(subTotal);

        // appending the table row to html
        document.getElementById("orderBody").appendChild(tr)
    }

    // adding the total to html in cart
    document.getElementById("totalPrice").innerHTML = total

    // converting arrays into strings to save to local storage
    localStorage.setItem("cartQty", JSON.stringify(Object.entries(cartQty)));
    localStorage.setItem("cartPrice", JSON.stringify(Object.entries(cartPrice)));
    localStorage.setItem("total", total);
}

function addFavourite() {
    // get values from cart in local storage and store it in favourites in local storage

    let qty = localStorage.getItem("cartQty");
    let price = localStorage.getItem("cartPrice");
    let total = localStorage.getItem("total");

    localStorage.setItem("favCartQty", qty);
    localStorage.setItem("favCartPrice", price);
    localStorage.setItem("favTotal", total);
}

function applyFavourite() {
    // get the values exisiting in the favourites in local storage
    let cartQty = JSON.parse(localStorage.getItem("favCartQty"));
    let cartPrice = JSON.parse(localStorage.getItem("favCartPrice"));

    // get the cart qty and price from storage
    cartQty = Array.from(cartQty)
    cartPrice = Array.from(cartPrice)

    // if the values are valid
    if (cartPrice[0]) {

        // empty the html cart table 
        document.getElementById("orderBody").innerHTML = ""

        let total = 0

        for (let item in cartPrice) {
            // add the cart values into html table
            const tr = document.createElement("tr");
            const nameTd = document.createElement("td");
            const qtyTd = document.createElement("td");
            const priceTd = document.createElement("td");
            const subTotal = document.createElement("td");

            // set the values 
            nameTd.innerHTML = cartPrice[item][0]
            qtyTd.innerHTML = cartQty[item][1]
            priceTd.innerHTML = cartPrice[item][1]
            subTotal.innerHTML = Number(cartPrice[item][1]) * Number(cartQty[item][1])
            total += Number(subTotal.innerHTML)

            tr.appendChild(nameTd);
            tr.appendChild(qtyTd);
            tr.appendChild(priceTd);
            tr.appendChild(subTotal);

            document.getElementById("orderBody").appendChild(tr)
        }

        document.getElementById("totalPrice").innerHTML = total

        // update the cart again with your favourites
        localStorage.setItem("cartQty", localStorage.getItem("favCartQty"));
        localStorage.setItem("cartPrice", localStorage.getItem("favCartPrice"));
        localStorage.setItem("total", total);
    }
}

// loading the html cart with local stroage cart details
function loadCart() {
    // getting the cart values from from local storage
    let cartQty = JSON.parse(localStorage.getItem("cartQty"));
    let cartPrice = JSON.parse(localStorage.getItem("cartPrice"));

    cartQty = Array.from(cartQty)
    cartPrice = Array.from(cartPrice)

    if (cartPrice[0] && cartPrice[0].length > 0) {

        // empty the cart html
        document.getElementById("orderBody").innerHTML = ""

        let total = 0

        // adding the cart values in the cart html
        for (let item in cartPrice) {
            const tr = document.createElement("tr");
            const nameTd = document.createElement("td");
            const qtyTd = document.createElement("td");
            const priceTd = document.createElement("td");
            const subTotal = document.createElement("td");

            nameTd.innerHTML = cartPrice[item][0]
            qtyTd.innerHTML = cartQty[item][1]
            priceTd.innerHTML = cartPrice[item][1]
            subTotal.innerHTML = Number(cartPrice[item][1]) * Number(cartQty[item][1])
            total += Number(subTotal.innerHTML)

            tr.appendChild(nameTd);
            tr.appendChild(qtyTd);
            tr.appendChild(priceTd);
            tr.appendChild(subTotal);

            document.getElementById("orderBody").appendChild(tr)
        }

        document.getElementById("totalPrice").innerHTML = total

        localStorage.setItem("cartQty", localStorage.getItem("cartQty"));
        localStorage.setItem("cartPrice", localStorage.getItem("cartPrice"));
        localStorage.setItem("total", total);
    }
}

// everytime you refresh the page, run this function
loadCart()