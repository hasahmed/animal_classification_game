Object.defineProperty(String.prototype, 'capitilize', {
    value: function(){
        return this.charAt(0).toUpperCase() + this.substring(1)
    }
});
const soundMessage = new Audio('media/sfx/msg.mp3');
const soundWrong = new Audio('media/sfx/wrong.mp3');
const soundRight = new Audio('media/sfx/cheer.mp3');

const gameState = {
    loadedAnimal:"",
};

const animalClasses = {
    amphibians: [],
    arthropods: [],
    birds: [],
    fish: [],
    mammals: [
        "dog",
        "cow",
        "cat"
    ],
    reptiles: []
};

const animalClassesFolder = "media/animal_classes/";
const ext = ".jpg";

const getAnimalClassSubFolder = (animalClass) => animalClassesFolder + animalClass + "/";

const getFileName = function(animalClass) {
    return animalClassesFolder + animalClass + ext;
};

const animalClassElement = function(animalClass) {
    const ptagClass = 'animal-class-image-text';
    const animalImageClass = 'animal-class-image';


    const fileName = getFileName(animalClass);
    let animalClassName = animalClass.toUpperCase();
    const imgWrapper = document.createElement("div");
    imgWrapper.className = 'animal-image-wrapper';

    const imgTag = document.createElement("img");
    imgTag.className = animalImageClass;
    imgTag.src = fileName;
    imgTag.addEventListener("click", ()=>loadAnimal(animalClassName.toLowerCase()));
    imgWrapper.appendChild(imgTag);

    const ptag = document.createElement("p");
    const textNode = document.createTextNode(animalClassName);
    ptag.appendChild(textNode);
    ptag.className = ptagClass;
    imgWrapper.appendChild(ptag);
    return imgWrapper;
};


const loadAnimal = function(animalClass){
    const imgId = "display-animal";
    const view = document.getElementById("game-view");
    const loadedAnimal = document.getElementById(imgId);
    if (loadedAnimal)
        view.removeChild(loadedAnimal);
    const imgElement = document.createElement("img");
    imgElement.id = imgId;
    let randAnimal;
    do {
        randAnimal = getRandomAnimal(animalClass);
    } while(randAnimal === gameState.loadedAnimal);
    gameState.loadedAnimal = randAnimal;
    imgElement.src = getAnimalClassSubFolder(animalClass) + randAnimal + ext;
    view.appendChild(imgElement);
    appendOptionsElements(createOptionsElements(animalClass));
};

const getRandomAnimal = (animalClass) => animalClasses[animalClass][randIndex(animalClass)];
const randIndex = (animalClass) => Math.floor(Math.random() * (animalClasses[animalClass].length));

const playMsg = function(){
    soundMessage.play();
};

const hideClasses = () => $(".animal-image-wrapper").css('display', 'none');
const unhideClasses = () => $(".animal-image-wrapper").css('display', '');


// const createOptionsElements = function(animalClass){
//     const ptagClass = 'options';
//     // const divtagClass= 'option-wrapper';
//
//     const options = animalClasses[animalClass];
//     const createdElements = [];
//
//     options.forEach(function(opt){
//         const ptag = document.createElement("p");
//         const textNode = document.createTextNode(opt.capitilize());
//         ptag.appendChild(textNode);
//         ptag.className = ptagClass;
//         ptag.addEventListener("click", () => optionClickHandler(opt));
//         createdElements.push(ptag);
//     });
//     return createdElements;
// };
const createOptionsElements = function(animalClass){
    const btntagClass = 'option-button';
    const options = animalClasses[animalClass];
    const createdElements = [];

    options.forEach(function(opt){
        const btntag = document.createElement("button");
        const textNode = document.createTextNode(opt.toUpperCase());
        btntag.appendChild(textNode);
        btntag.className = btntagClass;
        btntag.addEventListener("click", () => optionClickHandler(opt));
        createdElements.push(btntag);
    });
    return createdElements;
};

const appendOptionsElements = function(optionElements) {
    const parent = document.getElementById('animal-class-wrapper');
    hideClasses();
    optionElements.forEach(function(ele){
        parent.appendChild(ele);
    });
};


const optionClickHandler = function(option){
    console.log(option);
};

const appendAnimalClassImgs = function(){
    const animalClassContainer = document.getElementById("animal-class-wrapper");
    for (let animalClass in animalClasses){
        animalClassContainer.appendChild(animalClassElement(animalClass));
    }
};