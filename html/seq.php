<?php
    include('app/functions.php');
    $app = new APP;
    $v   = 'seq';
    $app->doHeader($v);
?>
<body>

    <!--  Transport -->
    <div id='transport' class="row transport">
        <button type="button" class="play">play</button>
        <button type="button" class="addRow">+ch</button>
        <input type="text" value="" class="bpm" size="4">
    </div>

    <!-- Timeline -->
    <div class="timeline">

        <div class="playhead"></div>

    </div>

    <div class="channels">

    </div>

   
   
    <!-- BEAST !HERE -->
    <div class="ch-strip" data-channel="0">

        <div class="current">--</div>

        <div class="wav-sound"><select class="option-wav"></select></div>

        <!-- 
        <div class="btn-row">
           <input type="checkbox" class="bool" id="check-rnd"><label for="check-rnd">RND</label>
        </div>-->
        
          <div id="seq" class="btn-row">
            <input type="radio" id="radio1" name="radio"><label for="radio1">1</label>
            <input type="radio" id="radio2" name="radio" checked="checked"><label for="radio2">2</label>
            <input type="radio" id="radio3" name="radio"><label for="radio3">3</label>
            <input type="radio" id="radio4" name="radio"><label for="radio4">4</label>
            <input type="radio" id="radio5" name="radio"><label for="radio5">5</label>
            <input type="radio" id="radio6" name="radio"><label for="radio6">6</label>
            <input type="radio" id="radio7" name="radio"><label for="radio7">7</label>
            <input type="radio" id="radio8" name="radio"><label for="radio8">8</label>
          </div>
          <div id="dnup" class="btn-row">
            <input type="radio" id="seqDown" name="radio"><label for="seqDown">-</label>
            <input type="radio" id="seqUp" name="radio" checked="checked"><label for="seqUp">+</label>
          </div>
       
        <div class="slider vol">
            <div class="ctrl"></div>
            <div class="num">--</div>
            <div class="label">Vol</div>
        </div>

 


    </div>





<?php
    $app->doFooter($v);
?>

