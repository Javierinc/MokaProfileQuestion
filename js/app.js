//Preguntas cuestionario perfil de riesgo
const questions = [
    {
        question: '¿Cuál es tu edad?',
        answers : [
            {text: 'Menos de 25 años', value: 4},
            {text: 'Entre 25 y 35 años', value: 3},
            {text: 'Entre 36 y 55 años', value: 2},
            {text: 'Más de 55 años', value: 1}
        ]
    },{
        question: '¿Cuánto conoces de las inversiones en fondos mutuos?',
        answers: [
            {text: 'Nada de nada', value: 1},
            {text: 'Un poquito', value: 2},
            {text: 'Bastante', value: 3},
            {text: 'Me peino, soy un crack', value: 4}
        ]
    },{
        question: '¿Has realizado alguna vez alguna inversión en fondos mutuos?',
        answers: [
            {text: 'Si', value: 4},
            {text: 'No', value: 3}
        ]
    }, {
        question:'¿Cuentas con alguna reserva para cubrir un imprevisto?',
        answers: [
            {text: 'No o es muy pequeña', value: 2},
            {text: 'Si, me alcanza para 5 meses', value: 3},
            {text: 'Si, es una cantidad significativa', value: 4}
        ]
    },{
        question: '¿Qué porcentaje de tus ahorros estás dispuesta/a a invertir?',
        answers: [
            {text: 'Menos del 25%', value: 1},
            {text: 'Entre el 25% y el 40%', value: 2},
            {text: 'Entre el 41 y 65%', value: 3},
            {text: 'Más del 65%', value: 4},
        ]
    },{
        question: '¿Cúal es el plazo máximo que estarías dispuesta/o a mantener tus inversiones en fondos mutuos?',
        answers: [
            {text: 'Menos de cuatro meses', value:2},
            {text: 'Entre cuatro y doce meses', value:3},
            {text: 'Más de doce meses', value: 4}
        ]
    },{
        question: 'Selecciona de las siguientes afirmaciones cuál te identifica mejor:',
        answers: [
            {text: 'No estaría dispuesto a invertir si voy a perder', value:1},
            {text: 'Aceptaría un mínimo riesgo si con ello obtengo rentabilidad', value:2},
            {text: 'Estaría dispuesto a asumir una perdida del 10% si puedo ganar 30%', value:3},
            {text: 'Acepto asumir riesgo para obtener rentabilidades mayores', value:4}
        ]
    }, {
        question: 'Ante una baja en tu portafolio de inversiones, ¿Qué harías?',
        answers: [
            {text: 'Me da miedo y retiro todo lo invertido', value:1},
            {text: 'Rescataría solo una parte de lo invertido', value:2},
            {text: 'No retiro nada y espero a que suba', value:3},
            {text: 'Sumo más plata esperando comprar barato', value:4}
        ]
    }, {
        question: 'Si tuvieras que contratar un seguro para tu auto, optaría por:',
        answers: [
            {text: 'Póliza contra todo riesgo, no importa lo cara que sea', value:1},
            {text: 'Póliza únicamente de seguro contra terceros', value:2},
            {text: 'La póliza más barata, aunque su cobertura sea muy pobre', value:3},
            {text: 'No contrato ninguna póliza', value:4}
        ]
    },{
        question: 'Estarías dispuesta/o a asumir una baja en el valor de tus inversiones: ',
        answers: [
            {text: 'No no y no! no quiero perdidas', value:1},
            {text: 'Puede ser máximo 10%', value: 2},
            {text: 'Entre un 11% y 25%', value:3},
            {text: 'Más del 26%', value:4}
        ]
    }
]


// Para la creación del modal
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-bg');




//Cuando se presiona el botón Comenzar
document.querySelector('#start-btn').addEventListener('click', ()=>{
    // Se oculta div de inicio
    document.getElementById('start').style.display = 'none';

    // Se muestra el formulario de preguntas
    document.getElementById('questions').classList.add('visible-q');
    document.getElementById('questions').classList.remove('hidden-q');
    // Se dibuja la primera pregunta
    drawQuestion();
});

// paso actual en las preguntas
let step = 0;

const questionForm = document.querySelector('#question-form');
const nextButton = document.querySelector('#next');

//Función que dibuja la pregunta actual dependiendo del paso
const drawQuestion = ()=>{
    //Se obtiene la información del la pregunta actual
    let data = questions[step];
    //Aquí se verifica si la pregunta existe
    const element = document.getElementById('question-'+step);
    if (!element) {
        //Se crea el div contenedor de las preguntas
        let html = '<div id="question-'+step+'" class="container-q">';
        //Se dibuja la pregunta
        html += '<h3 class="question">'+data.question+'</h3>'+
            '<p>Elige una opción</p>';
        //Se dibujan las respuestas
        for (let i in data.answers){
            let answers = data.answers[i];
            html += '<div class="options">';
            html += `<label>${answers.text}</label>`;
            html += `<input type="radio" name="question${step}" value="${answers.value}">`;
            html += '</div>';
        }

        html += '</div>';

        
        let node = document.createElement('div');
        //Se agrega el contenido al div
        node.innerHTML = html;
        questionForm.appendChild(node);
        //Se deshabilita el boton siguiente 
        nextButton.disabled = true;

    }else {
        document.getElementById('question-'+step).style.display = 'flex';
        
    }

}
//El evento click se agrega al formulario y se le escuha solo los inputs
questionForm.addEventListener('click', (e)=>{
    if(e.target && e.target.nodeName == "INPUT"){
        nextButton.disabled = false;
    }
});

//Cuando el usuario hace click en el boton siguiente
nextButton.addEventListener('click', ()=>{
    if(questions[step+1]){
        //Se oculta la pregunta actual y se aumenta paso en 1
        document.getElementById('question-'+step).style.display = 'none';
        step++;
        //Se dibuja la nueva pregunta
        drawQuestion();
    } else {
        //Se finaliza el formulario
        finishForm();
    }
});


const previousButton = document.querySelector('#previous');
//Cuando se hace click en el boton anterior
previousButton.addEventListener('click', ()=>{
    //Si el paso es mayor que 0
    if (step > 0){
        //se oculta la pregunta actual y se disminuye en 1 paso
        document.getElementById('question-'+step).style.display = 'none';

        step--;
        //se muestra la pregunta anterior
        document.getElementById('question-'+step).style.display = 'flex';
        //Se habilita el boton de siguiente
        nextButton.disabled = false;
        
    }else{
        //Cuando el valor sea 0 se ocultan las preguntas y se muestra el incio
        document.getElementById('questions').classList.add('hidden-q');
        document.getElementById('questions').classList.remove('visible-q');

        document.getElementById('start').style.display = 'flex';

    }
});

// para finalizar se ocultan las preguntas y se abre el modal y se crean los resultados
const finishForm = () => {
    document.getElementById('questions').classList.add('hidden-q');
    document.getElementById('questions').classList.remove('visible-q');
    modalBg.classList.add('bg-active');
    document.getElementById('results').style.display = 'flex';
    //Puntaje del perfil
    let score = 0;
    //Se recuperan los valores de la pregunta seleccionada
    for (let i in questions){
        let userAnswer = document.querySelector('input[name="question'+i+'"]:checked').value;
        score += parseInt(userAnswer);
    }
    
    let heading = document.getElementById('heading-result');
    let result = document.getElementById('text-result');
    let img = document.getElementById('img-result');
    // Perfiles según puntaje
    // 14 a 22 conservador
    // 23 a 31 moderado
    // 32 40 arriesgado
    if (score >= 14 && score <23){
        heading.textContent= 'Tu perfil es CONSERVADOR';
        result.textContent= 'Al igual que Ned Flanders te gusta lo serguro';
        img.src = 'img/flanders.png';
    }else if (score >=23 && score <31){
        heading.textContent = 'Tu perfil es MODERADO';
        result.textContent ='Arriesgas lo justo y necesario';
        img.src = 'img/lisa.png';
    }else{
        heading.textContent = 'Tu perfil es ARRIESGADO';
        result.textContent = 'Vives la vida al limite';
        img.src = 'img/edna.png';
    }
}
