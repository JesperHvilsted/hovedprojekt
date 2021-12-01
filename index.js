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
let opretProfilVognForSvg = []
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
  [400, 1610], [400, 400],
  [640, 400], [760, 480],
  [800, 520], [800, 600],
  [760, 720], [400, 760]
]

const sideprofil2 = [
  [400, 1200],[520, 1200],
  [520, 1080],[280, 1080],
  [280, 960],[400, 960], 
  [400, 400],
  [640, 400], [760, 480],
  [800, 520], [800, 600],
  [760, 720], [400, 720],
  [400, 1600]
]

const sideprofil3 = [
  [400, 1680], [400, 1000],
  [520, 800],[720, 720],
  [1280, 720], [1480, 800],
  [1600, 1000], [1600, 1680]
]

//-------------------------------------------------
//----------Event and Functions-------------------- 

function beginDraw(){
  draw = true; 
}   

function endDraw(){
  draw = false;
  if(svgDrawProfile.childElementCount == 3){ // 3 lines (children) in viewbox. The 4th element would be the profile line. 
    svgDrawProfile.removeChild(svgDrawProfile.lastChild)
    opretProfilVogn.push([0, opretProfilVogn[opretProfilVogn.length -1][1]]) //Ending the profile by adding the coordinates as the last coordinates. 
    opretProfilVognForSvg.push([0/2 + 1000, opretProfilVogn[opretProfilVogn.length -1][1]])
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
  if(svgDrawProfile.childElementCount > 2){ // 2 lines (children) in viewbox. The 4th element would be the profile line. 
    svgDrawProfile.removeChild(svgDrawProfile.lastChild)
    opretProfilVogn.pop()
    opretProfilVognForSvg.pop()
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

  
  if(svgDrawProfile.childElementCount > 2){ // 2 lines (children) in viewbox. The 3th element would be the profile line.
    svgDrawProfile.removeChild(svgDrawProfile.lastChild)
  }

  if(opretProfilVogn.length == 0){
    lineOfProfil = document.createElementNS(NS, 'polyline')
    opretProfilVogn.push([0,cY])
    opretProfilVognForSvg.push([0/2 + 1000, cY])
  }

  opretProfilVogn.push([cX,cY])
  opretProfilVognForSvg.push([cX/2 + 1000, cY])
  
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
  profileBothSides = convertToSymmetricProfile(profil) //getting both sides of profile
  newProfile = []
  for(i = 0; i < profileBothSides.length; i++){

    profileXAndY = convertFromSvgToProfileCoordinates(profileBothSides[i][0], profileBothSides[i][1]) 

    y = profileXAndY[1] //Using height (Y) in the formel
    calcX = ((y-850)/2000 * 25) + (y*15/1500) + (10/2) * 1.5 + 30 + 2.5 //The calculated x

    if(profileBothSides[i][0] - 1000 < 0){
    addedX = profileBothSides[i][0] - 15 - ((1435-1410)/2) - calcX //Add the extra width to original x
    newProfile.push([addedX],[profileBothSides[i][1]]) //The new profile width at full speed
    }
    else{
    addedX = profileBothSides[i][0] + 15 + ((1435-1410)/2) + calcX //Add the extra width to original x
    newProfile.push([addedX],[profileBothSides[i][1]]) //The new profile width at full speed
    }
  }
  return newProfile;
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
    displayProfil(profilVogn, this.id)
  }
  if(this.id == "btnUseDrawProfile"){
    if(opretProfilVognForSvg.length == 0){
      RouteHeadlineRight.innerHTML = "profil er tom"
    }
    else{
      displayProfil(opretProfilVognForSvg, this.id)
    }
  }
}

function displayProfil(profilVogn, id){

  fullSpeedProfile = fullSpeed(profilVogn)

  enTesterConverted = convertProfilToSvgFormat(fullSpeedProfile)
  convertedProfil = convertProfilToSvgFormat(profilVogn)
  asymmetriskProfil = convertToSymmetricSvg(profilVogn)

  for(i = 0; i < svg.childElementCount; i++){
    let child = svg.children[i]
    if(child.id == "btnIndlæsknap"){
  
      newProfile = drawProfile(convertedProfil, id)
      newProfile2 = drawShadowProfile(asymmetriskProfil, "shadowProfil2")

      svg.appendChild(newProfile)
      svg.appendChild(newProfile2)

      svg.replaceChild(newProfile,child)
      svg.replaceChild(newProfile2,svg.children[i-1])

      newProfile = drawProfile(convertedProfil, id)
      newProfile2 = drawShadowProfile(asymmetriskProfil, "shadowProfil2")

      svgProfileOnly.appendChild(newProfile)
      svgProfileOnly.appendChild(newProfile2)

      svgProfileOnly.replaceChild(newProfile,svgProfileOnly.children[i])
      svgProfileOnly.replaceChild(newProfile2,svgProfileOnly.children[i-1])

    }
    if(child.id == "btnUseDrawProfile"){

      newProfile = drawProfile(convertedProfil, id)
      newProfile2 = drawShadowProfile(asymmetriskProfil, "shadowProfil2")

      svg.appendChild(newProfile)
      svg.appendChild(newProfile2)

      svg.replaceChild(newProfile,child)
      svg.replaceChild(newProfile2,svg.children[i-1])

      newProfile = drawProfile(convertedProfil, id)
      newProfile2 = drawShadowProfile(asymmetriskProfil, "shadowProfil2")

      svgProfileOnly.appendChild(newProfile)
      svgProfileOnly.appendChild(newProfile2)

      svgProfileOnly.replaceChild(newProfile,svgProfileOnly.children[i])
      svgProfileOnly.replaceChild(newProfile2,svgProfileOnly.children[i-1])

    }
  }
 
  if(svg.childElementCount == 3){ //3 lines (children) under viewbox. Add 2 profiles as children. 
    newProfile1 = drawShadowProfile(asymmetriskProfil, "shadowProfil1")
    newProfile3 = drawProfile(convertedProfil, id)
    fullSpeedTest = drawProfile(enTesterConverted, "5km for stærkt")

    svg.appendChild(newProfile1)
    svg.appendChild(newProfile3)
    svg.appendChild(fullSpeedTest)

    newProfile1 = drawShadowProfile(asymmetriskProfil, "shadowProfil1")
    newProfile3 = drawProfile(convertedProfil, id)

    svgProfileOnly.appendChild(newProfile1)
    svgProfileOnly.appendChild(newProfile3)
  } 
}

function displayNextSideprofile(){
  if(sideprofiler.length > 0){
    if(sideprofilIndex +2 <= sideprofiler.length){
        if(svg.childElementCount > 5){ //3 lines (children) under viewbox and 2 profiles as children = 6 elements.
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
      if(svg.childElementCount > 5){ //3 lines (children) under viewbox and 2 profiles as children = 6 elements.
        svg.removeChild(svg.lastChild)
      }
      sideprofilIndex --;
      newProfile = drawProfile(sideprofiler[sideprofilIndex], "sideprofil")
      svg.appendChild(newProfile)
    }
  }
}

function displayFirstSideprofile(){
  if(svg.childElementCount > 5){ //3 lines (children) under viewbox and 2 profiles as children = 6 elements.
    svg.removeChild(svg.lastChild)
  }

  if(sideprofiler.length > 0){
      sideprofilIndex = 0;
      newProfile = drawProfile(sideprofiler[0], "sideprofil")
      svg.appendChild(newProfile)
  }
}

function displayLastSideprofile(){
  if(svg.childElementCount > 5){ //3 lines (children) under viewbox and 2 profiles as children = 6 elements.
    svg.removeChild(svg.lastChild)
  }

  if(sideprofiler.length > 0){
      sideprofilIndex = sideprofiler.length -1;
      newProfile = drawProfile(sideprofiler[sideprofiler.length -1], "sideprofil")
      svg.appendChild(newProfile)
  }
}

function isCollision(sideprofil, profil){
  console.log("profil: " + profil)
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
    sideprofil1[c][0] = sideprofil1[c][0] + 350
  }
  
  sideprofiler.push(sideprofil1)
  sideprofiler.push(sideprofil3)
  sideprofiler.push(sideprofil2)

  halvside = convertToSymmetricProfile(profilVogn)

  //Der er en lille fejlmargin. Hvis det er på præcis samme koordinat, så registrer den ikke. hvis sideobjekt = 900, så true på 899&901
  isCollision(sideprofiler[0], halvside);
  
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

  function convertToSymmetricSvg(profil){
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

  function convertToSymmetricProfile(profil){
    let points = []; 
    var box = svg.viewBox.baseVal
    
    for(i in profil){
      if(profil[i][0] - box.width/2 >= 0){
        let newX = profil[i][0] - (profil[i][0] - box.width/2) * 2
        points.push([newX,profil[i][1]])
      }
      else{
        let newY = profil[i][0] + (Math.abs(profil[i][0] - box.width/2)) * 2
        points.push([newY,profil[i][1]])
      }
    }

    for(i in profil){
      points.push(profil[i])
    }
    
    return points
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