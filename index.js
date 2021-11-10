var h2 = document.getElementById("h2");

var indlæsKnap = document.getElementById("indlæsknap");
var knap = document.getElementById("testknappen");

var rute1 = document.getElementById("rute1");
var rute2 = document.getElementById("rute2");

var array = [];
array.push(rute1)
array.push(rute2)

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


//Sætte sideprofil ind. 
/*
for(a = 0; a < sideprofil.length; a++){
    items[sideprofil[a][0]][sideprofil[a][1]] = 2
}
*/

function simulerStrækning(){
    for(a = 0; a < sideprofil.length; a++){
        if(items[sideprofil[a][0]][sideprofil[a][1]] == 1){
            console.log("De støder på hinanden")
            console.log(sideprofil[a][0] + ", " + sideprofil[a][1])
        }
    }
}

indlæsKnap.onclick = function(){
    //Sætte profil ind i koordinatsystemet. Hvis 0 så er der ingen genstand, hvis 1 så er der en genstand.
    for(a = 0; a < profil.length; a++){
        items[profil[a][0]][profil[a][1]] = 1
    }
}

knap.onclick = function(){
    for(i = 0; i < array.length; i++){
        if(array[i].checked == true){
            console.log(items.reverse())
            simulerStrækning();
        }
    }
}

//lidt ekstra