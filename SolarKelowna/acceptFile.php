<?php

$data = file_get_contents("doc.json");
$json = json_decode($data,true);
$features = $json["features"];
$coord = $json["features"][0]["geometry"]["coordinates"];
for($h = 0; $h < count($features);$h++){
    $index = $json["features"][$h]["geometry"]["coordinates"];
    $string1="\nbuilding id: ".($h+1);
    file_put_contents("organized_json.txt", $string1,FILE_APPEND);
    for($i=0; $i < count($index);$i++){
        
        for($j=0; $j < count($index[$i]);$j++){
            for($k=0; $k < count($index[$i][$j]);$k++){
                file_put_contents("organized_json.txt", "\n",FILE_APPEND);
                for($l=0; $l < count($index[$i][$j][$k]);$l++){
                    $string2= $index[$i][$j][$k][$l]." ";
                    file_put_contents("organized_json.txt", $string2,FILE_APPEND);
            }
        }
    }
}
}


?>