document.getElementById("send").addEventListener("click", function(event){
  
    event.preventDefault();
    sendUri();
});

function sendUri(){

   let url = document.getElementById('toTransform');
   let value = url.value;
   console.log(value);
  $.post("/new/" + encodeURI(value),(success)=>{
  
          console.log(success + 'received from server and gone to browser');
    $('#output').html(success);
  })
    .done(()=> { value = null; } )
    
    .fail((err)=> console.log(err))
   
    .always(()=>{console.log('reached always method')});
  
   return false;
  
}