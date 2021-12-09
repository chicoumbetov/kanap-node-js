// get url

let url = new URL(document.location);
// get params
let search_params = url.searchParams;
// get id qui est passé dans l'url
// get value of "id" parameter
// "100"
// console.log("id", search_params.get('id'));
// console.log("search_params", search_params);

let productId = search_params.get('id')

// appeler la route pour afficher un seul produit
// const urlProduct = 'http://localhost:3000/api/products/'
const urlProduct = 'https://kanap-project.herokuapp.com/api/products/'



const productImage = document.querySelector('.item__img');

const productTitle = document.getElementById('title');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');

const selectColors = document.getElementById('colors');
const ajouterBtn =  document.getElementById('addToCart');

const getOneProductFunction = async () => {
    // passer id pour savoir quel produit est récupé
    const res = await fetch(urlProduct +  productId)

    // catch error if id is wrong
    if (!res.ok) { throw Error(res.statusText) }

    // console.log("reponse", res)
    const data = await res.json()
        .catch((error) => { console.log('Error of server:', error) })

    //console.log("dataaaaa", data)
    return data;

    /**     Alternative possibility to get data from sever*/
    /**
     .then(function(value) {
            // console.log("value:", value)

            productTitle.innerHTML = value.name
            productPrice.innerHTML = value.price
            productDescription.innerHTML = value.description

            value.colors.map((color) => {
                // console.log("color:", color)
                selectColors.innerHTML += `
                    <option value="${color}">${color}</option>
                `
                // document.querySelector('#color-select').innerHTML
            })

        })
     .catch(function(err) {

            console.log("Une erreur est survenue:", err)
        });
     */
}

(async function() {
    const productData = await getOneProductFunction();
    showProductFunction(productData)
    // console.log("getOneProductFunction():", getOneProductFunction())
    // console.log("product data:", productData.id)

})()



const showProductFunction = (data) => {
    // console.log("data show:", data)

    productImage.innerHTML = `
        <img src="${data.imageUrl}" alt="${data.imageUrl}">
        `
            productTitle.innerHTML = data.name
            productPrice.innerHTML = data.price
            productDescription.innerHTML = data.description

            data.colors.map((color) => {
                // console.log("color:", color)
                selectColors.innerHTML += `
                            <option value="${color}">${color}</option>
                        `
                // document.querySelector('#color-select').innerHTML
            })

    ajouterBtn.addEventListener("click" , (event) => {
        event.preventDefault()
        const a = parseInt(document.getElementById("quantity").value)
        const b = document.getElementById("colors").value

        console.log(data._id)

        const articleChoisi = {
            id: data._id,
            title: data.name,
            price: data.price,
            imageUrl: data.imageUrl,
            quantity: a,
            color: b
        }

        // console.log("localStorage.getItem('panier'):", localStorage.getItem('panier') )
        let panier = JSON.parse(localStorage.getItem('panier'))

        if (panier === null) {
            panier = []
        }
        console.log("before parsed", panier)
        let existing = 0
        panier.forEach((pars) => {

            console.log("pars:", pars)
            if (pars.id === articleChoisi.id && pars.color === articleChoisi.color) {

                // inscrease quantity by chosen quantity
                pars.quantity += a
                pars.price += articleChoisi.price * a

                existing = 1

            }
                // push to parsed nouvelle item
        })

        if (existing === 0) {
            articleChoisi.price = articleChoisi.price * a;
            panier.push(articleChoisi)
        }

        localStorage.setItem('panier', JSON.stringify(panier));

        // console.log("parsed after", parsed)
        console.log("articleChoisi", articleChoisi)

        // window.location.href="cart.html"
        /** console.log("event", event)
        console.log("a", a)
        console.log("b", b)
        console.log("c", productTitle.innerHTML)
        console.log("d", productPrice.innerHTML)
        console.log("e", productDescription.innerHTML)
         */
        // alert('clicked')
    })
}






