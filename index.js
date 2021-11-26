//Lave X&Y map 
const items = new Array(20).fill(0).map(() => new Array(20).fill(0));

//Oprette profil. For at det fungere skal Y indsættes først i forhold til 2d array 
const profil = [
    [2,15],[3,15],[4,15],[5,15],[6,15],
    [6,16],[6,17],
    [7,17],[8,17],[9,17],
    [9,16],[9,15],[9,14],
    [10,14],[11,14],[12,14],[13,14],[14,14],
    [14,13],[14,12],[14,11]

]

//oprette sideprofil. For at det fungere skal Y indsættes først i forhold til 2d array
const sideprofil = [
    [0,16],
    [1,16],
    [2,16],
    [3,16],
    [4,16],
    [5,16],
    [6,16],
    [7,16],
    [8,16],
    [9,16],
    [10,16],
    [11,16],
    [12,16],
    [13,16],
    [14,16],[14,15],[14,14],[14,13],[14,12],
    [13,12], 
    [12,12],[12,13],[12,14],[12,15]
]

const test = 0; 

//Sætte sideprofil ind. 
/*
for(a = 0; a < sideprofil.length; a++){
    items[sideprofil[a][0]][sideprofil[a][1]] = 2
}
*/

/*
function simulerStrækning(){
    for(a = 0; a < sideprofil.length; a++){
        if(items[sideprofil[a][0]][sideprofil[a][1]] == 1){
            console.log("De støder på hinanden")
            h2.innerHTML = "Sideprofil støder på profil"
            console.log(sideprofil[a][0] + ", " + sideprofil[a][1])
            break;
        }
    }
}
*/

/*indlæsKnap.onclick = function(){
    //Sætte profil ind i koordinatsystemet. Hvis 0 så er der ingen genstand, hvis 1 så er der en genstand.
    for(a = 0; a < profil.length; a++){
        items[profil[a][0]][profil[a][1]] = 1
    }
}
*/

/*knap.onclick = function(){
    for(i = 0; i < array.length; i++){
        if(array[i].checked == true){
            console.log(items.reverse())
            simulerStrækning();
        }
    }
}
*/

//----------SVG---------------------------------
// initialize
const svg = document.getElementById('mysvg')
const svgProfileOnly = document.getElementById('mysvgProfileOnly')
const svgDrawProfile = document.getElementById('mysvgDrawProfile')

const NS = svg.getAttribute('xmlns')

const btnProfil = document.getElementById('btnIndlæsknap')
const btnSimuler = document.getElementById('btnSimuler')

let rute1 = document.getElementById("rute1");
let rute2 = document.getElementById("rute2");
let RouteHeadlineRight = document.getElementById("RouteHeadlineRight")

let btnBack1 = document.getElementById("btnBack1")
let btnNext1 = document.getElementById("btnNext1")
let btnBackAll = document.getElementById("btnBackAll")
let btnNextAll = document.getElementById("btnNextAll")

let btnBeginDraw = document.getElementById('btnBeginDraw')
let btnEndDraw = document.getElementById('btnEndDraw')
let btnErase = document.getElementById('btnErase')

let svgX = document.getElementById("svgX");
let svgY = document.getElementById("svgY");

var ruteArray = [];
ruteArray.push(rute1)
ruteArray.push(rute2)

sideprofiler = []
sideprofilIndex = 0;

// events
svgDrawProfile.addEventListener('pointerdown', createCircle)
btnErase.addEventListener('click', removeLastPoint)
btnBeginDraw.addEventListener('click', beginDraw)
btnEndDraw.addEventListener('click', endDraw)

svgProfileOnly.addEventListener('pointermove', getCoordinates)

btnProfil.addEventListener('click', displayProfil)
btnSimuler.addEventListener('click', chooseRoute)

btnNext1.addEventListener('click', displayNextSideprofile)
btnBack1.addEventListener('click', displaypreviousSideprofile)
btnBackAll.addEventListener('click', displayFirstSideprofile)
btnNextAll.addEventListener('click', displayLastSideprofile)



//profils
let opretProfilVogn = []
let draw = false

const profilVogn = [
  [250,400],[300,400],
  [300, 300], [330, 300],
  [330, 270], [300,270],
  [300, 240], [200,240],
  [200, 270], [150, 270],
  [150, 340], [200, 340],
  [200, 400], [250,400]
]

const sideprofil1 = [
  [100, 400], [100, 100],
  [160, 100], [190, 120],
  [200, 130], [200, 150],
  [190, 180], [100, 180]
]

const sideprofil2 = [
  [100, 300],[130, 300],
  [130, 270],[70, 270],
  [70, 240],[100, 240], 
  [100, 100],
  [160, 100], [190, 120],
  [200, 130], [200, 150],
  [190, 180], [100, 180],
  [100, 400]
]

const sideprofil3 = [
  [100, 420], [100, 250],
  [130, 200],[180, 180],
  [320, 180], [370, 200],
  [400, 250], [400, 420]
]

//-------------------------------------------------
//----------Event and Functions-------------------- 

function beginDraw(){
  draw = true; 
}

function endDraw(){
  draw = false;
  if(svgDrawProfile.childElementCount > 3){
    svgDrawProfile.removeChild(svgDrawProfile.lastChild)
    console.log("er det den første?: " + opretProfilVogn[0])
    opretProfilVogn.push(opretProfilVogn[0])
    ny = convertProfil(opretProfilVogn);
    lineOfProfil.setAttribute("points" , ny);
    lineOfProfil.setAttribute("stroke", "black");
    lineOfProfil.setAttribute("fill", "none");
    lineOfProfil.setAttribute('id', "testID")
    svgDrawProfile.appendChild(lineOfProfil);
  } 
}

function removeLastPoint (){
  if(svgDrawProfile.childElementCount > 3){
    svgDrawProfile.removeChild(svgDrawProfile.lastChild)
    opretProfilVogn.pop()
    ny = convertProfil(opretProfilVogn);
    lineOfProfil.setAttribute("points" , ny);
    lineOfProfil.setAttribute("stroke", "black");
    lineOfProfil.setAttribute("fill", "none");
    lineOfProfil.setAttribute('id', "testID")
    svgDrawProfile.appendChild(lineOfProfil);
  }
}

// add a circle to the target
function createCircle(event) {
if(draw){

  // add circle to containing element
  const target = event.target.closest('g') || event.target.ownerSVGElement || event.target //Target er det element man trykker på. Her er det vores svg element. 

  //clientX & Y er eventets koordinater. Dette er et pointer down, så det er der, hvor der klikkes. Det i forhold til screen width and height
  svgP = svgPoint(target, event.clientX, event.clientY) 
  cX = Math.round(svgP.x)
  cY = Math.round(svgP.y)

  lineOfProfil = document.createElementNS(NS, 'polyline')

  if(svgDrawProfile.childElementCount > 3){
    svgDrawProfile.removeChild(svgDrawProfile.lastChild)
  }

  opretProfilVogn.push([cX,cY])

  ny = convertProfil(opretProfilVogn);
    
  lineOfProfil.setAttribute("points" , ny);
  lineOfProfil.setAttribute("stroke", "black");
  lineOfProfil.setAttribute("fill", "none");
  lineOfProfil.setAttribute('id', "testID")

  /*
  circle.setAttribute("points" , points);
  circle.setAttribute("stroke", "black");
  circle.setAttribute("fill", "none");
  */

  svgDrawProfile.appendChild(lineOfProfil);
  }
}

function getCoordinates(event) {
const svgP = svgPoint(svgProfileOnly, event.clientX, event.clientY);
svgX.value = svgP.x;
svgY.value = svgP.y; 

svgXTextContent = isNaN(svgX.value) ? svgX.value : Math.round(svgX.value);
svgYTextContent = isNaN(svgY.value) ? svgY.value : Math.round(svgY.value);


var box = svg.viewBox.baseVal
svgYTextContent = Math.abs(svgYTextContent - box.height)
svgXTextContent = svgXTextContent - box.height/2

svgY.textContent = "Y: " + svgYTextContent
svgX.textContent = "X: " + svgXTextContent
//console.log(box)
}


// translate page to SVG co-ordinate
function svgPoint(element, x, y) {

  var pt = svg.createSVGPoint(); //Det repræsenterer et 2D eller 3D point i SVG koordinat systemet. Det er lavet på svg elementet. 
  pt.x = x;
  pt.y = y;
  return pt.matrixTransform(element.getScreenCTM().inverse()); //Fra svg units til screen coordinater. X&Y egenskaber som giver koordinater på svg viewbox.
}

function displayProfil(){

  convertedProfil = convertProfil(profilVogn)

  asymmetriskProfil = convertToSymmetric(profilVogn)
  asymmetriskProfilOriginal = convertProfil(profilVogn)

  if(svg.childElementCount == 3){ //3 lines (children) under viewbox. Add 3 profiles as children. 
    drawProfile(asymmetriskProfilOriginal, "shadowProfil", svg)
    drawProfile(asymmetriskProfil, "shadowProfil", svg)
    drawProfile(convertedProfil, "profil", svg)

    drawProfile(asymmetriskProfilOriginal, "shadowProfil", svgProfileOnly)
    drawProfile(asymmetriskProfil, "shadowProfil", svgProfileOnly)
    drawProfile(convertedProfil, "profil", svgProfileOnly)
  } 
}

function displayNextSideprofile(){
  if(sideprofiler.length > 0){
    if(sideprofilIndex +2 <= sideprofiler.length){
        if(svg.childElementCount > 6){ //3 lines (children) under viewbox and 3 profiles as children = 6 elements.
            svg.removeChild(svg.lastChild)
        }
        sideprofilIndex ++;
        drawProfile(sideprofiler[sideprofilIndex], "sideprofil", svg)
    }
  }
}

function displaypreviousSideprofile(){
  if(sideprofiler.length > 0){
    if(!(sideprofilIndex -1 == -1)){
      if(svg.childElementCount > 6){ //3 lines (children) under viewbox and 3 profiles as children = 6 elements.
        svg.removeChild(svg.lastChild)
      }
      sideprofilIndex --;
      drawProfile(sideprofiler[sideprofilIndex], "sideprofil", svg)
    }
  }
}

function displayFirstSideprofile(){
  if(svg.childElementCount > 6){ //3 lines (children) under viewbox and 3 profiles as children = 6 elements.
    svg.removeChild(svg.lastChild)
  }

  if(sideprofiler.length > 0){
      sideprofilIndex = 0;
      drawProfile(sideprofiler[0], "sideprofil", svg)
  }
}

function displayLastSideprofile(){
  if(svg.childElementCount > 6){ //3 lines (children) under viewbox and 3 profiles as children = 6 elements.
    svg.removeChild(svg.lastChild)
  }

  if(sideprofiler.length > 0){
      sideprofilIndex = sideprofiler.length -1;
      drawProfile(sideprofiler[sideprofiler.length -1], "sideprofil", svg)
  }
}

function isCollision(sideprofil, profil){
  for(i = 0; i < profil.length; i++){
    if(i + 2 <= profil.length){
      for(a = 0; a < sideprofil.length; a++){
        if(a +2 <= sideprofil.length){
          //console.log("a,v,v,fe,de,,: " + sideprofil[a][0]+ " " + sideprofil[a][1] + " " + sideprofil[a+1][0] + " " + sideprofil[a+1][1])
          if(isPointInPoly(sideprofil[a][0],sideprofil[a][1], sideprofil[a+1][0], sideprofil[a+1][1], profil[i][0], profil[i][1], profil[i +1][0], profil[i+1][1])){
            console.log("Der er ingen collision")
          }
        }
      }
    }
  }
}

function isPointInPoly(a,b,c,d,p,q,r,s) {
  //console.log("a,b,c,d,e,f,g,h:" +a+" "+b+" "+c+" "+d+" "+p+" "+q+" "+r+" "+s)
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};

function chooseRoute(){
  if(svg.childElementCount > 3){
    if(rute1.checked){
      useRute1()
      RouteHeadlineRight.innerHTML = "Rute1"
    } else if(rute2.checked){
      useRute2()
      RouteHeadlineRight.innerHTML = "Rute2"
    } else{
      RouteHeadlineRight.innerHTML = "Ingen rute valgt"
    }
  }
  else{
    RouteHeadlineRight.innerHTML = "mangler at indsætte profil"
  }
}

function useRute1(){
    sideprofiler = []
    sideprofilIndex = 0
    sideprofiler.push(sideprofil1)
    sideprofiler.push(sideprofil2)
    sideprofiler.push(sideprofil3)
    console.log(sideprofiler[0])
    for(i in sideprofiler){
        console.log("I er; " + typeof(i))
        tal = parseInt(i)
        sideprofiler[i] = convertProfil(sideprofiler[i])
    }
    if(svg.childElementCount > 4){
      svg.removeChild(svg.lastChild)
    }
    drawProfile(sideprofiler[0], "sideprofil", svg)
}

function useRute2(){
  sideprofiler = []
  sideprofilIndex = 0
  
  for(c = 0; c < sideprofil1.length; c++){
    sideprofil1[c][0] = sideprofil1[c][0] + 70
  }
  
  sideprofiler.push(sideprofil1)
  sideprofiler.push(sideprofil3)
  sideprofiler.push(sideprofil2)

  isCollision(sideprofiler[0], profilVogn);
  

  for(i in sideprofiler){
      tal = parseInt(i)
      sideprofiler[i] = convertProfil(sideprofiler[i])
  }

  if(svg.childElementCount > 6){
    svg.removeChild(svg.lastChild)
  }
  drawProfile(sideprofiler[0], "sideprofil", svg)
}


  function convertProfil(profil){
    let points = "";
    for(i in profil){
      points += profil[i] + " "
    }
    return points;
  }

  function convertProfil1(profil){
    let points = "";
    for(i in profil){
      points += profil[i][0] + 70 + "," + profil[i][1] + " "
    }
    return points;
  }

  function convertToSymmetric(profil){
    let points = ""; 
    
    for(i in profil){
      if(profil[i][0] - 250 >= 0){
        let testX = profil[i][0] - (profil[i][0] - 250) * 2
        points += testX + ", " + profil[i][1] + " "
      }
      else{
        let testY = profil[i][0] + (Math.abs(profil[i][0] - 250)) * 2
        points += testY + ", " + profil[i][1] + " "
      }
    }

    for(i in profil){
      points += profil[i] + " "
    }
  
    return points;
  }

  function drawProfile(convertedProfil, profilID, svgPlatform){
    lineOfProfil = document.createElementNS(NS, 'polyline')
    
    lineOfProfil.setAttribute("points" , convertedProfil);
    lineOfProfil.setAttribute("stroke", "black");
    lineOfProfil.setAttribute('id', profilID)
    if(profilID != "shadowProfil")
    {
    }
    if(profilID == "shadowProfil"){
      lineOfProfil.setAttribute('stroke-opacity', '.001')
      lineOfProfil.setAttribute('fill', 'rgb(218, 218, 218)')
    }else{
      lineOfProfil.setAttribute('fill', 'none')
    }
    svgPlatform.appendChild(lineOfProfil);
  }