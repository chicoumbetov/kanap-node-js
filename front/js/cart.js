const panier = document.querySelector('#cart__items');
const totalPrice = document.querySelector('#totalPrice');
const totalQuantity = document.querySelector('#totalQuantity');

let firstNom = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let address = document.getElementById('address')
let city = document.getElementById('city')
let email = document.getElementById('email')

let form = document.getElementById('form')

let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg')
let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg')
let addressErrorMsg = document.querySelector('#addressErrorMsg')
let cityErrorMsg = document.querySelector('#cityErrorMsg')
let emailErrorMsg = document.querySelector('#emailErrorMsg')

const parsed = JSON.parse(localStorage.getItem('panier'))
// console.log("sssss", parsed)
let data;
let products = []
let contact;

const displayPanier = () => {
    parsed.map((added) => {
        // console.log('added:', added)
        data = added

        // data-id & data-color are used to know which is clicked and changed
        panier.innerHTML += `
            <article class="cart__item" data-id="${added.id}" data-color="${added.color}">
                <div class="cart__item__img">
                  <img src="${added.imageUrl}" alt="${added.title}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${added.title}</h2>
                    <p>${added.color}</p>
                    <p>${added.price},00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" 
                      name="itemQuantity" min="1" max="100" value="${added.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" >Supprimer</input>
                    </div>
                  </div>
                </div>
            </article>
    `

    })
    console.log("parsed", parsed)

    /** Changement de panier quantité et couleur */
    let inputQuantity = document.getElementsByClassName('itemQuantity')
    // console.log("input", inputQuantity[0].closest("article").dataset)

    for (let i = 0; i < inputQuantity.length; i++) {
        inputQuantity[i].addEventListener('input', (event) => {
            // console.log("event", event.target.value)

            let changedQuantityId = inputQuantity[i].closest("article").dataset.id;
            let changedQuantityColor = inputQuantity[i].closest("article").dataset.color;

            let existing = 0
            parsed.forEach((pars) => {

                // console.log("pars:", pars)
                if (pars.id === changedQuantityId && pars.color === changedQuantityColor) {

                    // inscrease quantity by chosen quantity
                    pars.price = (pars.price/pars.quantity) * parseInt(event.target.value)
                    pars.quantity = parseInt(event.target.value)

                    existing = 1

                }
                // push to parsed nouvelle item
            })

            localStorage.setItem('panier', JSON.stringify(parsed));
            window.location.reload()

            // console.log("rrrr", changedQuantityId, changedQuantityColor)

        })
    }

    let deleteButton = document.getElementsByClassName('deleteItem')

    for (let i = 0; i < deleteButton.length; i++) {
        // let chosenProductId = deleteButton[i].closest("article").dataset.id;
        // console.log("delete II", chosenProductId)
        // console.log("deeeee", deleteButton);

            deleteButton[i].addEventListener('click', () => {
                // console.log("iiii",i)

                if (deleteButton.length > 1) {
                    let newParsed = parsed.splice((i-1), 1)
                    console.log("paaaas:", newParsed)
                    localStorage.setItem('panier', JSON.stringify(newParsed));
                } else {
                    localStorage.removeItem('panier');
                }

                window.location.reload()
            })


    }

    let sum = []
    parsed.map((each) => {
        sum.push(each.price)
        console.log("iiiii", each.price)
    })

    let sumQuantity = []
    parsed.map((item) => {
        sumQuantity.push(item.quantity)
    })

    parsed.map((item) => {
        products.push(item.id)
    })

    // console.log("lllll", sum, sumQuantity)

    // console.log("parsed", parsed)
    totalPrice.innerHTML = `${sum.reduce((prev, next) => prev+next)}`
    totalQuantity.innerHTML =  `${sumQuantity.reduce((prev, next) => prev + next)}`
}

form.addEventListener("submit", function(evt) {
    evt.preventDefault();

    const errorMessage = errorManagement()

    if (errorMessage) {
        fillArray();
        console.log("error message", errorMessage)
    } else {
        console.log("Email error:", errorMessage)

    }
});

async function orderChosenProduct(e) {
    // e.preventDefault()
    console.log("e", e)
    try {
        const justCreated = await fetch("https://kanap-project.herokuapp.com/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact, products})
        })
        const orderedProduct = await justCreated.json()
        console.log("justCreated:", orderedProduct)

        /** first method by id to localStorage but forbidden by CahiersDesCharges */
        // localStorage.setItem('orderId', orderedProduct.orderId);
        localStorage.removeItem('panier');

        /** second method : passing id to URL and switching to next page (window.location... etc) */
        window.location.href=`./confirmation.html?id=${orderedProduct.orderId}`
    } catch (error) {
        console.log(error)
    }

}

function fillArray() {
    // console.log("firstNom "+ firstNom.value);
    // console.log("lastName "+ lastName.value);
    // console.log("address"+ address.value);
    // console.log("city "+ city.value);
    // console.log("email "+ email.value);
    contact = {
        firstName: firstNom.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }

    console.log("contact:", contact)
    console.log("products:", products)
    orderChosenProduct({contact, products})
}

function errorManagement() {

    if (firstNom.value.length < 2 || firstNom.value.length > 50 ) {
        firstNameErrorMsg.innerHTML = `Le prénom doit être composée de plus de 2 caractères ou de moins de 50 caractères.`
        return false
    }

    if (lastName.value.length < 2 || lastName.value.length > 50 ) {
        lastNameErrorMsg.innerHTML = `Le nom doit être composée de plus de 2 caractères ou de moins de 50 caractères.`
        return false
    }

    if (city.value.length < 2 || city.value.length > 60 ) {
        cityErrorMsg.innerHTML = `La ville doit être composée de plus de 2 caractères ou de moins de 60 caractères.`
        return false
    }

    if (address.value.length < 2 || address.value.length > 200 ) {
        addressErrorMsg.innerHTML = `L'address doit être composée de plus de 2 caractères ou de moins de 200 caractères.`
        return false
    }

    let valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value);
    console.log("email:", email.value);
    if(valid) {
        return true;
    } else {
        emailErrorMsg.innerHTML = `Entrez l'email valid, s'il vous plait.`;
        return false;
    }

}

(async function() {
    displayPanier()
    // console.log("deleteBtn:", deleteBtn)
})()

