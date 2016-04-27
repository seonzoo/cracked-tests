<?php 

	$dir    = '/opt/sites/audio/html/sounds/';
	$kit    = '11575__dwsd__dwsd-deep-house-drum-kits';
	
	$files  = scandir($dir.$kit);
	$out =array();

	foreach($files as $file): 
	if('wav' === substr($file,-3)){
		$out[] = $kit.'/'.$file;
	}
	endforeach;
	
        header('Content-type: application/json');
        echo json_encode($out);
        die();	

