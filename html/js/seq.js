$(document).ready(function($){

    msg('working');

    trButtons();

    chControl();

    getSounds();

});

var sounds_root = 'http://audio.los.pw/sounds/';
//var alphabet    = ("abcdefghijklmnopqrstuvwxyz").split("");
var sounds      = [];
var stopped     = true;
var bpm         = 60;
var grid        = 16;
var steps       = 32;



function getSounds()
{

    $.ajax({
      type: 'POST',
      url: 'sounds/',
      data: {  },
      dataType: 'json',
      success: function(jsonData) {
        sounds = jsonData;
        makeDropdown(jsonData);
      },
      error: function() {
        alert('Error loading Sounds');
      }
    });

}


function makeDropdown( data )
{

    var select = $('.option-wav');
    var output = '<option value="">SELECT</option>';

    $.each( data, function(k,v){

        if(String(k).length <2){var num = '0'+(k+1);}else{var num = k+1;}

        v = v.split('/');
        t = v[1].split('-');
        output += '<option value="'+v[0]+'/'+v[1]+'">'+num+') '+t[1]+'</option>';
    });

    $(output).appendTo( select );

    select.change(function(){
       var idx = $('option:selected', this).index();
       $( ".channels .ch.active .wav-num").text( idx );
    });

    //$( '.option-wav').selectmenu();

}


function msg(msg){
    $('#msg').text(msg);
}


function chControl(){

    chSelect();


    $( ".ch-strip .bool" ).button();


    /* Vol */
    $( ".ch-strip .vol .ctrl" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
      slide: function( event, ui ) {
        $( ".channels .ch.active .vol-num").text( ui.value );
        $( ".ch-strip .vol .num" ).text( ui.value );
      }
    });
    //$( ".ch-strip .vol-num" ).text( $( ".ch-strip .vol" ).slider( "value" ) );


    /* LP */
    $( ".ch-strip .lp .ctrl" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
      slide: function( event, ui ) {
        $( ".channels .ch.active .lp-num").text( ui.value );
        $( ".ch-strip .lp .num" ).text( ui.value );
      }
    });
    //$( ".ch-strip .vol-num" ).text( $( ".ch-strip .vol" ).slider( "value" ) );




}


function addRow(){

    var idx = $('.timeline .ch-steps').length+1;

    if(idx>grid){ msg('max channels'); return;}

    var row = $('<ul/>').addClass('ch-steps').data('channel', idx ).attr('id', 'steps'+idx );;


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

    var div = $('<div/>').addClass('ch').data('channel', idx ).attr('id', 'ch'+idx );
    $('<div class="num wav-num">0</div>').appendTo(div); // wav #
    $('<div class="num vol-num">0</div>').appendTo(div); // volume #
    $('<div class="num lp-num">0</div>').appendTo(div);  // lp #

    div.appendTo('.channels').trigger('click');

}

function chSelect(){

    $(document).on('click', '.channels .ch', function(){
        var ch = $(this).data('channel');

        $('.ch-strip').data('channel', ch);
        $('.ch-strip .current').text(ch);

        $('.channels .ch').removeClass('active');
        $(this).addClass('active');

        // get all num values
        var chVal = getChValues(ch);

        // set all num values
        $('.ch-strip .slider.vol .ctrl').slider('value', chVal.vol);
        $('.ch-strip .slider.lp  .ctrl').slider('value', chVal.lp);
        $('.option-wav option:eq('+chVal.wav+')').prop('selected', true);
        //console.log( $('.option-wav option:eq('+wav+')') );
    });

}


function getChValues( ch ){

        var thisCH = $('#ch'+ch);

        // get all num values
        var vals = {
            'vol' : parseInt( $('.vol-num', thisCH).text() ),
            'lp'  : parseInt( $('.lp-num',  thisCH).text() ),
            'wav' : parseInt( $('.wav-num', thisCH).text() )
        };

    return vals;
}



function doHits(){

    $.each( $('.timeline .ch-steps') , function(){

            var ch = $(this).data('channel');
            var headX = Math.round( $('.timeline .playhead').position().left / grid);
            var hit = $('.pad', this).eq(headX).hasClass('active');

            if(hit){
                var chVal = getChValues(ch);
                msg( 'Hit CH(' + ch + ') @' + (headX+1) + ' |wav|'+chVal.wav +' |v|'+chVal.vol+ ' |lp|'+chVal.lp );
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

    $(document).on('click', '.transport .addRow', function(){
            addRow();
    });
}
