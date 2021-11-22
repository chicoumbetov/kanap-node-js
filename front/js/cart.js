
document.querySelector('#limitedWidthBlock')

document.querySelector('#cartAndFormContainer');
const panier = document.querySelector('#cart__items');
const totalPrice = document.querySelector('#totalPrice');
const totalQuantity = document.querySelector('#totalQuantity');


let firstNom = document.querySelector('#firstName')
document.querySelector('#firstNameErrorMsg')


document.querySelector('#lastName')
document.querySelector('#lastNameErrorMsg')


document.querySelector('#address')
document.querySelector('#addressErrorMsg')


document.querySelector('#city')
document.querySelector('#cityErrorMsg')


document.querySelector('#email')
document.querySelector('#emailErrorMsg')


document.querySelector('#order')



const parsed = JSON.parse(localStorage.getItem('panier'))
// console.log("sssss", parsed)
let data;
const deleteProduct = (pro) => {
    console.log("del", pro)
}


const displayPanier = () => {
    parsed.map((added) => {
        console.log('added:', added)
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
    console.log("paaaa", parsed)

    totalPrice.innerHTML = `${parsed.price * parsed.quantity}`
    totalQuantity.innerHTML = `${parsed.quantity}`
}



(async function() {
    displayPanier()
    // console.log("deleteBtn:", deleteBtn)
})()


// console.log("parsed after", parsed)
