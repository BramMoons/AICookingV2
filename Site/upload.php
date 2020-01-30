<?php

/* Getting file name */
$path = $_FILES['file']['name'];
$ext = pathinfo($path, PATHINFO_EXTENSION);
$filename = uniqid('image-',false) .'.'.$ext;

/* Location */
$location = "upload/".$filename;
$uploadOk = 1;
$imageFileType = pathinfo($location,PATHINFO_EXTENSION);

/* Valid Extensions */
$valid_extensions = array("jpg","jpeg","png");
/* Check file extension */
if( !in_array(strtolower($imageFileType),$valid_extensions) ) {
   $uploadOk = 0;
}

if($uploadOk == 0){
   echo 0;
}else{
   /* Upload file */
   if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
      echo $location;
   }else{
      echo 0;
   }
}