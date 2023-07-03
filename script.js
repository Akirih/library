
let popup = `<div class="add--book--popup--fade">
<div class="add--book--container">
    <div class="add--book--form">
        <form id="add--form">
            <h1>Add new book</h1>
            <div> 
                <p><label for="form--book--name">Name:</label></p>
                <input type="text" id="form--book--name" maxlength="18" placeholder="Max 18 characters" required class="form--element">
            </div> 
            <div>  
                <p><label for="form--book--author">Author:</label> </p>
                <input type="text" id="form--book--author" maxlength="18" placeholder="Max 18 characters" required class="form--element">
            </div>
            <div>
                <p><label for="form--book--year">Release Year:</label></p>
                <input type="number" id="form--book--year" min="1700" max="2030" placeholder="1700-2030" required class="form--element">
            </div>
            <div class="form--progress--container">
                <label class="progress--label">Progress</label>
                <div class="progress--bar">
                    <div class="progress--reading" onclick="progressUpdate.call(this, 1);getElementById('form--radio--not-started').checked = true">
                        <input type="radio" id="form--radio--not-started" name="form--radio--status" value="Not Started">
                    </div>
                    <div class="progress--on-hold" onclick="progressUpdate.call(this, 2);document.getElementById('form--radio--started').checked = true;">
                        <input type="radio" id="form--radio--started" name="form--radio--status" value="Reading">
                    </div>
                    <div class="progress--finished" onclick="progressUpdate.call(this, 3);document.getElementById('form--radio--finished').checked = true">
                        <input type="radio" id="form--radio--finished" name="form--radio--status" value ="Finished">
                       
                    </div>                            
                </div>
            </div>
            <p class="form--required--warning">* all fields required</p>
            <div class="form--button--container">
                <input type="button" id="submit--button" value="Add" class="form--button button--add">
                <input type="button" id="cancel--button" value="Cancel" class="form--button button--cancel">
            </div>
        </form>
    </div>
</div>
</div>`;

let myLibrary = [];

function addBook(){

    const book = {
        name: document.getElementById('form--book--name').value, 
        author: document.getElementById('form--book--author').value,
        year: document.getElementById('form--book--year').value,
        progress: document.querySelector('input[name="form--radio--status"]:checked').value
    }
    myLibrary.push(book);
    document.querySelector('.add--book--popup--fade').remove();
    displayBook();
}

function removeBook () {
    myLibrary.splice(this.dataset.index,1);
    this.parentNode.parentNode.parentNode.remove();
    displayBook();
}

function displayBook(){    
    let i = 0;
    const addButton = document.querySelector('.book--add');
    while (addButton.previousSibling) addButton.previousSibling.remove();

    for (; i< myLibrary.length; i++){

        let aColor;
        let bColor;
        let cColor;

        if (myLibrary[i].progress == 'Not Started') {aColor = 'red';}
        else if (myLibrary[i].progress == 'Reading') {bColor = 'yellow';}
        else if (myLibrary[i].progress == 'Finished') {cColor = bColor = aColor = 'green';}

        document.getElementById('book--list--container').insertAdjacentHTML("afterbegin", `
        <div class="book--card">
            <div class="book-details">
                <h2 class="book--author">${myLibrary[i].name}<img src="img/x-circle.svg" class="remove--button" data-index="${i}"></h2>
                <div class="author--details">
                    <p>${myLibrary[i].author}</p>
                    <p>${myLibrary[i].year}</p>
                </div>
            </div>
            <div class="book--progress">
                <div class="progress--bar">
                    <div class="progress--reading" style="background-color:${aColor};" onclick="progressUpdateRealTime.call(this, 1);" data-index="${i}"></div>
                    <div class="progress--on-hold" style="background-color:${bColor};" " onclick="progressUpdateRealTime.call(this, 2);" data-index="${i}"></div>
                    <div class="progress--finished" style="background-color:${cColor};" " onclick="progressUpdateRealTime.call(this, 3);" data-index="${i}"></div>
                </div>
                <p class="progress--text">${myLibrary[i].progress}</p>
            </div>
            </div>
        `);
    }
    addDelete();
}


function progressUpdate (progress){
    parent = this.parentNode;
    Array.from(parent.children).forEach( children => children.style.backgroundColor = '')
    if (progress == 1){ 
        this.style.backgroundColor = 'red';
    } else if (progress == 2){
        this.style.backgroundColor = 'yellow';
    } else {
        Array.from(parent.children).forEach( children => children.style.backgroundColor = 'green')
    }
}

function progressUpdateRealTime (progress){
    parent = this.parentNode;
    Array.from(parent.children).forEach( children => children.style.backgroundColor = '')
    if (progress == 1){ 
        this.style.backgroundColor = 'red';
        myLibrary[this.dataset.index].progress = 'Not Started';
    } else if (progress == 2){
        this.style.backgroundColor = 'yellow';
        myLibrary[this.dataset.index].progress = 'Reading';
    } else {
        Array.from(parent.children).forEach( children => children.style.backgroundColor = 'green')
        myLibrary[this.dataset.index].progress = 'Finished';
    }    
    displayBook();
}

document.querySelector('.book--add').addEventListener('click', openPopup);
document.addEventListener('DOMContentLoaded', addDelete);

function addDelete(){
    const delButton = document.querySelectorAll('.remove--button');
    delButton.forEach(but => but.addEventListener('click', removeBook));
}

function openPopup(){
    document.body.insertAdjacentHTML("beforeend", popup);
    document.getElementById('submit--button').addEventListener('click', addBook);
    document.querySelector('.button--cancel').addEventListener('click', () => {
        document.querySelector('.add--book--popup--fade').remove();        
    } )
}

