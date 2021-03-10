const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    //Agregar un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    
    //Eliminar cursos del carrito presionando "X"
    carrito.addEventListener('click', eliminarCurso);
    
    //Vaciar cursos del carrito al presionar "Vaciar carrito"
    btnVaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []; // resetear el arreglo
        limpiarHTML(); // eliminamos el HTML
    });
}

// Funciones

//Agregar cursos al carrito
function agregarCurso(e){
    // Para que no añada el evento default del '#'
    e.preventDefault();
    
    // Sólo el botón de carrito presionado
    if(e.target.classList.contains('agregar-carrito')){

        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

//Eliminar cursos del carrito
function eliminarCurso(e){
    
    // Para que no añada el evento default del '#'
    e.preventDefault();
    
    // Sólo el botón de X presionado
    if(e.target.classList.contains('borrar-curso')){
        const cursoID = e.target.getAttribute('data-id');

        //Eliminar del arreglo
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
    }

    // Iterear sobre el carrito y mostrar su HTML
    carritoHTML();
}

// Leer el contenido del HTML al que le dimos Click y extrae la info del curso
function leerDatosCurso(curso){

    // Objeto con el contenido del curso seleccionado
    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad: 1,
    };
    
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);

    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el obj actualizado
            } else {
                return curso; // retorna los objetos que no son duplicados
            }
        })
        // Agrega copia de los cursos al carrito
        articulosCarrito = [...cursos];
    } else {
        // Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
}

// Muestra el carrito en el HTML
function carritoHTML(){
    limpiarHTML(); 

    articulosCarrito.forEach( curso => {
        // Variables destructuring
        const {id, imagen, titulo, precio, cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td> ${titulo}</td>
            <td> ${precio}</td>
            <td> ${cantidad}</td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbdoy (previamente estaban los agregados)
function limpiarHTML(){

    // Una forma
    // contenedorCarrito.innerHTML = '';

    // Forma más rápida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
