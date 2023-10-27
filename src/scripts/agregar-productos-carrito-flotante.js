carrito=[];
cargarCarrito();
// agregarObraCarrito();
agregarCarritoFlotante();

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      // Si hay datos en el localStorage, analízalos y actualiza el arreglo carrito
      carrito.push(...JSON.parse(carritoGuardado));
    }
  }

 // obra_id:
/* function agregarObraCarrito(){
    const imagen= document.querySelector('#imagen');
    console.log(imagen.textContent);
    imagen.src = carrito[0].imagen;

    const titulo = document.querySelector('#titulo');
    console.log(titulo.textContent);
    titulo.textContent = carrito[0].titulo;
    console.log(titulo.textContent);   

    const artista = document.querySelector('#artista');
    console.log(artista.textContent);
    artista.textContent = carrito[0].artista;
    console.log(artista.textContent);   

    const descripcion = document.querySelector('#descripcion');
    console.log(descripcion.textContent);
    descripcion.textContent = carrito[0].descripcion;
    console.log(descripcion.textContent);    

    const dimensiones = document.querySelector('#dimensiones');
    console.log(dimensiones.textContent);
    dimensiones.textContent = 'Largo ' + carrito[0].largo + ' x Ancho ' + carrito[0].ancho;
    console.log(dimensiones.textContent);  
    
    const precio = document.querySelector('#precio');
    console.log(precio.textContent);
    precio.textContent = '$ ' + carrito[0].precio;
    console.log(precio.textContent);  

} */
function agregarCarritoFlotante(){
    for(let i =0; i<carrito.length;i++){
        carrito[i]["obra_id"]=i;
    //const obra = document.createElement('div');
   // obra.id="lista-carrito-flotante";
   // obra.className=""
    //obra.innerHTML =
    
    // Obtén el contenedor donde deseas agregar los elementos
    //const contenedor = document.getElementById("lista-carrito-flotante");

    // Crea los elementos necesarios
    const contenedor = document.createElement("div");
    const hrElement = document.createElement("hr");
    hrElement.setAttribute("data-idObra", carrito[i].obra_id);

    const divPrincipal = document.createElement("div");
    divPrincipal.classList.add("row", "col-12");

    const enlace = document.createElement("a");
    enlace.setAttribute("href", "#");

    const botonCerrar = document.createElement("button");
    botonCerrar.setAttribute("type", "button");
    botonCerrar.setAttribute("id", carrito[i]);
    botonCerrar.classList.add("btn-close");
    botonCerrar.setAttribute("aria-label", "Close");
    botonCerrar.addEventListener("click", () =>{
        contenedor.remove()
     });

    const divImagen = document.createElement("div");
    divImagen.classList.add("col-sm-3", "col-md-4", "col-lg-4", "imagen-producto-carrito-flotante");

    const imagen = document.createElement("img");
    imagen.setAttribute("src", carrito[i].imagen);
    imagen.classList.add("card-img-top");
    imagen.setAttribute("alt", "imagen 1");

    const divInfo = document.createElement("div");
    divInfo.classList.add("col-sm-7", "col-md-8", "col-lg-8");

    const divCerrar = document.createElement("div");
    divCerrar.classList.add("col", "cerrar");

    const h5Element = document.createElement("h5");
    h5Element.classList.add("card-title");
    h5Element.textContent = carrito[i].titulo;

    const h6Element = document.createElement("h6");
    h6Element.classList.add("nombre-artista");
    h6Element.textContent = carrito[i].artista;

    const tamanoElement = document.createElement("p");
    tamanoElement.classList.add("centrado", "tamano-obra");
    tamanoElement.textContent = `Largo ${carrito[i].largo}cm x Ancho ${carrito[i].ancho}cm`;
    
    const fila = document.createElement("div");
    fila.classList.add("row");
    const columnaSigno = document.createElement("div");
    columnaSigno.classList.add("col-8");
    const columnaPrecio = document.createElement("div");
    columnaPrecio.classList.add("col-4");
    const precioSigno = document.createElement("p");
    precioSigno.classList.add("precioSigno");
    precioSigno.textContent = "$";

    const precioElement = document.createElement("p");
    precioElement.classList.add("precio");
    precioElement.textContent = carrito[i].precio;
    columnaSigno.appendChild(precioSigno);
    columnaPrecio.appendChild(precioElement);
    fila.appendChild(columnaSigno);
    fila.appendChild(columnaPrecio);

    // Agrega los elementos al DOM
    divCerrar.appendChild(h5Element);
    divInfo.appendChild(divCerrar);
    divInfo.appendChild(h6Element);
    divInfo.appendChild(document.createElement("br"));
    divInfo.appendChild(tamanoElement);
    divInfo.appendChild(document.createElement("br"));
    divInfo.appendChild(fila);
    //divInfo.appendChild(precioSigno);
    //divInfo.appendChild(precioElement);

    divImagen.appendChild(imagen);

    enlace.appendChild(botonCerrar);

    
    const contenedorEnlace = document.createElement("div");
    contenedorEnlace.appendChild(enlace);
    contenedorEnlace.classList.add("row");
    divPrincipal.appendChild(contenedorEnlace);
    const divCuadro = document.createElement("div");
    divCuadro.classList.add("row");
    divCuadro.appendChild(divImagen);
    divCuadro.appendChild(divInfo);
    divPrincipal.appendChild(divCuadro);
    //divPrincipal.appendChild(divImagen);
    //divPrincipal.appendChild(divInfo);


    contenedor.appendChild(hrElement);
    contenedor.appendChild(divPrincipal);



    const carritoFlotante = document.querySelector('#fila-carrito-flotante');
    carritoFlotante.insertBefore(contenedor,carritoFlotante[i]);
    }

}

let subTotalCarrito=[];
let subTotal = 0;

//Suma de productos
calcularSubTotal();
function calcularSubTotal (){
    
    for(let i =0; i<carrito.length;i++){
        subTotal += carrito[i].precio;
    }
    console.log (subTotal);

    const totalFooter = document.querySelector('.total-footer');
    totalFooter.textContent = '$ '+subTotal + '.00';
}


//Eliminacion del producto
const eliminarProducto = document.querySelectorAll('.btn-close');
eliminarProducto.forEach(element => {
    
    element.addEventListener('click', e =>{ 
        //Remover todo mi contenedor 
        let contenedorCarrito = e.target.parentElement.parentElement.parentElement; /*.parentElement.parentElement.parentElement.parentElement //Eliminados para que elimine solo una obra y no todas */ 
        contenedorCarrito.parentElement.remove();//
        //
        let precio = contenedorCarrito.querySelector('.precio');
        console.log(precio.textContent);
        const totalFooter = document.querySelector('.total-footer');
        subTotal=subTotal-parseInt(precio.textContent);
        totalFooter.textContent = '$ '+subTotal + '.00';
        //eliminar solo una fila 
        let getId = contenedorCarrito.querySelector('[data-idObra]');
        //carrito=[];
        console.log(carrito, "carrito", getId, "getId");
        let nuevoCarrito = [];
        carrito.forEach(element => {
            console.log(element, "elemento");
            if (element.obra_id !== getId.dataset.idobra) {
                nuevoCarrito.push(element);
            }
        });
        console.log(nuevoCarrito);

        // Actualiza el almacenamiento local con el nuevo carrito
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

        
    })
});

 