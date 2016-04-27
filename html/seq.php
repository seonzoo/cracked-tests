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
        <button type="button" class="addpad">pad</button>
        <input type="text" value="" class="bpm" size="4">
    </div>

    <!-- Timeline -->
    <div class="timeline">

        <div class="playhead"></div>

    </div>

    <div class="channels">

    </div>

    <div class="ch-strip">

        <div class="vol"></div>
        <div class="vol-num">1</div>


    </div>



<?php
    $app->doFooter($v);
?>

