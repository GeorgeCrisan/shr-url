function sendUri(){
   let url = document.getElementById('toTransform');
   let value = url.value;
   console.log(value);
  $.post("/new/" + encodeURI(value),(success)=>{
  
          console.log(success + 'received from server and gone to browser');
  })
    .done(()=> { value = null; } )
    
    .fail((err)=> console.log(err))
   
    .always(()=>{console.log('reached always method')});
  
  
  
}