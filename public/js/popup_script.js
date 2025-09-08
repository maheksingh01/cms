/******************************************* Popup Functionality ***************************************/ 

document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("popup_btn")){
        toggleProjectPopup();
        const to = complainDetails(e.target.parentElement.parentElement.parentElement.parentElement);
    }
});


document.querySelector(".project-popup-close").addEventListener("click", toggleProjectPopup);


function toggleProjectPopup(){
    document.querySelector(".popup").classList.toggle("open");
}


function complainDetails(complainItem){
    document.querySelector(".popup-img img").src=complainItem.querySelector(".clicked_tr img").src;
    document.querySelector(".popup-detail p").innerHTML=complainItem.querySelector(".clicked_tr .complainText_td").innerHTML;
}



/************************************* Resolve btn ****************************************/
// const resolveBtn = document.querySelector(".resolveBtn");

// resolveBtn.addEventListener("click", ()=> {
//     resolveBtn.classList.add("col");
// })


