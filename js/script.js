document.addEventListener("DOMContentLoaded",function(){
    const submitForm = document.getElementById("form");
    submitForm.addEventListener("submit",function(event){
        event.preventDefault();
        addBookList();
    });

    if(isStorageExist())
    {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved",()=>{
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded",()=>{
    refreshDataFromBooks();
});