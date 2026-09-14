document.addEventListener('DOMContentLoaded', function () {
    //DATO CURIOSO AL AZAR
    const btnDato = document.getElementById('btn-dato'); 
    const textoDato = document.getElementById('texto-dato');
    // Array con los datos curiosos
    const datosCuriosos = [ 
        "Casey Reas es co-creador de Processing, un lenguaje de programación visual diseñado para artistas y estudiantes de diseño.", "Junto a Ben Fry desarrolló Processing como una herramienta educativa en el MIT Media Lab en 2001.", "Su obra artística se basa en la escritura de algoritmos que generan imágenes en constante cambio.", "Está influenciado por el arte conceptual y sistemático, especialmente por las instrucciones visuales de Sol LeWitt.", "Además de visuales digitales, ha realizado impresiones generativas de gran formato como obras únicas o en series." ];
        if (btnDato && textoDato) { 
            btnDato.addEventListener('click', function () { 
            const indiceAzar = Math.floor(Math.random() * datosCuriosos.length); 
            textoDato.innerText = datosCuriosos[indiceAzar]; 
        }); 
    }
//GALERÍA DE OBRAS Y CAMBIO DE DISEÑO
const galeriaContenedor = document.getElementById('galeria-obras'); 
const btnCambiarDiseno = document.getElementById('btn-cambiar-diseno');

const obrasArtísticas = [ 
    { nombre: "Software Structures", anio: 2004, imagen: "img/reas-2.jpg" }, 
    { nombre: "Process 18", anio: 2007, imagen: "../img/reas-1.jpg" }, 
    { nombre: "Process 4", anio: 2005, imagen: "../img/reas-3.jpg" }, 
    { nombre: "Tissue", anio: 2002, imagen: "../img/reas.jpg" }, 
    { nombre: "Path", anio: 2011, imagen: "../img/reas-2.jpg" } 
];

if (galeriaContenedor) { 
    renderizarGaleria(obrasArtísticas);
    if (btnCambiarDiseno) { 
        btnCambiarDiseno.addEventListener('click', function () { 
            galeriaContenedor.classList.toggle('modo-normal'); 
            galeriaContenedor.classList.toggle('modo-compacto'); 
        }); 
    } 
}

function renderizarGaleria(obras) { 
    galeriaContenedor.innerHTML = ""; 
    for (let i = 0; i < obras.length; i++) { 
        const card = document.createElement('article'); 
        card.classList.add('tarjeta-obra'); 
        card.innerHTML = `  
        <img src="${obras[i].imagen}" alt="${obras[i].nombre}">
        <h3>${obras[i].nombre}</h3> 
        <p>Año: ${obras[i].anio}</p> 
        `; 
        galeriaContenedor.appendChild(card); 
    } 
}

//EJERCICIO DE GESTIÓN DEL ESTUDIO CASEY REAS
const formConfig = document.getElementById('form-config'); 
const formInstalacion = document.getElementById('form-instalacion'); 
const btnCalcular = document.getElementById('btn-calcular'); 
const btnReiniciar = document.getElementById('btn-reiniciar'); 
const cajaResultado = document.getElementById('resultado-ejercicio');
const inputCantInst = document.getElementById('cant-instalaciones'); 
const inputHorasDia = document.getElementById('horas-dia'); 
const inputHonorarioHora = document.getElementById('honorario-hora'); 
const btnIniciarCarga = document.getElementById('btn-iniciar-carga');
const tituloPaso2 = document.getElementById('titulo-paso2'); 
const inputNombreInst = document.getElementById('nombre-inst'); 
const inputPersonasInst = document.getElementById('personas-inst'); 
const inputDiasInst = document.getElementById('dias-inst'); 
const btnAgregarInst = document.getElementById('btn-agregar-inst');

let cantTotalInstalaciones = 0; 
let horasDiaConfig = 0; 
let honorarioHoraConfig = 0; 
let instalacionesCargadas = [];

if (formConfig && formInstalacion) {
    // Paso 1: Configurar Estudio
    formConfig.addEventListener('submit', function (e) {
        e.preventDefault();

        cantTotalInstalaciones = parseInt(inputCantInst.value, 10);
        horasDiaConfig = parseFloat(inputHorasDia.value);
        honorarioHoraConfig = parseFloat(inputHonorarioHora.value);

        if (
            isNaN(cantTotalInstalaciones) || cantTotalInstalaciones <= 0 ||
            isNaN(horasDiaConfig) || horasDiaConfig <= 0 ||
            isNaN(honorarioHoraConfig) || honorarioHoraConfig <= 0
        ) {
            alert('Por favor, ingrese valores numéricos válidos superiores a 0.');
            return;
        }

        inputCantInst.disabled = true;
        inputHorasDia.disabled = true;
        inputHonorarioHora.disabled = true;
        btnIniciarCarga.disabled = true;

        inputNombreInst.disabled = false;
        inputPersonasInst.disabled = false;
        inputDiasInst.disabled = false;
        btnAgregarInst.disabled = false;

        actualizarEstadoCarga();
    });

    // Paso 2: Cargar Instalación
    formInstalacion.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = inputNombreInst.value.trim();
        const personas = parseInt(inputPersonasInst.value, 10);
        const dias = parseInt(inputDiasInst.value, 10);

        if (!nombre || isNaN(personas) || personas <= 0 || isNaN(dias) || dias <= 0) {
            alert('Complete correctamente todos los datos de la instalación.');
            return;
        }

        const costoTotalInst = personas * dias * horasDiaConfig * honorarioHoraConfig;

        instalacionesCargadas.push({
            nombre: nombre,
            personas: personas,
            dias: dias,
            costoTotal: costoTotalInst
        });

        inputNombreInst.value = '';
        inputPersonasInst.value = '';
        inputDiasInst.value = '';

        if (instalacionesCargadas.length >= cantTotalInstalaciones) {
            inputNombreInst.disabled = true;
            inputPersonasInst.disabled = true;
            inputDiasInst.disabled = true;
            btnAgregarInst.disabled = true;
            btnCalcular.disabled = false;
            tituloPaso2.innerText = `Paso 2: Carga Finalizada (${instalacionesCargadas.length} / ${cantTotalInstalaciones})`;
        } else {
            actualizarEstadoCarga();
        }
    });

    btnCalcular.addEventListener('click', function () {
        let totalPersonasEstudio = 0;
        let costoTotalEstudioProyectos = 0;
        let instMasDias = instalacionesCargadas[0];

        if (!instMasDias) {
            cajaResultado.classList.remove('oculto');
            cajaResultado.innerHTML = '<p>No hay instalaciones cargadas.</p>';
            return;
        }

        for (let i = 0; i < instalacionesCargadas.length; i++) {
            totalPersonasEstudio += instalacionesCargadas[i].personas;
            costoTotalEstudioProyectos += instalacionesCargadas[i].costoTotal;

            if (instalacionesCargadas[i].dias > instMasDias.dias) {
                instMasDias = instalacionesCargadas[i];
            }
        }

        const costoUnDiaEstudio = totalPersonasEstudio * horasDiaConfig * honorarioHoraConfig;
        const porcentajeMax = costoTotalEstudioProyectos > 0 ? (instMasDias.costoTotal / costoTotalEstudioProyectos) * 100 : 0;

        cajaResultado.classList.remove('oculto');
        cajaResultado.innerHTML = `
            <h3>Resultados del Análisis del Estudio</h3>
            <p><strong>1. Costo total de 1 día de trabajo del estudio:</strong> $${costoUnDiaEstudio.toFixed(2)} (${totalPersonasEstudio} personas en total).</p>
            <p><strong>2. Instalación con más días de producción:</strong> "${instMasDias.nombre}" (${instMasDias.dias} días de trabajo) — <strong>Costo Total:</strong> $${instMasDias.costoTotal.toFixed(2)}.</p>
            <p><strong>3. Porcentaje del presupuesto total:</strong> La instalación "${instMasDias.nombre}" representa el <strong>${porcentajeMax.toFixed(2)}%</strong> del costo total de producción ($${costoTotalEstudioProyectos.toFixed(2)}).</p>
        `;

        btnCalcular.disabled = true;
        btnReiniciar.disabled = false;
    });

    btnReiniciar.addEventListener('click', function () {
        instalacionesCargadas = [];
        cantTotalInstalaciones = 0;
        horasDiaConfig = 0;
        honorarioHoraConfig = 0;

        formConfig.reset();
        formInstalacion.reset();

        inputCantInst.disabled = false;
        inputHorasDia.disabled = false;
        inputHonorarioHora.disabled = false;
        btnIniciarCarga.disabled = false;

        inputNombreInst.disabled = true;
        inputPersonasInst.disabled = true;
        inputDiasInst.disabled = true;
        btnAgregarInst.disabled = true;

        btnCalcular.disabled = true;
        btnReiniciar.disabled = true;

        cajaResultado.classList.add('oculto');
        cajaResultado.innerHTML = '';
        tituloPaso2.innerText = 'Paso 2: Carga de Instalación (0 / 0)';
    });

    function actualizarEstadoCarga() {
        tituloPaso2.innerText = `Paso 2: Carga de Instalación (${instalacionesCargadas.length + 1} / ${cantTotalInstalaciones})`;
    }
}
});