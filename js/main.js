const soundMessage = new Audio('media/msg.mp3');
const animalClasses = [
    "amphibians",
    "arthropods",
    "birds",
    "fish",
    "mammals",
    "reptiles"
];
const mammals = [
    "dog",
    "cow",
    "cat"
];



const folder = "media/animal_classes/";
const ext = ".jpg";

const getFileName = function(index) {
    return folder + animalClasses[index] + ext;
};

const animalClassElement= function (index) {
    const ptagClass = 'animal-class-image-text';
    const animalImageClass = 'animal-class-image';


    const fileName = getFileName(index);
    let animalClassName = animalClasses[index].toUpperCase();
    const imgWrapper = document.createElement("div");
    imgWrapper.className = 'animal-image-wrapper';

    const imgTag = document.createElement("img");
    imgTag.className = animalImageClass;
    imgTag.src = fileName;
    imgTag.onclick = function(){
        loadAnimal(animalClassName.toLowerCase());
    };

    imgWrapper.appendChild(imgTag);

    const ptag = document.createElement("p");
    const textNode = document.createTextNode(animalClassName);
    ptag.appendChild(textNode);
    ptag.className = ptagClass;
    imgWrapper.appendChild(ptag);
    return imgWrapper;
};


const loadAnimal = function(animalClass){
    console.log(animalClass);
};


const playAudio = function(){
    soundMessage.play();
};


const appendAnimalClassImgs = function(){
    const animalClassContainer = document.getElementById("animal-class-wrapper");
    for (let i = 0; i < animalClasses.length; i++) {
        animalClassContainer.appendChild(animalClassElement(i));
    }
};