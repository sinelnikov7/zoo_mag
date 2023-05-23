let url_feedback = `/api/feedback`
let root_feedback = document.getElementById('feedback')
let counter = 1

function get_cookie ( cookie_name ){
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

fetch(url_feedback).then((response)=>response.json()).then((feedback)=>{
    let html_feedback = `<div class="feed_title"><strong>Отзывы о магазине</strong></div>`
    for(let i in feedback.results){
        html_feedback  += `
            <div class="feed_name"><strong>${feedback.results[i].name}</strong></div>
            <div class="feed_content"><p   class="feedback_content_p">${feedback.results[i].content}</p></div>
            <div class="feedback_bots">
            <div class="feedback_bot">
            <div class="tel_pat"><div class="feed_tel"><img class="nav_icon2" src="static/img/3.svg" alt=""><p>${feedback.results[i].tel}</p></div>
            <div class="feed_patname"><p>Питомец: ${feedback.results[i].petName}</p></div></div>`
    }
    html_feedback += `
        <div class="feed_buttons">
            <div>
                 <button  class="but_prev_dis" id="previous_article" onClick="get_feedback(event)" value="${ feedback.previous }">◂</button>
            </div>
            <p class="p_but_feed">${counter} из ${feedback.count}</p>
            <div>
                 <button class="but_next_act" id="next_article" onClick="get_feedback(event)" value="${ feedback.next }">▸</button>
            </div>
        </div>
        <div class="but1"><div><button class="myButton2" onClick="add_feedback(event)">Оставить свой отзыв</button></div></div></div></div>`
    root_feedback.innerHTML = html_feedback
})

function get_feedback(event){
  does_counter = event.target.id
  qqq = event.target.class
  console.log(does_counter)
  url = event.target.value
  url_null = 'null'



  if (url != url_null){
  fetch(url).then((response)=>response.json()).then((feedback)=>{
      max_page = `${feedback.count}`
      if (does_counter == 'previous_article' && counter > 1){
        counter -= 1
      }else if(does_counter == 'next_article' && counter < max_page){
        counter += 1
      }
        previous = feedback.previous
        next = feedback.next
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
        let html_feedback = `<div class="feed_title"><strong>Отзывы о магазине</strong></div>`
    for(let i in feedback.results){
        html_feedback  += `
            <div class="feed_name"><strong>${feedback.results[i].name}</strong></div>
            <div class="feed_content"><p  class="feedback_content_p">${feedback.results[i].content}</p></div>
            <div class="feedback_bots">
            <div class="feedback_bot">
            <div class="tel_pat"><div class="feed_tel"><img class="nav_icon2" src="static/img/3.svg" alt=""><p>${feedback.results[i].tel}</p></div>
            <div class="feed_patname"><p>Питомец: ${feedback.results[i].petName}</p></div></div>`
    }
    html_feedback += `
        <div class="feed_buttons">
            <div>
                 <button  class="${ class_button_previous }" id="previous_article" onClick="get_feedback(event)" value="${ feedback.previous }">◂</button>
            </div>
            <p class="p_but_feed">${counter} из ${feedback.count}</p>
            <div>
                 <button class="${ class_button_next }" id="next_article" onClick="get_feedback(event)" value="${ feedback.next }">▸</button>
            </div>
        </div>
        <div class="but1"><div><button class="myButton2" onClick="add_feedback(event)">Оставить свой отзыв</button></div></div></div></div>`
    root_feedback.innerHTML = html_feedback
})
}}

function add_feedback(event){
  document.body.style.overflow = "hidden";
  let root_article_solid = document.getElementById('article_detail')

    html = `<div class="article_detail"><div class="add_inside">
    <div class="button_close" onClick="close_detail(event)"><img class="close_img" src="static/img/close.jpg" alt=""></div>
    <form name="add_feedback" id="add_feedback">
    <label>Имя: </label>
    <input id="name" type="text" name="name" placeholder="Вася пупкин" class="input"><br><br>
    <label>Телефон: </label>
    <input id="tel" type="tel" name="tel" placeholder="+375336544344" class="input"><br><br>
    <label>Имя питомца: </label>
    <input id="petName" type="text" name="petName" placeholder="Барсик" class="input"><br><br>
    <label>Отзыв: </label><br>
    <textarea class="input" id="content" name="content" rows="20" cols="40" placeholder="Введите текст..."></textarea>
    <div class="but1"><button type="button" class="myButton2" onClick="send_feedback(event)">Отправить</button></div>
    </form>
    </div></div>`
    root_article_solid.innerHTML = html
}

function send_feedback(event){
    let root_article_solid = document.getElementById('article_detail')
    let push = document.getElementById('push')
    url = `/api/feedback/`
    var formData = document.getElementById('add_feedback');
    const name = formData.querySelector('[name="name"]').value
    const tel = formData.querySelector('[name="tel"]').value
    const petName = formData.querySelector('[name="petName"]').value
    const content = formData.querySelector('[name="content"]').value
    data = {
        "name":name,
        "tel":tel,
        "petName":petName,
        "content":content
    }

    console.log(data)
    fetch(url, {
    method:'POST',
    headers:{'Content-Type': 'application/json', 'X-CSRFToken': get_cookie('csrftoken')},
    body:JSON.stringify(data)
    })

    .then(res=>  {
    if (res.ok) {
    root_article_solid.innerHTML = ``
    document.body.style.overflow = "";
    push.innerHTML = `<div class="push"><img class="push_img" src="static/img/ok.jpg" alt=""><p>Создание отзыва прошло успешно</p></div>`
    setTimeout(function(){ document.getElementById("push").innerHTML=``;},6000)

    }else{
    let results = res.json()
    console.log(results.result)
    results.then(function(result) {


    if(result.name){
    var name = result.name
    console.log(result.name)
    }else{
    var name = []
    console.log(content)
    }
    if(result.tel){
    var tel = result.tel
    console.log(result.tel)
    }else{
    var tel = []
    console.log(tel)
    }
    if(result.petName){
    var petName = result.petName
    console.log(result.petName)
    }else{
    var petName = []
    console.log(petName)
    }
    if(result.content){
    var content = result.content
    console.log(result.content)
    }else{
    var content = []
    console.log(content)
    }
    root_article_solid.innerHTML = `<div class="article_detail"><div class="add_inside">
    <div class="button_close" onClick="close_detail(event)"><img class="close_img" src="static/img/close.jpg" alt=""></div>
    <form name="add_feedback" id="add_feedback">
    <label>Имя: </label>
    <input id="name" type="text" name="name" placeholder="Вася пупкин">
    <p class="form_error">${name}</p>
    <label>Телефон: </label>
    <input id="tel" type="tel" name="tel" placeholder="+375336544344">
    <p class="form_error">${tel}</p>
    <label>Имя питомца: </label>
    <input id="petName" type="text" name="petName" placeholder="Барсик">
    <p class="form_error">${petName}</p>
    <label>Отзыв: </label><br>
    <textarea id="content" name="content" rows="20" cols="40" placeholder="Введите текст..."></textarea>
    <p class="form_error">${content}</p>
    <div class="but1"><button type="button" class="myButton2" onClick="send_feedback(event)">Отправить</button></div>
    </form>
    </div></div>`


    })
    }})
}

