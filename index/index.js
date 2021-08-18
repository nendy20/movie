let fo = document.querySelector('#main__form');

fo.addEventListener('submit', (e) =>{
    e.preventDefault();
let gmail = fo.gmail.value;
let password = fo.password.value;

if (gmail != '' && password != '') {
    window.open('https://mystifying-hodgkin-60ff26.netlify.app/');
    window.close();
} else {
    if (document.querySelector('.alert')) {
        querySelector('.alert').remove();
    } 

    let aler = document.createElement('div');
    aler.className = 'alert';
    aler.textContent = 'por favor llene el formulario';
    fo.prepend(aler)

    setTimeout(() =>{
        fo.firstChild.remove();
    }, 3000);
}

});