function product_detail(event){
    let root_product_detail = document.getElementById('article_detail')
    get_product = event.target.id
    document.body.style.overflow = "hidden";


    fetch(`/api/product/${get_product}/`).then((response)=>response.json()).then((product)=>{
    console.log(product)
    html = `<div class="article_detail"><div class="article_inside">
    <div class="button_close" onClick="close_detail(event)"><img class="close_img" src="static/img/close.jpg" alt=""></div>
    <div class="article_detail_img">
    <p><img class="product_img" src="${product.image}" alt=""></p></div>
    <p>${product.name}</p>
    <div class="article_detail_p">
    <p>${product.discription}</p></div>
    </div></div>`
    root_product_detail.innerHTML = html
    })

}



function article_detail(event){
  document.body.style.overflow = "hidden";
  id = event.target.id
  url = `api/article/${id}/`
  let root_article_solid = document.getElementById('article_detail')



  fetch(url).then((response)=>response.json()).then((article_detail)=>{
    console.log(article_detail)
    html = `<div class="article_detail"><div class="article_inside">
    <div class="button_close" onClick="close_detail(event)"><img class="close_img" src="static/img/close.jpg" alt=""></div>
    <div class="article_detail_img">
    <p><img class="article_img" src="${article_detail.image}" alt=""></p></div>
    <p>${article_detail.title}</p>
    <div class="article_detail_p">
    <p>${article_detail.content}</p></div>
    </div></div>`
    root_article_solid.innerHTML = html

})
}

function close_detail(event){
    document.body.style.overflow = "";

    let root_article_solid = document.getElementById('article_detail')
    root_article_solid.innerHTML = ""

}