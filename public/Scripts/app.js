
//IIFE  -  Immidiately Invoked Function Expression

(function (){
    function Start(){
        console.log("App started....");

        let deleteButtons = document.querySelectorAll('.btn-danger');

        for(button of deleteButtons){
            button.addEventListener('click', (event)=>{
                if(!confirm('Are you sure to continue?')){
                    event.preventDefault();
                    window.location.assign('/businesscontact');
                }
            });
        }
    }
    window.addEventListener("load", Start);

})();