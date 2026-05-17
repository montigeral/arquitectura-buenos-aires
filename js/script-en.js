document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. DYNAMIC GREETING --- */
    const fechaActual = new Date();
    const horaActual = fechaActual.getHours();
    const footerElement = document.querySelector('.main-footer');
    const mensajeParrafo = document.createElement('p');
    
    if (horaActual < 12) {
        mensajeParrafo.textContent = "Good morning! Explore the architectural heritage.";
    } else if (horaActual < 18) {
        mensajeParrafo.textContent = "Good afternoon! Enjoy your tour of Buenos Aires.";
    } else {
        mensajeParrafo.textContent = "Good evening! Thank you for visiting our historical portal.";
    }
    mensajeParrafo.style.color = "var(--dorado-clasico)";
    footerElement.appendChild(mensajeParrafo);

    /* --- 2. DROPDOWN MENU --- */
    const elementosMenu = document.querySelectorAll('.nav-links li');
    elementosMenu.forEach((elemento) => {
        elemento.addEventListener('mouseenter', () => {
            const subMenu = elemento.querySelector('.submenu');
            if (subMenu) { subMenu.style.display = 'block'; }
        });
        elemento.addEventListener('mouseleave', () => {
            const subMenu = elemento.querySelector('.submenu');
            if (subMenu) { subMenu.style.display = 'none'; }
        });
    });

    /* --- 3. DYNAMIC SLIDER (IMAGE + TEXT) --- */
    const imgInfo = document.getElementById('info-img');
    const tituloInfo = document.getElementById('info-titulo');
    const descInfo = document.getElementById('info-desc');
    
    if (imgInfo && tituloInfo && descInfo) {
        const datosEdificios = [
            {
                imagen: '../images/congreso mini.png',
                titulo: 'Argentine National Congress',
                texto: 'It is the seat of the legislative branch of the government of Argentina, located in Buenos Aires. It houses the Chamber of Deputies and the Senate, making it one of the most representative symbols.'
            },
            {
                imagen: '../images/obelisco.jpg',
                titulo: 'Obelisk',
                texto: 'It is an iconic monument located in the Plaza de la República, at the intersection of 9 de Julio and Corrientes avenues. It is one of the most recognizable urban symbols of the country.'
            },
            {
                imagen: '../images/teatro-colon.jpg',
                titulo: 'Colón Theater',
                texto: 'It is the main opera house in Buenos Aires, and one of the most prestigious in the world. Recognized for its exceptional acoustics and monumental architecture.'
            },
            {
                imagen: '../images/casa-rosada.jpg',
                titulo: 'Casa Rosada',
                texto: 'It is the executive mansion and office of the President of Argentina. Located in front of Plaza de Mayo, it is a symbol of its political life.'
            },
            {
                imagen: '../images/palacio barolo.png',
                titulo: 'Barolo Palace',
                texto: 'Inaugurated in 1923, it was designed by architect Mario Palanti. Its eclectic style, full of symbolism inspired by Dante Alighieri\'s Divine Comedy, makes it unique.'
            },
            {
                imagen: '../images/palacio paz mini.png',
                titulo: 'Paz Palace',
                texto: 'An architectural jewel built at the beginning of the 20th century. It has 140 rooms and reflects a Beaux-Arts style, being one of the largest private residences in the country.'
            }
        ];

        let indiceEdificio = 0;
        let temporizador;

        const actualizarTarjeta = () => {
            imgInfo.src = datosEdificios[indiceEdificio].imagen;
            tituloInfo.textContent = datosEdificios[indiceEdificio].titulo;
            descInfo.textContent = datosEdificios[indiceEdificio].texto;
        };

        const avanceAutomatico = () => {
            indiceEdificio = (indiceEdificio + 1) % datosEdificios.length;
            actualizarTarjeta();
        };

        const reiniciarTemporizador = () => {
            clearInterval(temporizador);
            temporizador = setInterval(avanceAutomatico, 6000);
        };

        document.getElementById('btn-siguiente').addEventListener('click', () => {
            indiceEdificio = (indiceEdificio + 1) % datosEdificios.length;
            actualizarTarjeta();
            reiniciarTemporizador();
        });
        
        document.getElementById('btn-anterior').addEventListener('click', () => {
            indiceEdificio = (indiceEdificio - 1 + datosEdificios.length) % datosEdificios.length;
            actualizarTarjeta();
            reiniciarTemporizador();
        });

        temporizador = setInterval(avanceAutomatico, 6000);
    }
});