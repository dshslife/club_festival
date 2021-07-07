function filter(){
       var value, name, item, i;
       value = document.getElementById("sc").value.toUpperCase();
       item = document.getElementsByClassName("rcard");

       for(i=0;i<item.length;i++){
         name = item[i].getElementsByClassName("name");
         if(name[0].innerHTML.toUpperCase().indexOf(value) > -1){
           item[i].style.height = "60px";
           item[i].style.opacity = "1";
           item[i].style.marginTop = "20px";
         }else{
           item[i].style.height = "0px";
           item[i].style.opacity = "0";
           item[i].style.marginTop = "0px";
         }
       }
     }
