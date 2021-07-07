const str1 = '<div class="card r1 shadow ani"><img src="'; //img
const str2 = '"><div class="back-box"></div><h1 style="margin-left:15px;" class="name">'; //name
const str3 = '</h1><h1 style="margin-left:93%;">></h1></div>';

function add(img, name) {
$('.addHere').append(str1 + img + str2 + name + str3);
}

function filter(){
       var value, name, item, i;
       value = document.getElementById("sc").value.toUpperCase();
       item = document.getElementsByClassName("card");

       for(i=0;i<item.length;i++){
         name = item[i].getElementsByClassName("name");
         if(name[0].innerHTML.toUpperCase().indexOf(value) > -1){
           item[i].style.height = "80px";
           item[i].style.opacity = "1";
           item[i].style.marginTop = "20px";
         }else{
           item[i].style.height = "0px";
           item[i].style.opacity = "0";
           item[i].style.marginTop = "0px";
         }
       }
     }

     $(document).on('keyup', filter());


firebase.database().ref('BOOTH/').once('value').then((snapshot) => {
$.each(snapshot.val(), function(key, value) {
  add(value['IMG'], value['NAME']);
});
});
