(function(){
  var calendar=document.getElementById("calendar");
  var modal=document.getElementById("modal");
  var title=document.getElementById("modal-title");
  var closeButton=document.getElementById("close");
  var okButton=document.getElementById("ok");
  var activeDoor=null;
  var decorations=["✦","❄","🎄","★","❋","♥"];
  for(var n=1;n<=24;n++){
    (function(number){
      var button=document.createElement("button");
      button.type="button";
      button.className="door";
      button.setAttribute("aria-label","Öppna lucka "+number);
      button.innerHTML='<span class="deco" aria-hidden="true">'+decorations[(number-1)%decorations.length]+'</span><span class="number">'+number+'</span>';
      button.addEventListener("click",function(){
        activeDoor=button;
        title.textContent="Lucka "+number;
        modal.hidden=false;
        document.body.style.overflow="hidden";
        closeButton.focus();
      });
      calendar.appendChild(button);
    })(n);
  }
  function closeModal(){
    modal.hidden=true;
    document.body.style.overflow="";
    if(activeDoor)activeDoor.focus();
  }
  closeButton.addEventListener("click",closeModal);
  okButton.addEventListener("click",closeModal);
  modal.addEventListener("click",function(event){if(event.target===modal)closeModal();});
  document.addEventListener("keydown",function(event){if(event.key==="Escape"&&!modal.hidden)closeModal();});
})();