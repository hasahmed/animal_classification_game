Object.defineProperty(String.prototype, 'capitalize', {
    value: function(){
        return this.charAt(0).toUpperCase() + this.substring(1)
    }
});
const soundMessage = new Audio('media/sfx/msg.mp3');
const soundWrong = new Audio('media/sfx/please_try_again.mp3');
const soundRight = new Audio('media/sfx/cheer.mp3');


const gameState = {
    loadedAnimal: "",
    animalsSeen: [],
    animalMax: 3,
    animalClass: '',
    reset: function(){
        this.loadedAnimal = '';
        this.animalsSeen = [];
        this.animalMax = 3;
        this.animalClass = '';
    }
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


/**
 * actually has many more audio files than just animal classes,
 * see fillAnimalClassAudioFiles()
 */
const animalClassAudioFiles = {
    playMessage: function(animalClass, callback){
        const beginingAudio = this.pleaseSelect;
        beginingAudio.addEventListener('ended', () =>{
            this.classSound.addEventListener('ended', () =>{
                if (typeof callback !== 'undefined') callback();
            });
            this[animalClass].play();
        });
        beginingAudio.play();
    }
};
/**
 * actually fills animalClassAudioFiles with everything needed to string together the sound files
 * to make the message when an amimal class is pressed
 */
const fillAnimalClassAudioFiles = function(){
    const selectSound = 'please_select';
    const classSound = 'class';
    const soundFilesFolder = 'media/sfx/';
    const soundFileExt = '.mp3';
    animalClassAudioFiles.pleaseSelect = new Audio(soundFilesFolder + selectSound + soundFileExt);
    animalClassAudioFiles.classSound = new Audio(soundFilesFolder + classSound + soundFileExt);
    for (animalClass in animalClasses){
        animalClassAudioFiles[animalClass] = new Audio(soundFilesFolder + animalClass + soundFileExt);
        animalClassAudioFiles[animalClass].addEventListener('ended', () =>{
            animalClassAudioFiles.classSound.play();
        });
        animalClasses[animalClass].forEach((animal) => {
            animalClassAudioFiles[animal] = new Audio(soundFilesFolder + animal + soundFileExt);
        });
    }
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
    imgTag.addEventListener("click", () => animalClassSelectionHandler(animalClassName.toLowerCase()));
    imgWrapper.appendChild(imgTag);

    const ptag = document.createElement("p");
    const textNode = document.createTextNode(animalClassName);
    ptag.appendChild(textNode);
    ptag.className = ptagClass;
    imgWrapper.appendChild(ptag);
    return imgWrapper;
};

const selectNextAnimal = function(animalClass) {
    const imgId = "display-animal";
    const view = document.getElementById("game-view");
    const loadedAnimal = document.getElementById(imgId);
    if (loadedAnimal)
        view.removeChild(loadedAnimal);
    const imgElement = document.createElement("img");
    imgElement.id = imgId;
    if (gameState.animalsSeen.length >= gameState.animalMax)
        return false;
    let randAnimal;
    do {
        randAnimal = getRandomAnimal(animalClass);
    } while (randAnimal === gameState.loadedAnimal || $.inArray(randAnimal, gameState.animalsSeen) !== -1);
    gameState.loadedAnimal = randAnimal;
    gameState.animalsSeen.push(randAnimal);
    imgElement.src = getAnimalClassSubFolder(animalClass) + randAnimal + ext;
    view.appendChild(imgElement);
    return true;
};

const animalClassSelectionHandler = function(animalClass){
    const body = document.getElementsByTagName("body")[0];
    body.style.pointerEvents = 'none';
    animalClassAudioFiles.playMessage(animalClass, () => {
        selectNextAnimal(animalClass);
        appendOptionsElements(createOptionsElements(animalClass));
        body.style.pointerEvents = 'auto';
        gameState.animalClass = animalClass;
    });
};

const getRandomAnimal = (animalClass) => animalClasses[animalClass][randIndex(animalClass)];
const randIndex = (animalClass) => Math.floor(Math.random() * (animalClasses[animalClass].length));

const playMsg = function(){
    soundMessage.play();
};

const hideClasses = () => {
    $(".animal-image-wrapper").css('display', 'none');
    document.getElementById('play-button').style.display = 'none';
};
const unhideClasses = () => {
    $(".animal-image-wrapper").css('display', '');
    document.getElementById('play-button').style.display = 'inline-block';
    deleteOptionsElements();
};

const createOptionsElements = function(animalClass){
    const btntagClass = 'option-button';
    const options = animalClasses[animalClass];
    const createdElements = [];

    options.forEach(function(animal){
        const btntag = document.createElement("button");
        const textNode = document.createTextNode(animal.toUpperCase());
        btntag.appendChild(textNode);
        btntag.className = btntagClass;
        btntag.addEventListener("click", () => optionClickHandler(animal));
        btntag.addEventListener("mouseover", () =>{
          animalClassAudioFiles[animal].play();
        });
        createdElements.push(btntag);
    });
    return createdElements;
};

const deleteOptionsElements = function(){
    const parent = document.getElementById('animal-class-wrapper');
    const btntagClass = 'option-button';
    const options = document.getElementsByClassName(btntagClass);
    while(options[0])
        parent.removeChild(options[0]);
};

const appendOptionsElements = function(optionElements) {
    const parent = document.getElementById('animal-class-wrapper');
    hideClasses();
    optionElements.forEach(function(ele){
        parent.appendChild(ele);
    });
};

const playAudioAndDisableClicksThenDoAction = function(audioObject, callback){
    const body = document.getElementsByTagName("body")[0];
    body.style.pointerEvents = 'none';
    audioObject.addEventListener('ended', () => {
        body.style.pointerEvents = 'auto';
        if (typeof callback !== 'undefined') {
            callback();
        }
    });
    audioObject.play();
};

const optionClickHandler = function(option){
    if (option !== gameState.loadedAnimal)
        soundWrong.play();
    else {
        playAudioAndDisableClicksThenDoAction(soundRight, function(){
            if (!selectNextAnimal()) {
                unhideClasses();
                gameState.reset();
            }
        });
    }
};


const appendAnimalClassImgs = function(){
    const animalClassContainer = document.getElementById("animal-class-wrapper");
    for (let animalClass in animalClasses){
        animalClassContainer.appendChild(animalClassElement(animalClass));
    }
    fillAnimalClassAudioFiles();
};