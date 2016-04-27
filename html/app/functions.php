<?php


class APP{


    //
    public function __construct()
    {

        $this->rootdir = '/opt/sites/audio/html/';

    }

    /**
     *  JSON
     */
    function jsonResult($output=[]){

        header('Content-type: application/json');
        echo json_encode($output);
        die();

    }

    
    function dir2arr($dir, $ext=''){
    
        $files = scandir($this->rootdir .'/'. $dir);
        $out = array();
        
        $ignore = ['index.php'];

        foreach($files as $file): 
        if($ext == substr($file,-strlen($ext)) && !in_array($file, $ignore)){
            $out[] = $file;
        }
        endforeach;    
        
        
         
        return $out;
    }
    
 
    function arr2ul($data, $ext)
    {

        $html = '<ul>';
        foreach($data as $item):

            $html .= '<li><a href="'.$item.'">'.str_replace('.'.$ext,'',$item).'</a>';

        endforeach;
        $html .= '</ul>';
        


        return $html;

    }
    
    
    
    function doHeader($v='index'){
        ?>
<!DOCTYPE html>
        <html>

        <head>
            <meta name="viewport" content="width=device-width" charset="utf-8">
            <title>Cracked Tests</title>

            <!-- FONTS -->
            <link href='https://fonts.googleapis.com/css?family=Inconsolata:400,700' rel='stylesheet' type='text/css'>
            <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' rel='stylesheet' type='text/css'>
            <link href='css/jquery-ui.min.css' rel='stylesheet' type='text/css'>

            <!-- CSS-->
            <script>less = {async: true, env: "development", logLevel: 2}</script> 
            <link href="css/style.less" type="text/css" rel="stylesheet/less">

        </head>

        <body>

            <div id="msg"></div>
        <?php
    }    
    
    function doFooter($v='index'){
        ?>
        <!-- JS-->
          <script src="js/plugins/jquery.min.js"></script>
          <script src="js/plugins/jquery-ui.min.js"></script>
          <script src="js/plugins/less.min.js"></script>
          <script src="js/plugins/cracked.min.js"></script>
          <script src="js/<?php echo $v; ?>.js"></script>

        </body>
        </html>
        <?php
    }
    
    
}


    
 