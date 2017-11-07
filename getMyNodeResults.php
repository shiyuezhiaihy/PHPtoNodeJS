<?php
	require_once 'HTTP/Request2.php';
	$request = new HTTP_Request2('https://supergalaxy.herokuapp.com');
	$request->setMethod(HTTP_Request2::METHOD_POST)
        ->addPostParameter('username', $_POST['name']);
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

<form method="post">
    <p>Name: <input type="text" name="name" /></p>
    <input type="submit" name="submit" value="Submit" />
</form>