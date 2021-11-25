let url = new URL(document.location);
let search_params = url.searchParams;
let orderId = search_params.get('id');

console.log("order:", orderId)

let orderedNumber = document.getElementById('orderId');
orderedNumber.innerText = orderId;