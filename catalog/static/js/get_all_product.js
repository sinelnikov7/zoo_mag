function get_all_product(event,url_full){
    let url_else = get_url_full(url_full)
    let root_all_product = document.getElementById('content')
    let all_product_url = `/api/product`
    let filter = event.target.id

// Первая отрисовка страницы или сброс фильтра
    if(how_many < 1 || event.target.id == "close_filter"){
        localStorage.setItem('sort', "")
        how_many += 1
        let filter = event.target.id
        let all_product_url = get_url_product(filter)
        localStorage.setItem('url', all_product_url)
        fetch(all_product_url).then((response)=>response.json()).then((product)=>{

                let html = `<div style="width:100%; height:1px; clear:both;"></div>
                <div id="category_animal"></div>
                <div class="catalog_title">
                        <div class="pop_tov_h2"><h1 class="empty">Каталог товаров для категории </h1>
                        <div style="display:flex; align-items: center;" >
                         <label style="margin-right:5px;">Сортировать по:</label>
                         <select>
                          <option id="s" value="&ordering=id" onClick="get_sort(event)">Новизне</option>
                          <option id="s" value="&ordering=views" onClick="get_sort(event)">Популярности</option>
                          <option id="s" value="&ordering=name" onClick="get_sort(event)">Названию "От А до Я"</option>
                          <option id="s" value="&ordering=-name" onClick="get_sort(event)">Названию "От Я до А"</option>
                          <option id="s" value="&ordering=price" onClick="get_sort(event)">Цене по возрастанию</option>
                          <option id="s" value="&ordering=-price" onClick="get_sort(event)">Цене по убыванию</option>
                        </select>
                        <img id="close_filter" class="" src="static/img/rebote_filter.jpg" title="Сбросить фильтр" style="cursor:pointer;" onClick="get_all_product(event)">
                        </div>
                     </div>
                    </div>
                    <div class="page_cat">
                        <div class="filters">
                            <div class="filters_radio" id="radio">
                            </div>
                            <div class="filters_check-box" id="check-box">
                            </div>
                        </div>
                        <div class="products" id="products">`

    html += get_product_div(product, html)
     html += `</div>`
    root_all_product.innerHTML = html
    get_categories()
    get_filter_radio()
    get_filter_check_box()
})
// Отрисовка блока продуктов
    }else if(how_many > 0){
    let root_all_product_div = document.getElementById('products')
    how_many += 1
    let all_product_url = `/api/product/?${filter}`
    all_product_url += url_else
    localStorage.setItem('url', `${url_else}${filter}`)
    let sort = localStorage.getItem('sort')
    fetch(all_product_url+sort).then((response)=>response.json()).then((product)=>{
    html = get_product_div(product, html)
    root_all_product_div.innerHTML = html
})
}
}
// Блок радиогруппы
function get_filter_radio(){
    fetch(`/api/product_category`).then((response)=>response.json()).then((product_category)=>{
        let root_radio = document.getElementById('radio')
        let html_radio =
        `<strong>Тип товара</strong><br><br>
            <form id="radio_button">
            `
            for(let i in product_category.results){
            html_radio += `<input id="&productcategory=${product_category.results[i].id}" type="radio"
             value="&productcategory=${product_category.results[i].id}" name="product_type"
              onClick="get_all_product(event)"><label>${product_category.results[i].name}</label><br><br>`
            }
            html_radio += `
            </form>`
            root_radio.innerHTML = html_radio
            })
}
// Блок чекбоксов
function get_filter_check_box(){
    fetch(`/api/brand`).then((response)=>response.json()).then((brand)=>{
        let root_check_box = document.getElementById('check-box')
        let html_check_box =
        `<strong>Брэнд</strong><br><br>
            <form id="check_box">
            `
            for(let i in brand.results){
            html_check_box += `<input class="checkbox" type="checkbox" name="scales" unchecked
            value="${brand.results[i].id}" id="${brand.results[i].id}">
            <label>${brand.results[i].name}</label><br><br>`
            }
            html_check_box += `
            <button type="button" class="myButton" onClick="both_filters(event)">Найти</button>
            </form>`
            root_check_box.innerHTML = html_check_box
            })
}
// Функция получения УРЛ взависимости от нажатой кнопки(применяя фильтр или все продукты)
function get_url_product(filter){
    if(filter.length < 1){
        url = `/api/product`
    return url
    }else if(filter.length > 1){
        url = `/api/product/?${filter}`
    return url
    }
}
// Получить значения из двух фильтров
function both_filters(event){
  var url = ``
  if(document.querySelector('input[name="product_type"]:checked') == null){
    var else_url = ""
  }else{
    var else_url = document.querySelector('input[name="product_type"]:checked').value
  }
  var checkboxes = document.getElementsByClassName('checkbox')
  var checkboxesChecked = []
  for (var index = 0; index < checkboxes.length; index++) {
     if (checkboxes[index].checked) {
     checkboxesChecked.push(checkboxes[index].value)
     url = `brand=`
     }
  }
  for (var index = 0; index < checkboxes.length; index++) {
     if (checkboxes[index].checked) {
     checkboxesChecked.push(checkboxes[index].value)
     url += `${checkboxes[index].value},`
     }
  }
  let full_url = url+else_url
  get_all_product(event,full_url)
  return checkboxesChecked
}
// Получить урл с фильтрами или без
function get_url_full(url_full){
    if(url_full){
        return url_full
    }else{
        return ""
    }
}
// Сортировка
function get_sort(event){
    let sort  = event.target.value
    localStorage.setItem('sort', sort)
    event.target.id = localStorage.getItem('url')
    get_all_product(event)
}