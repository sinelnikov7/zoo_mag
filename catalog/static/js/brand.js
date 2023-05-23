let url_brand = `/api/brand`
let root_brand = document.getElementById('brand')

fetch(url_brand).then((response)=>response.json()).then((brand)=>{
    html = `<div>
                <div class="pop_tov_h1"><h1>Популярные бренды</h1></div>
            </div>
            <div class="brands">`

    for(let i in brand.results){
    html +=     `<div class="brand">
                    <div class="img_div_prod"><a href=""><img class="brand-img" src="${brand.results[i].image}" title="{{ brand.name }}" alt=""></a></div>
                </div>`
    }

    html += `</div>
                <div class="but1"><div><button class="myButton2" onclick="get_all_brand(event)">Смотреть больше брендов</button></div>
                </div>`
    root_brand.innerHTML = html
})


function get_all_brand(event){
    let root_all_article = document.getElementById('content')
    console.log("hello my friend this is all brands page")
    url = `/api/brand`


fetch(url).then((response)=>response.json()).then((brand)=>{
    let html = `<div style="width:100%; height:1px; clear:both;"></div>`
    console.log(brand)

    for(let i in brand.results){

        html  +=
            `<div class="brand">
                    <div class="img_div_prod"><a href=""><img class="brand-img" src="${brand.results[i].image}" title="{{ brand.name }}" alt=""></a></div>
                </div>`
            }

    html +='<div style="width:100%; height:1px; clear:both;"></div>'
    root_all_article.innerHTML = html

})
}