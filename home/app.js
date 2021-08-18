    
//variables
const d = document;
const formulario = d.getElementById('formulario');
const section = d.querySelector('.section');
const favoria = d.querySelector('.favoria');
const lista = d.querySelector('#lista');
let carga = d.querySelector('#carga');
//funciones
const resetearLista = () =>{
    while(section.firstChild) {
        section.firstChild.remove();
    }
}


let myfunction = async (e) =>{
   e.preventDefault();
   try {
       
   } catch (error) {
       
   }
    let url = formulario.buscar.value;
     let fet = await fetch(`https://www.omdbapi.com/?s=${url}&apikey=523eb421`);
    let data = await fet.json();

        let frag = document.createDocumentFragment(); 
    if (data.Search === undefined) {
            resetearLista();
            let erro = document.createElement('div');
            erro.textContent = 'hubo un error nuestros simios estan trabajando';
            erro.classList.add('simio');
            section.appendChild(erro);

            setTimeout(() =>{
                erro.textContent = 'ya me voy';
                erro.style.backgroundColor = '#123545'
                setTimeout(() =>{
                    erro.textContent = 'help me!';
                    erro.style.backgroundColor = '#202945'
                    setTimeout(() =>{
                       let simio = document.querySelector('.simio');
                       simio.remove();
                    },7000)
                },6000);
            },3000);

    } else {
            resetearLista();
        //variable de data id
        let increment = 0;

        for(const el of data.Search) {
           
                 let father = document.createElement('section');
                father.classList = 'father';
                father.setAttribute('data-id',`${increment}`);
    
                let image = document.createElement('img');
                el.Poster == "N/A" ? image.src = 'http://lorempixel.com/200/300/' : image.src = el.Poster;
                let h2 = document.createElement('h2');
                h2.textContent = el.Title;
                let fecha = document.createElement('p');
                fecha.textContent = el.Year;
                fecha.classList.add('date');
                let fav = document.createElement('div');
                fav.classList.add('fav');
    
                let float = document.createElement('article');
                float.classList.add('moreInfo');
    
                let titu = document.createElement('h3');
                titu.textContent = el.Title;
                let sypnosy = document.createElement('p');
                sypnosy.textContent = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quae cupiditate aspernatur porro, saepe totam sequi.';
                sypnosy.classList.add('sypnosy');
                let year = document.createElement('p');
                year.textContent = el.Year;
    
                float.append(titu,sypnosy,year);
    
                father.append(image,h2,fecha,fav,float);
                
                frag.append(father);
                increment++
        }
        section.appendChild(frag);
    }
    formulario.reset(); 
}


let obtenerLobalStoratage = () =>{
    let obtener;
    if (localStorage.getItem('movies') === null) {
        obtener = [];
    } else {
        obtener = JSON.parse(localStorage.getItem('movies'));
    }
    return obtener
}

class Movies {
    constructor(img,title,year,sinopsis,id){
        this.img = img;
        this.title = title;
        this.year = year;
        this.sinopsis = sinopsis;
        this.id = id;
    }
}


let agregarElemento = (movie,e) =>{
    if (e.target.classList[0] == 'fav' && e.target.classList.length == 2) {
        let father = document.createElement('section');
            father.classList = 'father';
            father.setAttribute('data-id', movie.id);

            let image = document.createElement('img');
            image.src = movie.img;
            let h2 = document.createElement('h2');
            h2.textContent = movie.title;
            let fecha = document.createElement('p');
            fecha.textContent = movie.year;
            fecha.classList.add('date');
            let fav = document.createElement('div');
            fav.classList.add('eli','active'); 

            let float = document.createElement('article');
            float.classList.add('moreInfo');

            let titu = document.createElement('h3');
            titu.textContent = movie.title;
            let sypnosy = document.createElement('p');
            sypnosy.textContent = movie.sinopsis;
            sypnosy.classList.add('sypnosy');
            let year = document.createElement('p');
            year.textContent = movie.year;

            float.append(titu,sypnosy,year);
            father.append(image,h2,fecha,fav,float);

            carga.appendChild(father);
           // e.target.remove();
    } else {
     //   e.target.remove();
    }

}


const eliinarLocal = (what) =>{
    let obtener = obtenerLobalStoratage();

    obtener.forEach( (borrar, index) =>{
        if(borrar.id == what) {
            obtener.splice(index, 1)
        }
    });
    localStorage.setItem('movies', JSON.stringify(obtener));
}


//eventlistener
 formulario.addEventListener('submit', myfunction); 

    favoria.addEventListener('click', () =>{
        lista.classList.toggle('listaA');
    })


 d.addEventListener('click', (e) =>{

     if (e.target.matches('.fav')) {

        e.target.classList.toggle('active');

        let img = e.target.parentElement.firstChild.src;
        let title = e.target.parentElement.children[1].textContent;
        let year = e.target.parentElement.children[2].textContent;
        let sinopsis = e.target.nextElementSibling.children[1].textContent;
        let dataId = e.target.parentElement.getAttribute('data-id');
       


         const movie = new Movies(img,title,year,sinopsis,dataId);
         let obtenerL = obtenerLobalStoratage();
        obtenerL.push(movie);
        localStorage.setItem('movies', JSON.stringify(obtenerL));
        agregarElemento(movie,e);
     } 


 
     if(e.target.matches('.eliminar')) {
        while(carga.firstChild) {
            carga.firstChild.remove();
        }
        localStorage.clear();
    }

     if(e.target.matches('.eli')) {
       e.target.parentElement.remove();
       let what = e.target.parentElement.getAttribute('data-id');
       eliinarLocal(what); 
       console.log('matches')
    } 

    
 });



/********************************************************************** */
document.addEventListener('DOMContentLoaded', () =>{
    let obtener = obtenerLobalStoratage();
    
    obtener.forEach( movie => {
        let father = document.createElement('section');
            father.classList = 'father';
            father.setAttribute('data-id', movie.id);

            let image = document.createElement('img');
            image.src = movie.img;
            let h2 = document.createElement('h2');
            h2.textContent = movie.title;
            let fecha = document.createElement('p');
            fecha.textContent = movie.year;
            fecha.classList.add('date');
            let fav = document.createElement('div');
            fav.classList.add('eli','active');

            let float = document.createElement('article');
            float.classList.add('moreInfo');

            let titu = document.createElement('h3');
            titu.textContent = movie.title;
            let sypnosy = document.createElement('p');
            sypnosy.textContent = movie.sinopsis;
            sypnosy.classList.add('sypnosy');
            let year = document.createElement('p');
            year.textContent = movie.year;

            float.append(titu,sypnosy,year);

            father.append(image,h2,fecha,fav,float);
            let carga = document.getElementById('carga');
            carga.appendChild(father);
            lista.appendChild(carga);
    });
});
