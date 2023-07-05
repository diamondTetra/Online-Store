// Navigation
const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu-list");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = ()=>{
    menu.classList.add("active");
    menuBtn.classList.add("hide");
    cancelBtn.classList.add("show");
    body.classList.add("disabledScroll");
}
cancelBtn.onclick = ()=>{
    menu.classList.remove("active");
    menuBtn.classList.remove("hide");
    cancelBtn.classList.remove("show");
    body.classList.remove("disabledScroll");
}

window.onscroll = ()=>{
    this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}


// store information on the text files
window.addEventListener('DOMContentLoaded', () => {
    const clientsParagraph = document.getElementById('clients');
    const displayButton = document.getElementById('displayButton');
    const saveButton = document.getElementById('saveButton');

    displayButton.addEventListener('click', () => {
        fetch('data/clients.txt')
        .then(response => response.text())
        .then(data => {
            clientsParagraph.innerHTML = ''; // Clear the existing content

            const lines = data.split('\n');
            lines.forEach(line => {
            const [name, age] = line.split(',');

            const clientSpan = document.createElement('span');
            clientSpan.textContent = `${name.trim()} - ${age.trim()} years old`;

            clientsParagraph.appendChild(clientSpan);
            clientsParagraph.appendChild(document.createElement('br'));
            });
        })
        .catch(error => console.log('Error:', error));
    });
});

// Slider
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};


