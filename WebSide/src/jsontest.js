var json;

var black = '#000000';

var tileKey = {
    '1' : '#800000',
    '0' : '#A0A0A0'
};

var tileWidth = 50;
var tileHeight = 50;

var board;
var cursors;
var units;
var mouse;

var canvases;

function init() {
    board = document.getElementById('board');
    cursors = document.getElementById('cursors');
    units = document.getElementById('units');
    mouse = document.getElementById('mouseControl');

    canvases = [board, cursors, units, mouse];

    document.getElementById('jsonget').addEventListener('click', getData);

    document.getElementById('mapdraw').addEventListener('click', drawMap);
    document.getElementById('unitdraw').addEventListener('click', drawUnits);

    mouse.addEventListener('mouseover', function(evt){
        highlight(mouse, evt);
    });

    mouse.addEventListener('mousemove', function(evt){
        highlight(mouse, evt);
    });
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function highlight(canvas, evt){
    eraseCursors();
    var mousePos = getMousePos(canvas, evt);
    var x = mousePos.x - (mousePos.x % tileWidth);
    var y = mousePos.y - (mousePos.y % tileHeight);
    drawCursor(x, y);
    i = Math.floor(y/tileHeight);
    j = Math.floor(x/tileWidth);
    getTileInfo(i,j);
}

function getTileInfo(i, j) {
    var tile = json['Tiles'][i][j];
    $('#tileInfoMap').text('Waifu Wars');
    $('#tileInfoType').text(json["Key"][tile]);
    $('#tileInfoImage').text(tileKey[tile]);
    var unit = json["Units"][i][j];
    $('#tileInfoOccupy').text(unit === '.' ? 'None' : json["Stats"][unit]["Name"]);
}

function drawCursor(x, y) {
    var ctx = cursors.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(x, y, 50, 50);
    document.getElementById("mousePos").innerText = x+','+y;
    document.getElementById("mousePos2").innerText = (x+tileWidth).toString()+','+(y+tileHeight).toString()+','+Math.floor(y/tileHeight)+','+Math.floor(x/tileWidth);
}

function eraseCursors(){
    var canv = document.getElementById('cursors');
    var ctx = canv.getContext('2d');
    ctx.clearRect(0, 0, canv.width, canv.height);
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

function drawUnits(){
    var ctx=units.getContext('2d');
    for(var i = 0; i < json["Units"][0].length; i++){
        for(var j = 0; j < json["Units"].length; j++){
            var c = json["Units"][i][j];
            if(c !== '.'){
                var team = json['Stats'][c]["Team"];
                var x = j * tileWidth +(tileWidth / 2);
                var y = i * tileHeight + (tileHeight / 2);
                var rad = tileWidth/2.2;
                ctx.beginPath();
                ctx.fillStyle = team === '0' ? 'yellow' : 'green';
                ctx.arc(x, y, rad, 0, 2*Math.PI, false);
                ctx.fill();
            }
        }
    }
}

function drawMap(){
    if(json == null){
        document.getElementById('status').innerText = 'Cannot draw--no JSON loaded!';
        return;
    }

    var map = json['Tiles'];

    canvases.forEach(function (canvas) {
        canvas.setAttribute('width', (map[0].length * tileWidth).toString());
        canvas.setAttribute('height', (map.length * tileHeight).toString());
    });

    // board.setAttribute('width', (map[0].length * tileWidth).toString());
    // board.setAttribute('height', (map.length * tileHeight).toString());
    //
    board.style.width = (map[0].length * tileWidth).toString()+'px';
    board.style.height = (map.length * tileHeight).toString()+'px';

    cursors.style.width = (map[0].length * tileWidth).toString()+'px';
    cursors.style.height = (map.length * tileHeight).toString()+'px';

    units.style.width = (map[0].length * tileWidth).toString()+'px';
    units.style.height = (map.length * tileHeight).toString()+'px';

    mouse.style.width = (map[0].length * tileWidth).toString()+'px';
    mouse.style.height = (map.length * tileHeight).toString()+'px';

    var ctx = board.getContext('2d');
    for(var i = 0; i < map.length; i++){
        for(var j = 0; j < map[i].length; j++){
            ctx.fillStyle = tileKey[map[i][j]];
            ctx.fillRect(j * tileWidth, i * tileHeight, tileWidth, tileHeight);
        }
    }

}