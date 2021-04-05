const endPoint = "end";

for (let i = 0; true; i++) {
    let postFile = "Entries/post" + i + ".txt";
    if (doesFileExist(postFile))
        readFromFile(i, postFile);
    else
        break;
    
    if (i > 100)
        break;
}

function doesFileExist(urlToFile)
{
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        //console.log("File doesn't exist");
        return false;
    } else {
        //console.log("File exists");
        return true;
    }
}

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

function readFromFile(i, postFile) {
    fetch(postFile).then(r=>r.text()).then(t=>{
        let paragraphs = t.split('\n');
        for (let i = paragraphs.length-1; i>-1; i--){
            if (!isLetter(paragraphs[i])) {
                paragraphs.splice(i, 1);
            }
        }

        createPost(i, paragraphs);
    })
}

function createPost(i, text) {
    let newPost = addElement('section', "post");
    let newTitle = addElement("header", "title");
    let newArticle = addElement("article", "body"); 
    
    let newH3 = addElement("h3", "", text[0]);
    let newDiv1 = addElement("div", "", "Post: " + i);
    let newDiv2 = addElement("div", "", text[1]);
    let newDiv3 = addElement("div", "", text[2]);
    
    newPost.appendChild(newTitle);
    newPost.appendChild(newArticle);
    
    newTitle.appendChild(newH3);
    newTitle.appendChild(newDiv1);
    newTitle.appendChild(newDiv2);
    newTitle.appendChild(newDiv3);
    
    for (let i = 3; i < text.length; i++) {
        let newP = addElement("p", "", text[i]);
        newArticle.appendChild(newP);
    }
    
    let currentDiv = document.getElementById(endPoint);
    document.body.insertBefore(newPost, currentDiv);
}

function addElement(tag, className = "", text = "") {
    let newEl = document.createElement(tag);
    if (className !== "")
        newEl.className = className;
    if (text !== "") {
        let t = document.createTextNode(text);
        newEl.appendChild(t);
    }
    return newEl;
}
