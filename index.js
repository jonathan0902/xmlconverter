const xmlSheet = {
    "P": ["person","firstname","lastname"],
    "T": ["phone","mobile","landline"],
    "A": ["address","street","city","zipcode"],
    "F": ["family","name","born"]
};

const inputText = `P|Carl Gustaf|Bernadotte
T|0768-101801|08-101801
A|Drottningholms slott|Stockholm|10001
F|Victoria|1977
A|Haga Slott|Stockholm|10002
F|Carl Philip|1979
T|0768-101802|08-101802
P|Barack|Obama
A|1600 Pennsylvania Avenue|Washington, D.C`;

function textDevider() {
    const inputTextModify = inputText.split("\n");
    const letter = 0;
    const inputArray = [];
    let textToWrite = "";
    let xmlString = "<people>";
    let checkIfFamilyIsNext = false;
    let getFamily = 0;


    for (let i = 0; i < inputTextModify.length; i++) {
        inputArray.push(inputTextModify[i].split("|"));
    }

    for (let i = 0; i < inputArray.length; i++) {

        if (inputArray[i][letter] === "P" && i !== 0){
            xmlString += "</" + xmlSheet.P[0] + ">"
        }

        for(let j = 0; j < xmlSheet[inputArray[i][letter]].length; j++) {
            textToWrite = xmlSheet[inputArray[i][letter]][j]

            if (j === 0) {
                xmlString += "<" + textToWrite + ">";
            } else {
                xmlString += "<" + textToWrite + ">" + 
                inputArray[i][j] + "</" + textToWrite + ">";
            }

            if (inputArray[i][letter] === "P" && i !== 0){
                checkIfFamilyIsNext = false;
            } else if (inputArray[i][letter] === "F"){
                checkIfFamilyIsNext = true;
                getFamily = i;
            }
   
            if (j === (xmlSheet[inputArray[i][letter]].length - 1)) {
                if (inputArray[i][letter] !== "P" && inputArray[i][letter] !== "F") {
                    xmlString += "</" + xmlSheet[inputArray[i][letter]][0] + ">"
                }
            }

            if ((inputArray[i][letter] === "A" || inputArray[i][0] === "T")){
                if (checkIfFamilyIsNext === true && (xmlSheet[inputArray[i][letter]].length - 1) === j) {
                    xmlString += "</" + xmlSheet[inputArray[getFamily][letter]][0] + ">"
                }
            }
        }
    }
    xmlString += "</person></people>";

    let parser = new DOMParser();
    let finalXML = parser.parseFromString( xmlString, "text/xml");
    console.log(finalXML);
}

textDevider();