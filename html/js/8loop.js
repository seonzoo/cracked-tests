$(document).ready(function($){

	$('#msg').text('working');
	
	getSounds();

	seqButtons();
	
	trButtons();
	
	cloneChannel(8); 

});



var sounds_root = 'http://audio.los.pw/sounds/'
var sounds = [];
var stopped = true;
var bpm = 135;



function rndPattern()
{

	var count = 0;
	
	$.each( $('.channel'), function(){  
		var rnd  = ~~(Math.random() * $('.steps > button', this).length);		
		$('#channel'+(count)+' .steps > button:eq('+rnd+')').removeClass('active');
		count++;
	});
	
	var count = 0;
	
	$.each( $('.channel'), function(){  
		var rnd  = ~~(Math.random() * $('.steps > button', this).length);		
		$('#channel'+(count)+' .steps > button:eq('+rnd+')').addClass('active');
		count++;
	});

}




function rndSelect()
{

	var count = 0;
	
	$.each( $('.channel'), function(){
	
		var rnd  = ~~(Math.random() * $('select > option', this).length);		
		$('#channel'+(count)+' select option:eq('+rnd+')').prop('selected', true);
		count++;
	});

}

function cloneChannel( count )
{
	
	for( i=1; i<count+1; i++ ){
		var channel = $('#channel0').clone();
		channel.attr('id', 'channel'+(i) ).removeClass('hidden').appendTo('#channels');
		
		//$('#channel'+(i)+' select option:eq(3)').prop('selected', true);
		
		
		//$('#track1 option:eq(4)').prop('selected', true);
	}	

}


function trStop()
{
	stopped = true;
}

function trPlay()
{
	$.each( $('.channel'), function(){
		playSeq( $(this) );
	} );
}

function trButtons()
{
	$(document).on('click', '.transport button.play', function(){
		if( $(this).hasClass('active') ){
			stopped = true;
			$(this).removeClass('active').text('play');
		} else {
			stopped = false; trPlay();
			$(this).addClass('active').text('stop');
		}
	});
	
	$(document).on('click', '.transport button.rnd', function(){
		rndSelect();
	});	
		
	$(document).on('click', '.transport button.clear', function(){
		$('.steps button').removeClass('active');
	});	
	
	
	$(document).on('click', '.transport button.rndp', function(){
		rndPattern();
	});		
	
	$('.transport input.bpm').val(bpm);
	$(document).on('change', '.transport input.bpm', function(){
			bpm = parseInt($(this).val()); 
	});
}

function seqButtons()
{
	$(document).on('click', '.channel button', function(){
		var active = $(this).hasClass('active');
		if(active){
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});
}

function triggerSample(sound_select, channel)
{
  var sample = sound_select.val();

		
			

		
		if( $('.delay', channel).hasClass('active') ){
		
			__().
		    sampler({
		        path: sounds_root+sample,
		        loop: false
		    }).comb().dac(); 	
			__("sampler").start();

		} else {
		
			__().
		    sampler({
		        path: sounds_root+sample,
		        loop: false
		    }).dac(); 			
			__("sampler").start();
		}

		
		    
		   
}


function playSeq( channel )
{

	//var channel = $('#'+channel);

	$.each( $('.steps button', channel), function(i,e){

		var ms = 1000/(bpm/60);
		var delay = ( ms*( $(this).index()+1 ) );
		var target = $(this);
		var last_index = ( $('.steps button', channel).length == $(this).index()+1 ) ;

		
		setTimeout(function(){ hit( target, last_index, channel ) }, delay);
		
		if( i == 8){
			console.log('end');
		}

	});
	
	
	function hit( target, loop, channel ){
	
		var sound_select = $('select', channel );
		
		$('.steps button', channel).removeClass('play');
		$(target).addClass('play');
		
		var active = $(target).hasClass('active');
		if(active){
		 triggerSample(sound_select, channel); 
		}
		
		if(loop == true && stopped == false){ playSeq(channel); }
	}

}


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

	var output = '<option value="">SELECT</option>';
	
	$.each( data, function(k,v){
		v = v.split('/');
		t = v[1].split('-');
		output += '<option value="'+v[0]+'/'+v[1]+'">'+t[1]+'</option>';
	});
	
	$(output).appendTo( $('.option-wav') );
    
    //$( '.option-wav').selectmenu();

}