document.addEventListener("DOMContentLoaded", function(event) {

    const toggleMenu = document.querySelector('#toggle-menu');
    const userMenu = document.querySelector('#user-menu');
    
    const menu = document.querySelector('#menu');
    const menuProfile = document.querySelector('#menu-profile');

    initApp();

    function initApp() {
        menuProfile.classList.add('hidden')
    }


    toggleMenu.addEventListener('click', ()=> {
        menu.classList.toggle('hidden')
    });

    userMenu.addEventListener('mouseover', ()=> {
        menuProfile.classList.toggle('hidden')
    });
    userMenu.addEventListener('mouseout', ()=> {
        menuProfile.classList.toggle('hidden')
    });

});