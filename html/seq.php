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

    <div class="ch-strip" data-channel="0">

        <div class="current">00</div>

        <div class="wav-sound"><select class="option-wav"></select></div>


        <div class="slider vol">
            <div class="ctrl"></div>
            <div class="num">0</div>
            <div class="label">Vol</div>
        </div>


        <div class="slider lp">
            <div class="ctrl"></div>
            <div class="num">0</div>
            <div class="label">LP</div>
        </div>

        <div class="btn-row">
           <input type="checkbox" class="bool" id="check-od"><label for="check-od">OD</label>
        </div>




    </div>





<?php
    $app->doFooter($v);
?>

