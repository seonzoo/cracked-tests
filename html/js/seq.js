$(document).ready(function($){

    msg('working');

    trButtons();

    stripVol();

});

var sounds_root = 'http://audio.los.pw/sounds/'
var sounds = [];
var stopped = true;
var bpm = 60;

var grid = 16;

var steps = 32;





function msg(msg){

    $('#msg').text(msg);
}


function stripVol(){

    $( ".ch-strip .vol" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
      slide: function( event, ui ) {
        $( ".ch-strip .vol-num" ).text( ui.value );
      }
    });
    $( ".ch-strip .vol-num" ).text( $( ".ch-strip .vol" ).slider( "value" ) );

}


function addpad(){
    
    var idx = $('.timeline .ch-steps').length+1;

    if(idx>grid){ msg('max channels'); return;}

    var row = $('<ul/>').addClass('ch-steps').data('channel', idx );


    for( i =0; i<steps; i++){
        var li = $('<li/>').addClass('pad');
        li.appendTo(row);
    }

    row.appendTo('.timeline');
    selectable( row );
    //draggable(div);

    addChannel(idx);

}

function selectable(row){
    
    $('li', row).click(function(){
        if( $(this).hasClass('active') ){
            $(this).removeClass('active')    
        } else {
            $(this).addClass('active') 
        }
    });

}


function addChannel(idx){

    var div = $('<div/>').addClass('ch').data('channel', idx );
    div.appendTo('.channels');

}

function doHits(){

    $.each( $('.timeline .ch-steps') , function(){

            var ch = $(this).data('channel');
            var headX = Math.round( $('.timeline .playhead').position().left / grid);
            var hit = $('.pad', this).eq(headX).hasClass('active');

            if(hit){
                msg( 'Hit CH(' + ch + ') @' + (headX+1) );
            }

    });

}

function trPlay()
{
        stopped = false;
        var i = 0;
        var fn = function(){

            var ms = 100/(bpm/60);

            $('.timeline .playhead').css({'left': (i*grid)+'px'});

             doHits();

            if(stopped == false){
                if( ++i < 32){
                    setTimeout(fn, ms);
                } else {
                    i=0;
                    setTimeout(fn, ms);
                }
            }

        };
        fn();

};


function draggable(target){
    target.draggable({ axis: "x", grid: [ grid, grid ] });
}


function trStop()
{
    stopped = true;
}

function trButtons()
{
    $(document).on('click', '.transport button.play', function(){
        if( $(this).hasClass('active') ){
            trStop();
            $(this).removeClass('active').text('play');
        } else {
            trPlay();
            $(this).addClass('active').text('stop');
        }
    });


    $('.transport input.bpm').val(bpm);
    $(document).on('change', '.transport input.bpm', function(){
            bpm = parseInt($(this).val());
    });

    $(document).on('click', '.transport .addpad', function(){
            addpad();
    });
}
