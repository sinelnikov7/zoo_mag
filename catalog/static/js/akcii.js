let root_akcii = document.getElementById('akcii')

let html_akcii = `<div class="akcii">
           <div class="akcii1">
               <strong>Скидка 25% на первый заказ любого товара на сумму от 50BYN</strong>
               <img src="static/img/12.jpg" alt="">
           </div>
           <div><button class="myButton" onClick="get_all_product(event)">Перейти к выбору товара</button></div>
       </div>
       <div class="akcii">
           <div class="akcii1">
               <strong>Получите игрушку в подарок при сумме заказа от 200BYN</strong>
               <img src="static/img/12.jpg" alt="">
           </div>
           <div><button class="myButton" onClick="get_all_product(event)">Перейти к выбору товара</button></div>
      </div>`

    root_akcii.innerHTML = html_akcii