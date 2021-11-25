
document.querySelector('#limitedWidthBlock')

document.querySelector('#cartAndFormContainer');
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
const deleteProduct = (pro) => {
    console.log("del", pro)
}


const displayPanier = () => {
    parsed.map((added) => {
        // console.log('added:', added)
        data=added
        panier.innerHTML += `
            <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${added.imageUrl}" alt="Photographie d'un canapé">
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
                      <p class="deleteItem" onclick="deleteProduct(data)">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>
    `

    })
    console.log("parsed", parsed)

    let sum = []
    parsed.map((each) => {
        sum.push(each.price * each.quantity)
        // console.log("iiiii", each.price * each.quantity)
    })

    let sumQuantity = []
    parsed.map((item) => {
        sumQuantity.push(item.quantity)
    })

    totalPrice.innerHTML = `${sum.reduce((prev, next) => prev+next)}`
    totalQuantity.innerHTML = `${sumQuantity.reduce((prev, next) => prev + next)}`
}


form.addEventListener("submit", function(evt) {
    evt.preventDefault();
    fillArray();
});

function fillArray() {
    console.log("firstNom "+ firstNom.value);
    console.log("lastName "+ lastName.value);
    console.log("city "+ city.value);
    console.log("address"+ address.value);
    console.log("email "+ email.value);
}



(async function() {
    displayPanier()
    console.log("eeeee")

    // console.log("deleteBtn:", deleteBtn)
})()



/**
 * // onChange:
 let inputs = ['firstName', 'lastName', 'city', 'address', 'email']
 let values = []

 for (let i = 0; i < inputs.length; i++) {
    document.getElementsByName(inputs[i])[0].addEventListener('input', function(event) {
        console.log("loop",event.target.value)
        values.push(event.target.value)
    });
}
 const showValues = () => {
    console.log("values:", values)
}

 *
 */
