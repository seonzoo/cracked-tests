<?php 
    include('app/functions.php');
	$app = new APP;

    $app->doHeader();

        $list =  $app->dir2arr('/', 'php');
        echo $app->arr2ul($list, 'php');

    $app->doFooter();

?>

