(function(){
"use strict";
var SAVE_KEY="julmysteriet-save-v1";
var puzzles={
1:{next:7,title:"Fotspår i nysnön",story:"Bakom verkstaden hittar du sju små bjällror i en rad. En av dem klingar när du rör vid den.",question:"Räkna bjällrorna som gömmer sig i ledtråden. Vilken lucka ska du leta efter?",hint:"Ledtråden säger hur många bjällror det finns.",answer:["7","sju"]},
7:{next:3,title:"Nissens hemliga lapp",story:"En liten nisse har lämnat ett meddelande: två röda äpplen och ett till i fickan.",question:"Hur många äpplen har nissen sammanlagt? Öppna luckan med det numret.",hint:"Lägg ihop 2 + 1.",answer:["3","tre"]},
3:{next:12,title:"Stjärnornas karta",story:"På himlen ovanför stallet glimmar fyra grupper med tre stjärnor i varje.",question:"Hur många stjärnor glimmar det tillsammans?",hint:"Fyra grupper med tre: 3 + 3 + 3 + 3.",answer:["12","tolv"]},
12:{next:5,title:"Pepparkakans hemlighet",story:"Bagaren bakade åtta pepparkakor. Tomten åt tre innan någon hann se.",question:"Hur många pepparkakor finns kvar?",hint:"Räkna 8 minus 3.",answer:["5","fem"]},
5:{next:19,title:"Renens bjällror",story:"Rudolf har tjugo bjällror på selen. En bjällra lossnar och rullar bort i snön.",question:"Hur många bjällror sitter fortfarande kvar?",hint:"Tjugo minus en.",answer:["19","nitton"]},
19:{next:2,title:"Två paket",story:"Under granen ligger ett paket med en blå rosett och ett med en röd.",question:"Hur många paket ligger under granen?",hint:"Ett paket + ett paket.",answer:["2","två"]},
2:{next:14,title:"Vinterhimlens måne",story:"Nissen ser två händer på en klocka. Varje hand pekar på sju små snöflingor på kartan.",question:"Två gånger sju – vilket nummer söker du?",hint:"7 + 7.",answer:["14","fjorton"]},
14:{next:8,title:"Åtta små ljus",story:"I fönstret brinner fem ljus. Mormor tänder tre till så att rummet blir varmt och ljust.",question:"Hur många ljus brinner nu?",hint:"Fem plus tre.",answer:["8","åtta"]},
8:{next:21,title:"Julgranskulorna",story:"Tre små grenar har sju glittrande kulor var. Granen väntar på att bli färdigklädd.",question:"Hur många kulor finns på de tre grenarna tillsammans?",hint:"Tre gånger sju.",answer:["21","tjugoett","tjugoen"]},
21:{next:4,title:"Fyra frusna fönster",story:"I det gamla huset lyser fyra fönster. Alla andra är täckta av snö.",question:"Hur många fönster lyser?",hint:"Svaret står redan gömt i berättelsen.",answer:["4","fyra"]},
4:{next:16,title:"Tomtens säck",story:"Tomten har fyra små säckar med presenter. I varje säck ligger fyra paket.",question:"Hur många paket finns det totalt?",hint:"Fyra gånger fyra.",answer:["16","sexton"]},
16:{next:10,title:"Den halva kakan",story:"En pepparkaka har 20 små stjärnor på sig. Nissen äter hälften.",question:"Hur många stjärnor är kvar?",hint:"Hälften av 20.",answer:["10","tio"]},
10:{next:23,title:"Slädens bjällror",story:"På släden sitter en rad med tolv bjällror och en rad med elva. De sjunger i vintervinden.",question:"Hur många bjällror sitter där sammanlagt?",hint:"Tolv plus elva.",answer:["23","tjugotre"]},
23:{next:6,title:"Snölyktorna",story:"Utanför stugan står nio snölyktor. Tre slocknar i vinden.",question:"Hur många lyktor lyser fortfarande?",hint:"Nio minus tre.",answer:["6","sex"]},
6:{next:18,title:"De magiska snöflingorna",story:"Tre fönster fångar sex snöflingor var på sina frostiga rutor.",question:"Hur många snöflingor ser du på alla fönstren?",hint:"Tre gånger sex.",answer:["18","arton"]},
18:{next:11,title:"Elva nissar",story:"I verkstaden jobbar fem nissar vid ett bord och sex vid ett annat.",question:"Hur många nissar arbetar i verkstaden?",hint:"Fem plus sex.",answer:["11","elva"]},
11:{next:9,title:"Den gömda chokladen",story:"Det finns femton chokladbitar i skålen. Sex delas ut till hjälpsamma nissar.",question:"Hur många chokladbitar är kvar?",hint:"Femton minus sex.",answer:["9","nio"]},
9:{next:20,title:"Två snälla renar",story:"Varje ren har tio morötter i sin matskål. Två renar väntar på middag.",question:"Hur många morötter finns det tillsammans?",hint:"Två gånger tio.",answer:["20","tjugo"]},
20:{next:13,title:"Tretton paketband",story:"På bordet ligger sjutton röda band. Fyra används till paket.",question:"Hur många band ligger kvar?",hint:"Sjutton minus fyra.",answer:["13","tretton"]},
13:{next:22,title:"Julmarknadens mynt",story:"Du hittar elva guldmynt i en låda och elva i en annan.",question:"Hur många guldmynt har du hittat?",hint:"Elva plus elva.",answer:["22","tjugotvå"]},
22:{next:15,title:"De femton klockslagen",story:"Kyrkklockan slår tre gånger fem slag för att kalla alla till julmarknaden.",question:"Hur många slag hörs det?",hint:"Tre gånger fem.",answer:["15","femton"]},
15:{next:17,title:"Nissens paketstapel",story:"En stapel har tjugo paket. Nissen bär bort tre paket till släden.",question:"Hur många paket står kvar?",hint:"Tjugo minus tre.",answer:["17","sjutton"]},
17:{next:24,title:"Sista steget före julafton",story:"Du ser fyra rader med sex små ljus framför den stora dörren.",question:"Hur många ljus visar vägen till den sista luckan?",hint:"Fyra gånger sex.",answer:["24","tjugofyra"]},
24:{final:true,title:"Julstjärnans sista hemlighet",story:"Du har hittat den sista luckan. Inuti ligger en sista fråga – den som kan få julstjärnan att lysa igen.",question:"Jag glimmar i toppen av granen, har spetsar och lyser i natten. Vad är jag?",hint:"Det är det som sitter allra högst upp i granen.",answer:["stjärna","en stjärna","julstjärna","stjärnan"]}
};
var $=function(id){return document.getElementById(id);};
var save=loadSave(),activeDoor=null,hintShown=false,toastTimer;
function loadSave(){try{var d=JSON.parse(localStorage.getItem(SAVE_KEY));if(d&&Array.isArray(d.solved)&&d.solved.indexOf(1)!==-1)return{solved:Array.from(new Set(d.solved.filter(function(n){return puzzles[n]}))),unlocked:Array.from(new Set((d.unlocked||[1]).filter(function(n){return puzzles[n]})))};}catch(e){}return{solved:[],unlocked:[1]};}
function persist(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(save));}catch(e){}}
function isUnlocked(n){return save.unlocked.indexOf(n)!==-1;}
function render(){
 var cal=$("calendar");cal.innerHTML="";
 for(var n=1;n<=24;n++){
  (function(num){var solved=save.solved.indexOf(num)!==-1,unlocked=isUnlocked(num),current=unlocked&&!solved,b=document.createElement("button");
   b.type="button";b.className="door"+(solved?" done":"")+(current?" current":"")+(num===24?" final":"");b.disabled=!unlocked;
   b.setAttribute("aria-label","Lucka "+num+(solved?", upptäckt":current?", öppna gåtan":", låst"));
   var symbol=solved?"✓":current?(num===24?"✦":"✧"):"🔒";
   b.innerHTML='<span class="door-symbol" aria-hidden="true">'+symbol+'</span><span class="door-number">'+num+'</span><span class="door-caption">'+(solved?"Upptäckt":current?"Öppna":"Låst")+'</span>';
   b.addEventListener("click",function(){openPuzzle(num);});cal.appendChild(b);
  })(n);
 }
 var count=save.solved.length,pct=Math.round(count/24*100);
 $("progressLabel").textContent=count+" av 24 mysterier upptäckta";$("progressPercent").textContent=pct+"%";$("progressFill").style.width=pct+"%";
 $("keepsakeText").textContent=count===0?"Din resa har precis börjat. Den första nyckeln väntar i lucka 1.":count===24?"Du har samlat alla 24 minnen och tänt julstjärnan. God jul!":"Du har hittat "+count+" "+(count===1?"hemlighet":"hemligheter")+". Fortsätt följa ledtrådarna!";
}
function openPuzzle(n){
 if(!isUnlocked(n))return;activeDoor=n;hintShown=false;var p=puzzles[n];
 $("puzzleKicker").textContent="LUCKA "+n+" AV 24";$("puzzleTitle").textContent=p.title;$("puzzleStory").textContent=p.story;$("puzzleQuestion").textContent=p.question;
 $("hintText").hidden=true;$("hintText").textContent=p.hint;$("hintButton").hidden=false;$("hintButton").textContent="♡ Ge mig en ledtråd";
 $("answerForm").hidden=save.solved.indexOf(n)!==-1;$("successPanel").hidden=!save.solved.includes(n);$("feedback").textContent="";
 if(save.solved.includes(n))showSuccess(n,true);$("puzzleModal").hidden=false;document.body.style.overflow="hidden";
 if(!save.solved.includes(n))setTimeout(function(){$("answerInput").focus();},80);
}
function normalize(s){return s.toLocaleLowerCase("sv-SE").trim().replace(/[.!?,:;]+$/g,"").replace(/\s+/g," ");}
function submitAnswer(e){
 e.preventDefault();if(activeDoor===null)return;var p=puzzles[activeDoor],answer=normalize($("answerInput").value);
 var correct=p.answer.some(function(a){return normalize(a)===answer;});
 if(!correct){$("feedback").textContent="Inte riktigt än. Läs ledtråden en gång till och försök igen!";$("answerInput").select();return;}
 if(save.solved.indexOf(activeDoor)===-1)save.solved.push(activeDoor);
 if(p.final){persist();render();showSuccess(activeDoor,false);return;}
 var next=p.next;if(save.unlocked.indexOf(next)===-1)save.unlocked.push(next);
 persist();render();showSuccess(activeDoor,false,next);
}
function showSuccess(n,already,next){
 var p=puzzles[n];$("answerForm").hidden=true;$("feedback").textContent="";$("successPanel").hidden=false;
 if(p.final){$("successTitle").textContent="Du har tänt julstjärnan!";$("successText").textContent="Du löste alla 24 mysterier. Tack för att du hjälpte julen att hitta tillbaka till Nordpolen. God jul!";$("continueButton").textContent="Fira ditt äventyr ✨";$("continueButton").dataset.final="true";}
 else{$("successTitle").textContent=already?"Den här hemligheten är redan din!":"Du hittade nästa ledtråd!";$("successText").textContent=already?"Lucka "+n+" är redan upptäckt. Fortsätt när du vill.":"Bra jobbat! Lucka "+next+" har låsts upp. Gå tillbaka till kalendern och hitta den gyllene luckan.";$("continueButton").textContent="Hitta nästa lucka →";delete $("continueButton").dataset.final;}
}
function closePuzzle(){$("puzzleModal").hidden=true;document.body.style.overflow="";activeDoor=null;render();}
function showToast(msg){var t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(function(){t.classList.remove("show");},2800);}
$("answerForm").addEventListener("submit",submitAnswer);
$("hintButton").addEventListener("click",function(){hintShown=!hintShown;$("hintText").hidden=!hintShown;$("hintButton").textContent=hintShown?"♡ Dölj ledtråden":"♡ Ge mig en ledtråd";});
$("closeModal").addEventListener("click",closePuzzle);
$("puzzleModal").addEventListener("click",function(e){if(e.target===$("puzzleModal"))closePuzzle();});
$("continueButton").addEventListener("click",function(){var final=$("continueButton").dataset.final==="true";closePuzzle();if(final)showToast("✨ God jul – du räddade julstjärnan!");else $("calendar").scrollIntoView({behavior:"smooth",block:"center"});});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!$("puzzleModal").hidden)closePuzzle();});
$("resetButton").addEventListener("click",function(){if(confirm("Vill du börja om från början? Alla upplåsta luckor på den här enheten nollställs.")){save={solved:[],unlocked:[1]};persist();render();showToast("Din resa börjar om från lucka 1.");}});
var audio=null,soundOn=false;
$("soundToggle").addEventListener("click",function(){soundOn=!soundOn;$("soundToggle").setAttribute("aria-pressed",String(soundOn));$("soundToggle").querySelector("span").textContent=soundOn?"Stämning på":"Stämning";if(soundOn){try{var Ctx=window.AudioContext||window.webkitAudioContext;if(Ctx){audio=audio||new Ctx();playChime();}}catch(e){}}});
function playChime(){if(!soundOn||!audio)return;[523.25,659.25].forEach(function(freq,i){var osc=audio.createOscillator(),gain=audio.createGain();osc.type="sine";osc.frequency.value=freq;gain.gain.setValueAtTime(.0001,audio.currentTime+i*.16);gain.gain.exponentialRampToValueAtTime(.045,audio.currentTime+i*.16+.04);gain.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+i*.16+.55);osc.connect(gain);gain.connect(audio.destination);osc.start(audio.currentTime+i*.16);osc.stop(audio.currentTime+i*.16+.6);});}
render();
})();