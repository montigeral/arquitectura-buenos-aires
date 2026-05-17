// Agregamos un evento para ejecutar el código solo cuando todo el documento HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. MENSAJE PERSONALIZADO SEGÚN LA HORA (Aplica a las 3 páginas) --- */
    // Nuevo objeto de fecha para obtener la información del tiempo actual
    const fechaActual = new Date();
    // Extraemos solo la hora local del objeto de fecha (en formato de 0 a 23)
    const horaActual = fechaActual.getHours();
    // Seleccionamos el contenedor del footer usando su clase CSS 'main-footer'
    const footerElement = document.querySelector('.main-footer');
    // Creamos un nuevo elemento de párrafo (p) para insertar nuestro mensaje en el HTML
    const mensajeParrafo = document.createElement('p');
    // Evaluamos con un condicional si la hora actual es menor a las 12 del mediodía
    if (horaActual < 12) {
        // Si es de mañana, asignamos el texto de buenos días al contenido del párrafo
        mensajeParrafo.textContent = "¡Buenos días! Explora el patrimonio arquitectónico.";
    // Si no es de mañana, evaluamos si la hora es menor a las 18 
    } else if (horaActual < 18) {
        // Si es de tarde, asignamos el texto de buenas tardes al contenido del párrafo
        mensajeParrafo.textContent = "¡Buenas tardes! Disfruta tu recorrido por Buenos Aires.";
    // Si no se cumplen las condiciones anteriores, significa que es de noche
    } else {
        // Asignamos el texto de buenas noches al contenido del párrafo
        mensajeParrafo.textContent = "¡Buenas noches! Gracias por visitar nuestro portal histórico.";
    }
    // Añadimos un color destacado al texto usando una variable CSS 
    mensajeParrafo.style.color = "var(--dorado-clasico)";
    // Insertamos el nuevo párrafo creado justo al final de los elementos que ya existen en el footer
    footerElement.appendChild(mensajeParrafo);

    /* --- 2. MENÚ DESPLEGABLE (Esto ya aplica a las 3 páginas) --- */
    // Seleccionamos todos los elementos de lista (li) que están dentro de los enlaces de navegación
    const elementosMenu = document.querySelectorAll('.nav-links li');
    // Recorremos cada uno de los elementos de la lista encontrados usando un ciclo forEach
    elementosMenu.forEach((elemento) => {
        // Añadimos un evento que "escucha" cuando el puntero del ratón entra en el área del elemento
        elemento.addEventListener('mouseenter', () => {
            // Buscamos si dentro de este elemento en particular existe un submenú (clase 'submenu')
            const subMenu = elemento.querySelector('.submenu');
            // Verificamos si la búsqueda fue exitosa y el submenú realmente existe
            if (subMenu) {
                // Cambiamos el estilo CSS de visualización a 'block' para que el submenú se muestre
                subMenu.style.display = 'block';
            }
        });
        // Añadimos otro evento que "escucha" cuando el puntero del ratón sale del área del elemento
        elemento.addEventListener('mouseleave', () => {
            // Volvemos a buscar el submenú correspondiente a este elemento
            const subMenu = elemento.querySelector('.submenu');
            // Verificamos nuevamente si el submenú existe antes de manipularlo
            if (subMenu) {
                // Cambiamos el estilo CSS de visualización a 'none' para ocultar el submenú
                subMenu.style.display = 'none';
            }
        });
    });

    /* --- 3. SLIDER DE EDIFICIOS (IMAGEN + TEXTO) --- */
    // Seleccionamos la imagen, el título y el párrafo que vamos a cambiar dinámicamente
    const imgInfo = document.getElementById('info-img');
    const tituloInfo = document.getElementById('info-titulo');
    const descInfo = document.getElementById('info-desc');
    
    // Verificamos si los elementos existen en la página para no generar errores en otras páginas
    if (imgInfo && tituloInfo && descInfo) {
        
        // Creamos un arreglo de objetos, cada objeto contiene la info de un edificio
        const datosEdificios = [
            {
                imagen: 'images/congreso mini.png',
                titulo: 'Congreso de la Nación Argentina',
                texto: 'Es el edificio sede del Poder Legislativo del país, ubicado en la Ciudad de Buenos Aires. Alberga las cámaras de Diputados y Senadores y constituye uno de los símbolos más representativos.'
            },
            {
                imagen: 'images/obelisco.jpg',
                titulo: 'Obelisco',
                texto: 'Es un monumento emblemático ubicado en la Plaza de la República, en el cruce de la Avenida 9 de Julio y la Avenida Corrientes. Es uno de los símbolos urbanos más reconocibles del país.'
            },
            {
                imagen: 'images/teatro-colon.jpg',
                titulo: 'Teatro Colón',
                texto: 'Es el principal teatro de ópera de Buenos Aires, y uno de los más prestigiosos del mundo. Reconocido por su acústica excepcional y su arquitectura monumental.'
            },
            {
                imagen: 'images/casa-rosada.jpg',
                titulo: 'Casa Rosada',
                texto: 'Es el palacio presidencial de la República Argentina y sede del Poder Ejecutivo Nacional. Ubicada frente a la Plaza de Mayo, es símbolo de su vida política.'
            },
            {
                imagen: 'images/palacio barolo.png',
                titulo: 'Palacio Barolo',
                texto: 'Inaugurado en 1923, fue diseñado por el arquitecto Mario Palanti. Su estilo ecléctico, cargado de simbolismo inspirado en la Divina Comedia de Dante Alighieri, lo hace único.'
            },
            {
                imagen: 'images/palacio paz mini.png',
                titulo: 'Palacio Paz',
                texto: 'Joya arquitectónica construida a principios del siglo XX. Cuenta con 140 habitaciones y refleja un estilo Beaux-Arts, siendo una de las mayores residencias privadas del país.'
            }
        ];

        // Variable para controlar qué edificio se está mostrando actualmente (empieza en 0)
        let indiceEdificio = 0;
        // Variable para almacenar el ID del temporizador automático
        let temporizador;

        // Función encargada de actualizar el HTML con los datos del edificio actual
        const actualizarTarjeta = () => {
            // Cambiamos la ruta de la imagen
            imgInfo.src = datosEdificios[indiceEdificio].imagen;
            // Cambiamos el texto del título
            tituloInfo.textContent = datosEdificios[indiceEdificio].titulo;
            // Cambiamos el texto de la descripción
            descInfo.textContent = datosEdificios[indiceEdificio].texto;
        };

        // Función para avanzar a la siguiente imagen de forma automática
        const avanceAutomatico = () => {
            indiceEdificio = (indiceEdificio + 1) % datosEdificios.length;
            actualizarTarjeta();
        };

        // Función para reiniciar el temporizador si el usuario hace clic manualmente
        const reiniciarTemporizador = () => {
            clearInterval(temporizador); // Detiene el temporizador actual
            temporizador = setInterval(avanceAutomatico, 6000); // Inicia uno nuevo de 6 segundos
        };

        // Asignamos el evento 'click' al botón de Siguiente
        document.getElementById('btn-siguiente').addEventListener('click', () => {
            // Aumentamos el índice; si llega al final, vuelve a 0 usando el operador módulo (%)
            indiceEdificio = (indiceEdificio + 1) % datosEdificios.length;
            actualizarTarjeta();
            reiniciarTemporizador(); // Evita que la imagen salte doble si el usuario acaba de hacer clic
        });
        
        // Asignamos el evento 'click' al botón de Anterior
        document.getElementById('btn-anterior').addEventListener('click', () => {
            // Reducimos el índice; si baja de 0, vuelve al último elemento de la lista
            indiceEdificio = (indiceEdificio - 1 + datosEdificios.length) % datosEdificios.length;
            actualizarTarjeta();
            reiniciarTemporizador(); // Evita que la imagen salte doble
        });

        // Hacemos que el slider rote automáticamente cada 5 segundos (5000 milisegundos)
        temporizador = setInterval(avanceAutomatico, 5000);
    }
});