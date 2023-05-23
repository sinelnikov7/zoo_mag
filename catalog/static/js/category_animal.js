
function get_categories(){
let category_url = `/api/animal_category`
let root_category_url = document.getElementById('category_animal')
fetch(category_url).then((response)=>response.json()).then((category)=>{
html = `<div class="category_animal">`

for(let i in category.results){
html += `<div class="category_animal_detail" id="&animalcategory=${category.results[i].id}" onclick="get_all_product(event); location.href='#/catalog/${category.results[i].slug}'">

            <img id="&animalcategory=${category.results[i].id}" src="${category.results[i].image}" class="main-image" alt=""><p id="&animalcategory=${category.results[i].id}">${category.results[i].name}</p>
        </div>`
}
html += `</div>`
root_category_url.innerHTML = html
})
}
get_categories()