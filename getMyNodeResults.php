<?php
require_once 'HTTP/Request2.php';

$request = new HTTP_Request2('https://shocking-spell-99426.herokuapp.com/');
$request->setMethod(HTTP_Request2::METHOD_POST)
->addPostParameter('username', 'RenatoRiveraJr'); 
$request->setConfig(array(
               'ssl_verify_peer'   => FALSE,
               'ssl_verify_host'   => FALSE
               ));
//next send request and get response
//invoke request and get the response
 try {
               $response = $request->send();
               if (200 == $response->getStatus()) {
               echo $response->getBody();
               } else {
               echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
               $response->getReasonPhrase();
               }
} catch (HTTP_Request2_Exception $e) {
               echo 'Error: ' . $e->getMessage();
 }

?>
