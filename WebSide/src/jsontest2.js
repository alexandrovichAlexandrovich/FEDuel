var json;

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
}

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

function drawMap(){
    if(json == null) document.getElementById('status').innerText = 'Cannot draw--no JSON loaded!';
    var map = json['Tiles'];
    var mapStr = '';
    for(i = 0; i < map.length; i++)
    // map.forEach(function (row) {
    //     mapStr += row + '\n';
    // })
    // document.getElementById("map").innerText=mapStr;
}