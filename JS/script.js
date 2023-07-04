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
