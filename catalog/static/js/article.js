
let url_article = `/api/article`
let root_article = document.getElementById('articles')

fetch(url_article).then((response)=>response.json()).then((article)=>{
    let html_atticle = `<div class="pop_tov_h1"><h1>Полезные статьи</h1>
         <div>
             <button  class="but_prev_dis" id="previous_article" onClick="get_article(event)" value="${ article.previous }">◂</button>
             <button class="but_next_act" id="next_article" onClick="get_article(event)" value="${ article.next }">▸</button></div>
         </div><div class="articles">`

    for(let i in article.results){

        html_atticle  += `
            <div class="article">
                <div class="img_div_prod"><img class="article_img" src="${article.results[i].image}" alt=""></div>
                <div class="feed_name"><strong>${article.results[i].title}</strong></div>
                <div class="feed_content"><p class="feed_content_p">${article.results[i].content}</p></div>

            <div class="bot_art">
                <div class="art_info"><div class="feed_tel"><img class="nav_icon2" src="/static/img/2.svg" alt=""><p>Время чтения: ${ article.results[i].time_of_read } мин.</p></div>
                <div class="feed_tel"><img class="nav_icon2" src="/static/img/123.jpg"><p>${ article.results[i].created_at }</p></div></div>
                <button class="button_detail" onClick="article_detail(event)" id="${article.results[i].id}">Подробнее</button>
            </div>
            </div>`
            }

    html_atticle +='</div><div class="but1"><div><button class="myButton2" onClick="all_article(event)">Читать больше статей</button></div>'
    root_article.innerHTML = html_atticle

})

function get_article(event){
  url = event.target.value
  url_null = 'null'
  if (url != url_null){


    fetch(url).then((response)=>response.json()).then((article)=>{
        previous = article.previous
        next = article.next
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

        let html_atticle = `<div class="pop_tov_h1"><h1>Полезные статьи</h1>
            <div>
             <button  class="${ class_button_previous }" id="previous_article" onClick="get_article(event)" value="${ article.previous }">◂</button>
             <button class="${ class_button_next }" id="next_article" onClick="get_article(event)" value="${ article.next }">▸</button></div>
            </div><div class="articles">`

        for(let i in article.results){

            html_atticle  += `
                <div class="article">
                    <div class="img_div_prod"><img class="article_img" src="${article.results[i].image}" alt=""></div>
                    <div class="feed_name"><strong>${article.results[i].title}</strong></div>
                    <div class="feed_content"><p class="feed_content_p">${article.results[i].content}</p></div>

                    <div class="bot_art">
                <div class="art_info"><div class="feed_tel"><img class="nav_icon2" src="/static/img/2.svg" alt=""><p>Время чтения: ${ article.results[i].time_of_read } мин.</p></div>
                <div class="feed_tel"><img class="nav_icon2" src="/static/img/123.jpg"><p>${ article.results[i].created_at }</p></div></div>
                <button class="button_detail" onClick="article_detail(event)" id="${article.results[i].id}">Подробнее</button>
            </div>
            </div>`
                }

        html_atticle +='</div><div class="but1"><div><button class="myButton2" onClick="all_article(event)">Читать больше статей</button></div>'
        root_article.innerHTML = html_atticle
})
}}

function all_article(event){
    let root_all_article = document.getElementById('content')
    console.log("hello_my_Friend")
    url = `/api/article_all`


fetch(url).then((response)=>response.json()).then((article_all)=>{
    let html_article_all = `<div style="width:100%; height:1px; clear:both;"></div>`
    console.log(article_all)

    for(let i in article_all){

        html_article_all  += `
            <div class="article_all">
                <div class="img_div_prod"><img class="article_img" src="${article_all[i].image}" alt=""></div>
                <div class="feed_name"><strong>${article_all[i].title}</strong></div>
                <div class="feed_content"><p class="feed_content_p">${article_all[i].content}</p></div>
                <div class="bot_art">
                <div class="art_info"><div class="feed_tel"><img class="nav_icon2" src="/static/img/2.svg" alt=""><p>Время чтения: ${ article_all[i].time_of_read } мин.</p></div>
                <div class="feed_tel"><img class="nav_icon2" src="/static/img/123.jpg"><p>${ article_all[i].created_at }</p></div></div>
                <button class="button_detail" onClick="article_detail(event)" id="${article_all[i].id}">Подробнее</button>
            </div>
            </div>`
            }

    html_article_all +='<div style="width:100%; height:1px; clear:both;"></div>'
    root_all_article.innerHTML = html_article_all

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






