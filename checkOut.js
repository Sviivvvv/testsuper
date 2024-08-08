const payBtn = document.getElementById("pay");
payBtn.addEventListener('click', event => pay())



const cardRadio = document.getElementById('card');
const cashRadio = document.getElementById('cash');
const cardFields = document.querySelectorAll('.card-field');

function hideCardFields() {
    if (cashRadio.checked) {
        cardFields.forEach(field => field.style.display = 'none');
    } else {
        cardFields.forEach(field => field.style.display = 'block');
    }
}

cardRadio.addEventListener('change', hideCardFields);
cashRadio.addEventListener('change', hideCardFields);

// Initial check in case a payment method is already selected
hideCardFields();


// load the cart from the local storage
function loadCart() {
    // getting the array strings from local stoage
    let cartQty = JSON.parse(localStorage.getItem("cartQty"));
    let cartPrice = JSON.parse(localStorage.getItem("cartPrice"));

    // converting the string from local storage back to array
    cartQty = Array.from(cartQty)
    cartPrice = Array.from(cartPrice)

    // check if items are available in cart
    if (cartPrice[0]) {

        document.getElementById("orderBody").innerHTML = ""

        let total = 0
        // loop through cart and add items into html cart
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
        // update the total in html cart
        document.getElementById("totalPrice").innerHTML = total
        // update the cart
        localStorage.setItem("cartQty", localStorage.getItem("cartQty"));
        localStorage.setItem("cartPrice", localStorage.getItem("cartPrice"));
        localStorage.setItem("total", total);
    }
}
// load the cart from local storage
loadCart()

// check if the delivery details are filled when pay is clicked
function pay() {
    // find all the input fields
    let fields = document.getElementsByClassName("input_field")
    let security_code = document.getElementById("security_code").value
    let exp_month = document.getElementById("exp_month").value
    let exp_year = document.getElementById("exp_year").value
    let error = false;

    // loop through all the input fields and check the value

    for (let item in Array.from(fields)) {
        let value = fields[item].value

        // if the value is not set on any one of the fields, show an error
        if (value == "") {
            error = true
        }
    }

    if (cardRadio.checked) {
        // go through each card details fields
        if (security_code == "") {
            error = true
        }

        if (exp_month == "") {
            error = true
        }

        if (exp_year == "") {
            error = true
        }

    } else if (cashRadio.checked) {
        if (security_code == "") {
            error = false
        }

        if (exp_month == "") {
            error = false
        }

        if (exp_year == "") {
            error = false
        }

    }


    if (!error) {
        // if no errors are present, show success messag
        let today = new Date();
        today.setDate(today.getDate() + 7);

        alert('Congratulations, your order will be delivered ' + today)
    } else {
        alert('There are missing values. please fill form')
    }
}


