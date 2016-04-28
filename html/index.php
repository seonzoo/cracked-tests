<?php
    include('app/functions.php');
    $app = new APP;

    $app->doHeader();


        echo '<nav>';
        $list =  $app->dir2arr('/', 'php');
        echo $app->arr2ul($list, 'php');
        echo '</nav>';


    $app->doFooter();

?>

