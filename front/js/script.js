

// const urlBackend = 'http://localhost:3000/api/products';
const urlBackend = 'https://kanap-project.herokuapp.com/api/products';




const getProductsFunction = async () => {
    const response = await fetch(urlBackend)
    // console.log("response", response)

    const data = await response.json();
    console.log("data", data)
    return data;
}

const showProducts = (products) => {

    const divProduct = document.querySelector('#items');
    products.map((product) => {
        // console.log("product", product)
        divProduct.innerHTML += `
            <a href="./product.html?id=${product._id}">
                <article>
                  <img src="${product.imageUrl}" alt="${product.imageUrl}">
                  <h3 class="productName">${product.name}</h3>
                  <p class="productDescription">${product.description}</p>
                </article>
            </a>
    `;
    })


}

// auto executed function
// syntax : (async function() { code ... } )
(async function() {
    const products = await getProductsFunction();

    showProducts(products)
})()

// get info of ONE product

// show product