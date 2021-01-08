console.log("Javascript file loaded");


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');


weatherForm.addEventListener("submit",(event)=>{
    //Stop to refresh the browser after submitting the form.
    event.preventDefault();
    const location = search.value;
    message1.textContent = "Loading...";
    message2.textContent = "";
    console.log('location = ' + location)
    if(location){
        fetch('http://localhost:3000/weather?address=' + location).then((response)=>{

            response.json().then((data)=>{
                if(data.error){
                    console.log(data.error);
                    paragraph1.textContent = data.error;
                }
                else{
                    message1.textContent = data.forecast;
                    message2.textContent = data.location;
                    //console.log(data.address);
                }
            });
        })  
    }
})
