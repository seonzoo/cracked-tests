<?php
    include('app/functions.php');
    $app = new APP;
    $v   = 'seq-c';
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



    <!-- CHANNEL CTRL -->
    <div class="ch-ctrl" data-channel="0">

        <div class="current">--</div>

        <div class="wav-sound"><select class="option-wav"></select></div>

        <div class="slider vol">
            <div class="ctrl"></div>
            <div class="num">--</div>
            <div class="label">Vol</div>
        </div>

    </div>





<?php
    $app->doFooter($v);
?>

