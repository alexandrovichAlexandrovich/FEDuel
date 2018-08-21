var json;

var black = '#000000'

var tileKey = {
    '1' : '#800000',
    '0' : '#A0A0A0'
}

var tileWidth = 20;
var tileHeight = 20;

function init() {
    document.getElementById('jsonget').addEventListener('click', getData);
    document.getElementById('mapdraw').addEventListener('click', drawMap);
    document.getElementById('unitdraw').addEventListener('click', drawUnits);
    document.getElementById('board').addEventListener('mouseover', highlight)
}


function highlight()

function getData(){
    $.getJSON('jsontest.json', function(data, status){
        console.log('got data');
        document.getElementById("status").innerText=status;
        write(data);
    });
}

function write(data){
    json = data;
    console.log('continued');

    var headers = '';

    Object.keys(json).forEach( function (value) {
        headers += value + '\n';
    });

    document.getElementById('content').innerText=headers;
}

function drawUnits(){

}

function drawMap(){
    if(json == null) document.getElementById('status').innerText = 'Cannot draw--no JSON loaded!';
    var map = json['Tiles'];
    var canv = document.getElementById('board');
    var ctx = canv.getContext('2d');
    // var fillStyle;
    for(var i = 0; i < map.length; i++){
        for(var j = 0; j < map[i].length; j++){
            ctx.fillStyle = tileKey[map[i][j]];
            ctx.fillRect(j * tileWidth, i * tileHeight, tileWidth, tileHeight);
            ctx.fillStyle = black;
            ctx.rect(j * tileWidth, i * tileHeight, tileWidth, tileHeight);
        }
    }

}