//Lave X&Y map 
const items = new Array(20).fill(0).map(() => new Array(20).fill(0));

//----------SVG---------------------------------
// initialize
const svg = document.getElementById('mysvg')
const svgProfileOnly = document.getElementById('mysvgProfileOnly')
const svgDrawProfile = document.getElementById('mysvgDrawProfile')

const NS = svg.getAttribute('xmlns')

let btnProfil = document.getElementById('btnIndlæsknap')
let btnUseDrawProfile = document.getElementById('btnUseDrawProfile')
let btnSimuler = document.getElementById('btnSimuler')

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
let btnSave = document.getElementById('btnSave')

let svgX = document.getElementById("svgX");
let svgY = document.getElementById("svgY");

var ruteArray = [];
ruteArray.push(rute1)
ruteArray.push(rute2)

sideprofiler = []
sideprofilIndex = 0;

// events
svgDrawProfile.addEventListener('pointerdown', drawPointInProfile)
btnErase.addEventListener('click', removeLastPoint)
btnBeginDraw.addEventListener('click', beginDraw)
btnEndDraw.addEventListener('click', endDraw)

svgProfileOnly.addEventListener('pointermove', getCoordinates)

btnProfil.addEventListener('click', chooseProfile)
btnUseDrawProfile.addEventListener('click', chooseProfile)
btnSimuler.addEventListener('click', chooseRoute)

btnNext1.addEventListener('click', displayNextSideprofile)
btnBack1.addEventListener('click', displaypreviousSideprofile)
btnBackAll.addEventListener('click', displayFirstSideprofile)
btnNextAll.addEventListener('click', displayLastSideprofile)



//profils
let opretProfilVogn = []
let draw = false
let isProfileCreated = false

const profilVogn1 = [
  [1000,1600],[1200,1600],
  [1200, 1200], [1320, 1200],
  [1320, 1080], [1200,1080],
  [1200, 960], [800,960],
  [800, 1080], [600, 1080],
  [600, 1360], [800, 1360],
  [800, 1600], [1000,1600]
]

const profilVogn = [
  [1000, 1600],[1300, 1600],
  [1300, 1300], [1400, 1300],
  [1400, 1200], [1300, 1200],
  [1300, 1000], [1000, 1000]
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
  if(svgDrawProfile.childElementCount > 3){ // 3 lines (children) in viewbox. The 4th element would be the profile line. 
    svgDrawProfile.removeChild(svgDrawProfile.lastChild)
    opretProfilVogn.push(opretProfilVogn[0]) //Ending the profile by adding the coordinates as the last coordinates. 
    finaleProfile = convertProfilToSvgFormat(opretProfilVogn);
    lineOfProfil = document.createElementNS(NS, 'polyline')
    lineOfProfil.setAttribute("points" , finaleProfile);
    lineOfProfil.setAttribute("stroke", "black");
    lineOfProfil.setAttribute("fill", "none");
    lineOfProfil.setAttribute('id', "testID")
    svgDrawProfile.appendChild(lineOfProfil);
  } 
}

function removeLastPoint (){
  if(svgDrawProfile.childElementCount > 3){ // 3 lines (children) in viewbox. The 4th element would be the profile line. 
    svgDrawProfile.removeChild(svgDrawProfile.lastChild)
    opretProfilVogn.pop()
    finaleProfile = convertProfilToSvgFormat(opretProfilVogn);
    lineOfProfil1 = document.createElementNS(NS, 'polyline')
    lineOfProfil1.setAttribute("points" , finaleProfile);
    lineOfProfil1.setAttribute("stroke", "black");
    lineOfProfil1.setAttribute("fill", "none");
    lineOfProfil1.setAttribute('id', "testID")
    svgDrawProfile.appendChild(lineOfProfil1);
  }
}

function drawPointInProfile(event) {
if(draw){

 
  const target = event.target.closest('g') || event.target.ownerSVGElement || event.target //Target er det element man trykker på. Her er det vores svg element. 

  //clientX & Y er eventets koordinater. Dette er et pointer down, så det er der, hvor der klikkes. Det i forhold til screen width and height
  svgP = svgPoint(target, event.clientX, event.clientY) 
  cX = Math.round(svgP.x)
  cY = Math.round(svgP.y)

  lineOfProfil = document.createElementNS(NS, 'polyline')

  if(svgDrawProfile.childElementCount > 3){ // 3 lines (children) in viewbox. The 4th element would be the profile line.
    svgDrawProfile.removeChild(svgDrawProfile.lastChild)
  }

  opretProfilVogn.push([cX,cY])
  
  finaleProfile = convertProfilToSvgFormat(opretProfilVogn);
    
  lineOfProfil.setAttribute("points" , finaleProfile);
  lineOfProfil.setAttribute("stroke", "black");
  lineOfProfil.setAttribute("fill", "none");
  lineOfProfil.setAttribute('id', "testID")

  svgDrawProfile.appendChild(lineOfProfil);
  }
}

function getCoordinates(event) {
const svgP = svgPoint(svgProfileOnly, event.clientX, event.clientY);
svgX.value = svgP.x;
svgY.value = svgP.y; 

svgXTextContent = isNaN(svgX.value) ? svgX.value : Math.round(svgX.value);
svgYTextContent = isNaN(svgY.value) ? svgY.value : Math.round(svgY.value);

svgY.textContent = "Y: " + svgYTextContent
svgX.textContent = "X: " + svgXTextContent
}

function fullSpeed(profil){
  newProfile = []
  for(i = 0; i < profil.length; i++){
    test = convertFromSvgToProfileCoordinates(profil[i][0], profil[i][1])
    console.log(test[1])
  }
  //y = profil[i][1] //Using height in the formel
  y = 4300
  newX = ((y-850)/2000 * 25) + (y*15/1500) + (10/2) * 1.5 + 30 + 2.5 //The calculated x for extra width of profile
  console.log("X er: " + newX)
}

// Hvis tid kan der bygges videre på denne funktion. 
function convertFromSvgToProfileCoordinates(x,y){
  var box = svg.viewBox.baseVal
  newY = Math.abs(y - box.height)
  newX = x - box.height/2

  return [newX, newY]
}


// translate page to SVG co-ordinate
function svgPoint(element, x, y) {

  var pt = svg.createSVGPoint(); //Det repræsenterer et 2D eller 3D point i SVG koordinat systemet. Det er lavet på svg elementet. 
  pt.x = x;
  pt.y = y;
  return pt.matrixTransform(element.getScreenCTM().inverse()); //Fra svg units til screen coordinater. X&Y egenskaber som giver koordinater på svg viewbox.
}

function chooseProfile(){
  if(this.id == "btnIndlæsknap"){
    fullSpeed(profilVogn)
    displayProfil(profilVogn, this.id)
  }
  if(this.id == "btnUseDrawProfile"){
    if(opretProfilVogn.length == 0){
      RouteHeadlineRight.innerHTML = "profil er tom"
    }
    else{
      displayProfil(opretProfilVogn, this.id)
    }
  }
}

function displayProfil(profilVogn, id){

  convertedProfil = convertProfilToSvgFormat(profilVogn)
  asymmetriskProfil = convertToSymmetric(profilVogn)
  asymmetriskProfilOriginal = convertProfilToSvgFormat(profilVogn)

  for(i = 0; i < svg.childElementCount; i++){
    let child = svg.children[i]
    if(child.id == "btnIndlæsknap"){
      console.log("demoprofil")
  
      newProfile = drawProfile(convertedProfil, id)
      newProfile1 = drawShadowProfile(asymmetriskProfilOriginal, "shadowProfil1")
      newProfile2 = drawShadowProfile(asymmetriskProfil, "shadowProfil2")

      svg.appendChild(newProfile)
      svg.appendChild(newProfile1)
      svg.appendChild(newProfile2)

      svg.replaceChild(newProfile,child)
      svg.replaceChild(newProfile1,svg.children[i-2])
      svg.replaceChild(newProfile2,svg.children[i-1])


      newProfilek = drawProfile(convertedProfil, id)
      newProfile1k = drawShadowProfile(asymmetriskProfilOriginal, "shadowProfil1")
      newProfile2k = drawShadowProfile(asymmetriskProfil, "shadowProfil2")

      svgProfileOnly.appendChild(newProfilek)
      svgProfileOnly.appendChild(newProfile1k)
      svgProfileOnly.appendChild(newProfile2k)

      svgProfileOnly.replaceChild(newProfilek,child)
      svgProfileOnly.replaceChild(newProfile1k,svg.children[i-2])
      svgProfileOnly.replaceChild(newProfile2k,svg.children[i-1])
    }
    if(child.id == "btnUseDrawProfile"){
      console.log("demoprofil1")

      newProfile = drawProfile(convertedProfil, id)
      newProfile1 = drawShadowProfile(asymmetriskProfilOriginal, "shadowProfil1")
      newProfile2 = drawShadowProfile(asymmetriskProfil, "shadowProfil2")

      svg.appendChild(newProfile)
      svg.appendChild(newProfile1)
      svg.appendChild(newProfile2)

      svg.replaceChild(newProfile,child)
      svg.replaceChild(newProfile1,svg.children[i-2])
      svg.replaceChild(newProfile2,svg.children[i-1])


      newProfilek = drawProfile(convertedProfil, id)
      newProfile1k = drawShadowProfile(asymmetriskProfilOriginal, "shadowProfil1")
      newProfile2k = drawShadowProfile(asymmetriskProfil, "shadowProfil2")

      svgProfileOnly.appendChild(newProfilek)
      svgProfileOnly.appendChild(newProfile1k)
      svgProfileOnly.appendChild(newProfile2k)

      svgProfileOnly.replaceChild(newProfilek,child)
      svgProfileOnly.replaceChild(newProfile1k,svg.children[i-2])
      svgProfileOnly.replaceChild(newProfile2k,svg.children[i-1])
    }
  }
 
  if(svg.childElementCount == 3){ //3 lines (children) under viewbox. Add 3 profiles as children. 
    newProfile1 = drawShadowProfile(asymmetriskProfilOriginal, "shadowProfil1")
    newProfile2 = drawShadowProfile(asymmetriskProfil, "shadowProfil2")
    newProfile3 = drawProfile(convertedProfil, id)

    svg.appendChild(newProfile1)
    svg.appendChild(newProfile2)
    svg.appendChild(newProfile3)

    newProfile1 = drawShadowProfile(asymmetriskProfilOriginal, "shadowProfil1")
    newProfile2 = drawShadowProfile(asymmetriskProfil, "shadowProfil2")
    newProfile3 = drawProfile(convertedProfil, id)

    svgProfileOnly.appendChild(newProfile1)
    svgProfileOnly.appendChild(newProfile2)
    svgProfileOnly.appendChild(newProfile3)
  } 
}

function displayNextSideprofile(){
  if(sideprofiler.length > 0){
    if(sideprofilIndex +2 <= sideprofiler.length){
        if(svg.childElementCount > 6){ //3 lines (children) under viewbox and 3 profiles as children = 6 elements.
            svg.removeChild(svg.lastChild)
        }
        sideprofilIndex ++;
        newProfile = drawProfile(sideprofiler[sideprofilIndex], "sideprofil")
        svg.appendChild(newProfile)
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
      newProfile = drawProfile(sideprofiler[sideprofilIndex], "sideprofil")
      svg.appendChild(newProfile)
    }
  }
}

function displayFirstSideprofile(){
  if(svg.childElementCount > 6){ //3 lines (children) under viewbox and 3 profiles as children = 6 elements.
    svg.removeChild(svg.lastChild)
  }

  if(sideprofiler.length > 0){
      sideprofilIndex = 0;
      newProfile = drawProfile(sideprofiler[0], "sideprofil")
      svg.appendChild(newProfile)
  }
}

function displayLastSideprofile(){
  if(svg.childElementCount > 6){ //3 lines (children) under viewbox and 3 profiles as children = 6 elements.
    svg.removeChild(svg.lastChild)
  }

  if(sideprofiler.length > 0){
      sideprofilIndex = sideprofiler.length -1;
      newProfile = drawProfile(sideprofiler[sideprofiler.length -1], "sideprofil")
      svg.appendChild(newProfile)
  }
}

function isCollision(sideprofil, profil){
  for(i = 0; i < profil.length; i++){
    if(i + 2 <= profil.length){
      for(a = 0; a < sideprofil.length; a++){
        if(a +2 <= sideprofil.length){
          if(isPointInPoly(sideprofil[a][0],sideprofil[a][1], sideprofil[a+1][0], sideprofil[a+1][1], profil[i][0], profil[i][1], profil[i +1][0], profil[i+1][1])){
            console.log("Der er sammenstød")
          }
        }
      }
    }
  }
}

function isPointInPoly(a,b,c,d,p,q,r,s) {
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
  if(svg.childElementCount > 3){ // 3 lines from start under viewbox. Vi need to add profile before we can simulate a route. 
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
    for(i in sideprofiler){
        tal = parseInt(i)
        sideprofiler[i] = convertProfilToSvgFormat(sideprofiler[i])
    }
    if(svg.childElementCount > 6){ //3 lines (children) under viewbox and 3 profiles as children = 6 elements. We need to remove wayside object(element 7) if we change new route
      svg.removeChild(svg.lastChild)
    }
    newProfile = drawProfile(sideprofiler[0], "sideprofil")
    svg.appendChild(newProfile)
}

function useRute2(){
  sideprofiler = []
  sideprofilIndex = 0
  
  //Bare for at rykke profilen for at se om der er sammenstød
  for(c = 0; c < sideprofil1.length; c++){
    sideprofil1[c][0] = sideprofil1[c][0] + 70
  }
  
  sideprofiler.push(sideprofil1)
  sideprofiler.push(sideprofil3)
  sideprofiler.push(sideprofil2)

  isCollision(sideprofiler[0], profilVogn);
  
  for(i in sideprofiler){
      tal = parseInt(i)
      sideprofiler[i] = convertProfilToSvgFormat(sideprofiler[i])
  }

  if(svg.childElementCount > 6){ //3 lines (children) under viewbox and 3 profiles as children = 6 elements. We need to remove wayside object(element 7) if we change new route
    svg.removeChild(svg.lastChild)
  }
  newProfile = drawProfile(sideprofiler[0], "sideprofil")
  svg.appendChild(newProfile)
}


  function convertProfilToSvgFormat(profil){
    let points = "";
    for(i in profil){
      points += profil[i] + " "
    }
    return points;
  }

  function convertToSymmetric(profil){
    let points = ""; 
    var box = svg.viewBox.baseVal
    
    for(i in profil){
      if(profil[i][0] - box.width/2 >= 0){
        let newX = profil[i][0] - (profil[i][0] - box.width/2) * 2
        points +=newX + ", " + profil[i][1] + " "
      }
      else{
        let newY = profil[i][0] + (Math.abs(profil[i][0] - box.width/2)) * 2
        points += newY + ", " + profil[i][1] + " "
      }
    }

    for(i in profil){
      points += profil[i] + " "
    }
  
    return points;
  }

  function drawProfile(convertedProfil, profilID){
    lineOfProfil = document.createElementNS(NS, 'polyline')
    
    lineOfProfil.setAttribute("points" , convertedProfil);
    lineOfProfil.setAttribute("stroke", "black");
    lineOfProfil.setAttribute('id', profilID)
    lineOfProfil.setAttribute('fill', 'none')

    return lineOfProfil
  }

  function drawShadowProfile(convertedProfil, profilID){
    lineOfProfil = document.createElementNS(NS, 'polyline')
    
    lineOfProfil.setAttribute("points" , convertedProfil);
    lineOfProfil.setAttribute("stroke", "black");
    lineOfProfil.setAttribute('id', profilID)
    lineOfProfil.setAttribute('stroke-opacity', '.001')
    lineOfProfil.setAttribute('fill', 'rgb(218, 218, 218)')

    return lineOfProfil
  }