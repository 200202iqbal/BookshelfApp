const UNCOMPLETED_LIST_BOOK_ID = "uncomplete-read";
const COMPLETED_LIST_BOOK_ID = "complete-read";
const BOOK_ID = "bookId"

function addBookList(){
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const id = timestamp();
    const textTitle = document.getElementById("titleBooks").value;
    const textAuthor = document.getElementById("authorBooks").value;
    const numbYear = document.getElementById("yearBooks").value;
    const isCompleteElement = checkBoxStatus();
    
    const book = makeList(textTitle,textAuthor,numbYear,isCompleteElement);
    const bookObject = composeBookObject(id,textTitle,textAuthor,numbYear,isCompleteElement);

    book[BOOK_ID] = bookObject.id;
    books.push(bookObject);

    if(isCompleteElement)
    {
        completedBOOKList.append(book);
        updateDataToStorage();

    }else
    {
        uncompletedBOOKList.append(book);
        updateDataToStorage();
    }
    
}
function checkBoxStatus()
{
    const isComplete = document.getElementById("iscomplete");
    if(isComplete.checked)
    {
        return true;
    }else
    {
        return false;
    }
}

function timestamp()
{
    const timestampVar = new Date();
    const yearVar = timestampVar.getFullYear().toString();
    const monthVar = timestampVar.getMonth().toString();
    const dayVar = timestampVar.getDay().toString();
    const hourVar = timestampVar.getHours().toString();
    const secondVar = timestampVar.getSeconds().toString();

    return yearVar+monthVar+dayVar+hourVar+secondVar;
}

function makeList(Title,Author,Year,isCompleted)
{
    const textTitle = document.createElement("h2");
    textTitle.innerHTML = Title;

    const textAuthor = document.createElement("p");
    textAuthor.id ="author"
    textAuthor.innerHTML = Author;

    const numberYear = document.createElement("p");
    numberYear.id ="year";
    numberYear.innerHTML = Year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle,textAuthor,numberYear);

    if(isCompleted)
    {
        textContainer.append(
            createNotYetButton(),
            createDeleteButton());   
    }else
    {
        textContainer.append(
            createOKButton(),
            createDeleteButton());
    }

    const container = document.createElement("div");
    container.classList.add("item","shadow");
    container.append(textContainer);
    
    return container;
}

function createButton(buttonTypeClass,eventListener,textButton)
{
    const button = document.createElement("button");
    button.innerText = textButton;
    button.classList.add(buttonTypeClass);
    button.addEventListener("click",function(event){
        eventListener(event);
    });
    return button;
}

function addBookToCompleted(taskElement)
{
    // fungsi untuk memindahkan book dari belum selesai menjadi sudah selesai
    const textTitle = taskElement.querySelector(".inner > h2").innerText;
    const textAuthor = taskElement.querySelector(".inner > #author").innerText;
    const numberYear = taskElement.querySelector(".inner > #year").innerText;

    const newBook = makeList(textTitle,textAuthor,numberYear,true);
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const book = findBook(taskElement[BOOK_ID]);
    book.isComplete = true;
    newBook[BOOK_ID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function undoBookFromCompleted(taskElement)
{
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const textTitle = taskElement.querySelector(".inner > h2").innerText;
    const textAuthor = taskElement.querySelector(".inner > #author").innerText;
    const numberYear = taskElement.querySelector(".inner > #year").innerText;
    const newBook = makeList(textTitle,textAuthor,numberYear,false);

    const book = findBook(taskElement[BOOK_ID]);
    book.isComplete = false;
    newBook[BOOK_ID] = book.id;
    listUncompleted.append(newBook);

    taskElement.remove();
    updateDataToStorage();
}
function createOKButton()
{
    
    return createButton("ok-button",function(event){
        
        addBookToCompleted(event.target.parentElement.parentElement);
        
    },"Sudah dibaca");
}
function createNotYetButton()
{
    return createButton("notyet-button",function(event){
        
        undoBookFromCompleted(event.target.parentElement.parentElement);
        
    },"Belum dibaca");
}
function createDeleteButton()
{
     return createButton("delete-button", function(event){
     
         removeBookfromBookshelf(event.target.parentElement.parentElement);
     },"Hapus Buku");
}

function removeBookfromBookshelf(taskElement)
{
    const bookPosition = findBookIndex(taskElement[BOOK_ID]);
    books.splice(bookPosition,1);
    updateDataToStorage();
    taskElement.remove();
}