let url_new_product = `/api/new_product/?ordering=-id`
let root_new_product = document.getElementById('new_product')




fetch(url_new_product).then((response)=>response.json()).then((product)=>{

html = `<div class="new_div_h1">
            <div class="pop_tov_h1"><h1 class="empty">Новинки</h1>
            <div>
             <button  class="but_prev_dis" id="previous_article" onClick="get_new_product(event)" value="${ product.links.previous }">◂</button>
             <button class="but_next_act" id="next_article" onClick="get_new_product(event)" value="${ product.links.next }">▸</button></div>
         </div>
        </div>
        <div class="new_div">`

for(let i in product.results){
      html +=  `<div class="product">
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
    html += `</div>
    <div class="but2"><div><button class="myButton2" onClick="get_all_product(event)">Смотреть больше товаров</button></div></div>`
    root_new_product.innerHTML = html
})

function get_new_product(event){
  url = event.target.value
  url_null = 'null'
  if (url != url_null){


    fetch(url).then((response)=>response.json()).then((product)=>{
        previous = product.links.previous
        next = product.links.next
        null_url = 'null'

        if (previous == null){
                class_button_previous = "but_prev_dis"
            }else {
            class_button_previous = "but_prev_act"
        }

        if (next == null){
                class_button_next = "but_next_dis"
            }else {
            class_button_next = "but_next_act"
        }

        html = `<div class="new_div_h1">
            <div class="pop_tov_h1"><h1 class="empty">Новинки</h1>
            <div>
             <button  class="${class_button_previous}" id="previous_article" onClick="get_new_product(event)" value="${ product.links.previous }">◂</button>
             <button class="${class_button_next}" id="next_article" onClick="get_new_product(event)" value="${ product.links.next }">▸</button></div>
         </div>
        </div>
        <div class="new_div">`

for(let i in product.results){
      html +=  `<div class="product">
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
    html += `</div>
    <div class="but2"><div><button class="myButton2" onClick="get_all_product(event)">Смотреть больше товаров</button></div></div>`
    root_new_product.innerHTML = html
})
}}


