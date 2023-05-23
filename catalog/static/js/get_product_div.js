
function get_product_div(product){

let root_category_url = document.getElementById('products')
let html_opapa =``
    for(let i in product.results){
      html_opapa +=  `<div class="product">
            <div class="img_div_prod"><img class="prod_img" src="${product.results[i].image}" alt="" id="${product.results[i].id}" onClick="product_detail(event)"></div>
            <div class="name_div_prod"><strong id="${product.results[i].id}" onClick="product_detail(event)">${product.results[i].name}</strong></div>

            <div class="offer_div">
                <div class="offer_div_prod"><p>${product.results[i].first_offer}${product.results[i].productcategory.measure}</p></div>
                <div class="offer_div_prod"><p>${product.results[i].second_offer}${product.results[i].productcategory.measure}</p></div>
            </div>
            <div class="offer_div">
                <div class="price_prod_div"><strong>${product.results[i].price} BYN</strong></div>
                <div class="korz"><a href="#" class="a_icon_hed1"><img class="nav_icon3" src="static/img/11.jpg" alt=""></a></div>
            </div>
            <div class="offer_button"><button class="myButton">Купить в 1 клик</button></div>
        </div>`
}
    return html_opapa
}