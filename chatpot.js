var questionNum = 0;													// garder le compte de la question, utilisé pour la condition IF
var question = '<h1>what is your name?</h1>';				  // premiere question

const MULTIPLE_CHOICE_TYPE = 'CHOICE-MULPLE';
const TWO_CHOICE_TYPE = 'TWO-CHOICE';
const INPUT_TYPE = 'INPUT';

const buildContentForm = (dial) => {
  var form$ = `<label for="covid-ask">${dial.question}</label>\n`
  
  if (dial.type === INPUT_TYPE) {
    form$ += `<input id="covid-ask" type="text" name="" value=""/>\n`;
    
    form$ += `<button id="response" class="btn">Valider</button>`;
  } else if (dial.type === MULTIPLE_CHOICE_TYPE || dial.type === TWO_CHOICE_TYPE) {
    dial.choices.forEach(choice => {
      form$ += `<button id="response" class="btn">${choice}</button>\n`;
    });
  } else {
    alert('Unknow !');
  }
  return form$;
}

const buildForm = (html, id, class$='fadeIn') => {
  const form$ = document.querySelector('.h-form');
  
  form$.innerHTML = `<div class="${id} ${class$}">${html}</div>`;
}

const traitResponse = (item, element, clickedButton) => {
  var response = '';
  if (item.type === INPUT_TYPE) {
    response = element.querySelector('input').value;
  } else {
    response = clickedButton.innerHTML;
  }

  item.response = response;

  return response;
}


const dialog = [
  {
    id: 'id-3',
    type: TWO_CHOICE_TYPE,
    question: 'Avez-vous parcouru la liste de nos formations ?',
    choices: ['Oui', 'Non'],
    response: '',
  },
  {
    id: 'id-1',
    type: INPUT_TYPE,
    question: 'Et laquelle vouliez-vous suivre ?',
    response: '',
  },
  {
    id: 'id-2',
    type: INPUT_TYPE,
    question: 'Veuillez indiquer votre statut : Etudiant, Professionnel',
    response: '',
  },
  {
    id: 'id-4',
    type: MULTIPLE_CHOICE_TYPE,
    question: 'Veuillez vous inscrire en cliquant sur la formation correspondante ?',
    choices: ['liste formations', 'rechercher formation'],
    response: '',
  },
];

/**
 * Créer un écouteur pour écouter et enregistrer le choix d'utilisation
 * 
 * @param {any} item 
 * @param {HTMLElement} form html elements contents the form
 * @param {HTMLElement[]} choices all buttons use as a possible choice of user
 */
const addListerner = (item, form, choices) => {
  choices.forEach(choice => {
    choice.addEventListener('click', () => {
      oldResponseEl.innerHTML = traitResponse(item, form, choice);
      form.classList.remove('fadeIn');
      form.classList.remove('fadeBack');
      form.classList.add('fadeOut');
      
      /* nous allons passer à la question suivante */
      currentQuestionIndex++;
      setTimeout(() => nextQuestion(), 1000);
    });
  });
}

/**
 * Créer et afficher la question suivante dans la liste de dialogue
 * @param {String} animationDirection utiliser pour faire de l'animation
 */
const nextQuestion = (animationDirection = 'fadeIn')  => {
  if (currentQuestionIndex < dialog.length) {
    const dial = dialog[currentQuestionIndex];
    
    const htmlForm = buildContentForm(dial);
    buildForm(htmlForm, dial.id, animationDirection);
    
    const form = document.querySelector(`.${dial.id}`);
    const choices = form.querySelectorAll('#response');
    
    addListerner(dial, form, choices);
  }
}

/**
 * Aller à la question précédente
 */
const prevQuestion = ()  => {
  /* si nous avons déjà répondu à au moins une question */
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;

    oldResponseEl.innerHTML = (currentQuestionIndex == 0) ? '' : dialog[currentQuestionIndex - 1].response;

    nextQuestion('fadeBack');
  }
}

/* écoutez le paragraphe qui a la réponse précédente */
const oldResponseEl = document.getElementById('old-response');

/* l'index que nous voulons commencer à poser des questions */
var currentQuestionIndex = 0;

/* commencer à poser des questions */
nextQuestion();

/* écouter si l'utilisateur veut revenir en arrière */
oldResponseEl.addEventListener('click', () => prevQuestion());