<?php 
    include('app/functions.php');
	$app = new APP;
    $v   = '8loop';

    $app->doHeader($v);

?>
		
	<!-- Transport-->
	<div id='transport' class="row transport">
		<button type="button" class="rnd">rnd S</button>
		<button type="button" class="play">play</button>
		
		<input type="text" value="" class="bpm">
		
		<button type="button" class="rndp">rnd P</button>
		<button type="button" class="clear">clear</button>
	</div> 
	
	<!-- Sequencer 1 -->
	<div id='channel0' class="row channel hidden">
	
		<div class="sample">
			<!--<div class="fx">
				<button type="button" class="delay">D</button>
			</div> -->
			<select id="track1" class="option-wav"></select>
		</div>
	
		<div class="steps">
		<button type="button" class="step"></button>
		<button type="button" class="step"></button>
		<button type="button" class="step"></button>
		<button type="button" class="step"></button>
		<button type="button" class="step"></button>
		<button type="button" class="step"></button>
		<button type="button" class="step"></button>
		<button type="button" class="step"></button>
		</div>
	</div>
	
	<div id="channels"></div>
	



<?php
    $app->doFooter($v);
?>

