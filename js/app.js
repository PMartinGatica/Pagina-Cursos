//VARIABLES
const carrito = document.querySelector("#carrito");
const listacarrito = document.querySelector("#lista-carrito tbody");
const vaciarcarritoBtn = document.querySelector("#vaciar-carrito");
const listacursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];
//ADDING EVENT LISTENERS
cargarAddeventListeners();
function cargarAddeventListeners() {
  listacursos.addEventListener("click", agregarCurso);

  //ELIMINA ELEMENTOS DEL CARRITO
carrito.addEventListener('click',eliminarCurso);
}

//Muestra los cursos del Local Storage

document.addEventListener('DOMContentLoaded',()=>{
     articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [] ;

     crearHTML();
})

vaciarcarritoBtn.addEventListener('click',()=>{
     articulosCarrito =[]; //REseteamos el arreglo

     limpiarHTML();// Eliminamos todo el HTML
});
//FUNCIONS

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    //console.log(e.target.parentElement.parentElement);
    leerDatosCursos(cursoSeleccionado);
  }
  //console.log(e.target.classList);
}

//ELIMINAR CURSO
function eliminarCurso(e){
     if(e.target.classList.contains('borrar-curso')){
          const cursoID = (e.target.getAttribute('data-id'));

          //Eliminar del arreglo de articulosCarrito por el data-id
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);

          crearHTML();// Iterar sobre el carrito y mostrar su HTML
     }      
     }
     

function leerDatosCursos(curso) {
  console.log(curso);

  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  console.log(infoCurso);
//Revisar si un elemento ya fue agregado al carrito
const existe = articulosCarrito.some (curso => curso.id === infoCurso.id);
if (existe){
     //Actualizamos cantidad
     const cursos = articulosCarrito.map(curso =>{
          if(curso.id === infoCurso.id){
               curso.cantidad++;
               return curso; //RETORNA EL OBJETO ACTUALIZADO
          }else{
               return curso;//RETORNA EL OBJETO QUE NO SON LOS DUPLICADOS
          }
     });
     articulosCarrito = [...cursos];
}else{
     articulosCarrito = [...articulosCarrito,infoCurso]; //Agregar eleementos al arreglo de carrito
}


  console.log(articulosCarrito);

  crearHTML();
}

function crearHTML() {
  //Limpiando HTML
  limpiarHTML();
  //Recorrer el carrito y generar HTML
  articulosCarrito.forEach((curso) => {
     const {imagen,titulo,precio,cantidad,id}  =curso;
    const row = document.createElement("tr");
    row.innerHTML = `
               <td>
                    <img src="${imagen}" width ="100">
               </td>
               <td>
                    ${titulo}
               </td>
               <td>
                    ${precio}
               </td>
               <td>
                    ${cantidad}
               </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${id}"> X </a></a>
               </td>
          `;

    //Agrega el HTML del carrito en el TB

    listacarrito.appendChild(row);
  });

  //Agregar el carrito de compras al Storage

  sincronizarStorage();

  function sincronizarStorage(){
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
  }
}

//Eliminar los cursos de TB asi no se duplican

function limpiarHTML() {
  //listacarrito.innerHTML = '' ;

  while (listacarrito.firstChild) {
    listacarrito.removeChild(listacarrito.firstChild);
  }
}
