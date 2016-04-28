$(document).ready(function($){

    msg('working');

    trButtons();

    chControl(); // >>>

    getSounds();



});

var sounds_root = 'http://audio.los.pw/sounds/';
//var alphabet    = ("abcdefghijklmnopqrstuvwxyz").split("");
var sounds      = [];
var stopped     = true;
var bpm         = 60;
var grid        = 16;
var steps       = 32;
var fx = 'lp,hp,od,dly'.split(',');





/**
 *  CH VALS !HERE
 */
function getChValues( ch ){

        var thisCH = $('#ch'+ch);

        // get all num values
        var vals = {
            'id' : ch,
            'vol' : parseInt( $('.vol-num', thisCH).text() ),
            'wav' : parseInt( $('.wav-num', thisCH).text() )
        };

        $.each(fx, function(i, fx){
            vals[fx] = parseInt( $('.'+fx+'-num',  thisCH).text() ) ;
        });

    console.log(vals);

    return vals;
}
/*
function addFX(){


    $.each(fx, function(i, fx){

        var slider = '<div class="slider '+fx+'">\
            <div class="ctrl"></div>\
            <div class="num">--</div>\
            <div class="label">'+fx+'</div>\
        </div>';

        $(slider).appendTo('.ch-ctrl');



        $( '.ctrl', slider ).slider({
          orientation: "vertical",
          range: "min",
          min: 0,
          max: 100,
          slide: function( event, ui ) {
            $( '.channels .ch.active .'+fx+'-num').text( ui.value );
            $( '.ch-ctrl .'+fx+' .num' ).text( ui.value );
          }
        });

    });

}*/

/**
 *  ADDCH
 */
function chControl(){

    seqControl();

    $( ".ch-ctrl .bool" ).button().hide();

    $( "#seq label" ).click(function() {
        var steps = parseInt( $( this ).text() );
        var idx = $('.ch-ctrl').data('channel');
        $('#steps'+idx+' .pad').removeClass('active');
        $.each( $('#steps'+idx+' .pad'), function(i,e){

                var hit = (i % steps);
                //console.log(rndSt +'='+ hit);
                if( hit == 0 ){
                    $(this).addClass('active');
                }

        });

    });

    $( "#dnup label" ).click(function() {

        var stepDir= $( this ).text();
        var idx = $('.ch-ctrl').data('channel');

        var pattern = [];
        var next = false;

            //$('#steps'+idx+' .pad').removeClass('active');
            $.each( $('#steps'+idx+' .pad'), function(i,e){

                    if( $(this).hasClass('active') ){
                        pattern.push(true);
                    } else {
                        pattern.push(false);
                    }
            });


            if(stepDir == '+'){
                pattern = pattern.rotate(-1);
            } else {
                pattern = pattern.rotate(1);
            }

            $.each( $('#steps'+idx+' .pad'), function(i,e){

                    if( pattern[i] == true ){
                        $(this).addClass('active')
                    } else {
                        $(this).removeClass('active');
                    }
            });

      });

    /*
    $('#check-rnd').click(function(){
        var idx = $('.ch-ctrl').data('channel');
        $('#steps'+idx+' .pad').removeClass('active');

        var steps  = [1,2,3,4,5,6];
        var rndSt  = parseInt( steps[~~(Math.random() * steps.length)]);

        //var rnd  = ~~(Math.random() * $('#steps'+idx+' .pad').length);
        $.each( $('#steps'+idx+' .pad'), function(i,e){

                var hit = (i % rndSt);
                //console.log(rndSt +'='+ hit);
                if( hit ==0 ){
                    $(this).addClass('active');
                }

        });

    })*/


    /* Vol */
    $( ".ch-ctrl .vol .ctrl" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      slide: function( event, ui ) {
        $( ".channels .ch.active .vol-num").text( ui.value );
        $( ".ch-ctrl .vol .num" ).text( ui.value );
      }
    });


    buildFx();

}

/**
 *  Build FX SLIDERS
 */
function buildFx(){

    $.each(fx, function(i, fx){

        var slider = $('<div/>').addClass('slider').addClass(fx);
        var ctrl = '\
            <div class="ctrl"></div>\
            <div class="num">--</div>\
            <div class="label">'+fx.toUpperCase()+'</div>\
        ';
        $(slider).html(ctrl).appendTo('.ch-ctrl');

        $( '.ctrl', slider ).slider({
          orientation: "vertical",
          range: "min",
          min: 0,
          max: 100,
          slide: function( event, ui ) {
            $( '.channels .ch.active .'+fx+'-num').text( ui.value );
            $( '.ch-ctrl .'+fx+' .num' ).text( ui.value );
          }
        });

        slider.css({left:50+(25* i) })

        // $('.ch-ctrl .slider.'+fx+'  .num').text(0);
        // $('.ch-ctrl .slider.'+fx+'  .ctrl').slider('value', 0);
    });

    // bind chSelect() - click on ch row
    chSelect();

}


/**
 *  seq control ( makes active hits on grid increment by 0-9)
 */
function seqControl(){

    var seq = $('<div/>').attr('id', 'seq');
    for(i=1;1<9;i++){
        $('<input type="radio" id="radio'+i+'" name="radio"><label for="radio'+i+'">'+i+'</label>').appendTo(seq);
    }
    $( seq ).buttonset().appendTo('.ch-ctrl');


    var dnup = $('<div/>').attr('id', 'dnup').addClass('btn-row');
    $('<input type="radio" id="seqDown" name="radio"><label for="seqDown">-</label>').appendTo(dnup);
    $('<input type="radio" id="seqUp" name="radio"><label for="seqUp">+</label>').appendTo(dnup);
    $( dnup ).buttonset().appendTo('.ch-ctrl');

}


/**
 *  ADDCH
 */
function addChannel(idx){

    var div = $('<div/>').addClass('ch').data('channel', idx ).attr('id', 'ch'+idx );
    $('<div class="num wav-num">'+idx+'</div>').appendTo(div); // wav #
    $('<div class="num vol-num">60</div>').appendTo(div); // volume #

        $.each(fx, function(i, fx){
            $('<div class="num '+fx+'-num">0</div>').appendTo(div);
        });

    $('<div class="sel">sel</div>').appendTo(div); // volume #

    // triggers chSelect()
    div.appendTo('.channels').trigger('click');

}

/**
 *  ADDCH SELECT
 */
function chSelect(){

    $(document).on('click', '.channels .ch', function(){
        var ch = $(this).data('channel');

        // set active
        $('.ch-ctrl').data('channel', ch);
        $('.ch-ctrl .current').text(ch);
        $('.channels .ch').removeClass('active');
        $(this).addClass('active');

        // get all num values
        var chVal = getChValues(ch);

        // set all num values
        $('.ch-ctrl .slider.vol .num').text(chVal.vol);
        $('.ch-ctrl .slider.vol .ctrl').slider('value', chVal.vol);
        // set all fx num values
        $.each(fx, function(i, fx){
            $('.ch-ctrl .slider.'+fx+' .num').text(chVal[fx]);
            $('.ch-ctrl .slider.'+fx+' .ctrl').slider('value', chVal[fx]);
        });


        // pick sample from select with same index as ch
        $('.option-wav option:eq('+chVal.wav+')').prop('selected', true);
        //console.log( $('.option-wav option:eq('+wav+')') );
    });

}




function doHits(){

    $.each( $('.timeline .ch-steps') , function(){

            var chID = $(this).data('channel');
            var headX = Math.round( $('.timeline .playhead').position().left / grid);
            var hit = $('.pad', this).eq(headX).hasClass('active');

            if(hit){
                var chVA = getChValues(chID);
                msg( 'Hit CH(' + chID + ') @' + (headX+1) + ' |wav|'+chVA.wav +' |v|'+chVA.vol+ ' |lp|'+chVA.lp );

                triggerSample( chVA ); //
            }

    });

}


/**
 *  __! PLAY SAMPLER
 */
function triggerSample(chVA)
{

            var sample = sounds[chVA.wav-1];
            //console.log(sample);
            //console.log(chVA);

            var vol = Math.round( (chVA.vol/100) * 100) / 100;

            console.log(vol);

            var sampler = __().sampler({
                id: 's'+chVA.id,
                path: sounds_root+sample,
                loop: false
            });

            __('sampler').stop();


            // highpass
            if( chVA.hp > 0 ){
                console.log('hp');
                sampler.highpass({ frequency:chVA.hp*10 })
            }


            // lowpass
            if( chVA.lp > 0 ){
                console.log('lp');
                sampler.lowpass({ frequency:chVA.lp })
            }

                // OD
            if( chVA.od > 0 ){
                console.log('od');
                sampler.overdrive({ frequency:chVA.od })
            }

                // DLY
            if( chVA.dly > 0 ){
                console.log('dly');
                sampler.delay( );
            }

            sampler.dac().play();

            __("dac").remove(500);


}




/**
 *  TIMELINE / TRANSPORT
 */
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



/**
 *   GET SOUNDS
 */
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

    //select.selectmenu();

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



/**
 *  Generic message trigger
 */
function msg(msg){
    $('#msg').text(msg);
}

/**
 *  Draggable grid
 */
function draggable(target){
    target.draggable({ axis: "x", grid: [ grid, grid ] });
}


/**
 *  Array rotate
 */
Array.prototype.rotate = (function() {
    // save references to array functions to make lookup faster
    var push = Array.prototype.push,
        splice = Array.prototype.splice;

    return function(count) {
        var len = this.length >>> 0, // convert to uint
            count = count >> 0; // convert to int

        // convert count to value in range [0, len)
        count = ((count % len) + len) % len;

        // use splice.call() instead of this.splice() to make function generic
        push.apply(this, splice.call(this, 0, count));
        return this;
    };
})();
