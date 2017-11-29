<!DOCTYPE html>
<html lang="en"><!-- InstanceBegin template="/Templates/temp.dwt" codeOutsideHTMLIsLocked="false" -->
<body style="overflow:-scroll; overflow-x:hidden">

<div class="STYLE1 container" id="header" style="background-color:#FFFFFF">
    <blockquote>
        <blockquote>
            <blockquote>
                <blockquote>
                    <blockquote>
                        <blockquote>
                            <blockquote>
                                <blockquote>
                                    <blockquote>
                                        <blockquote>
                                            <blockquote>
                                                <blockquote>
                                                    <blockquote>
                                                        <blockquote>
                                                            <blockquote>
                                                                <blockquote>
                                                                    <p><a href="index.html"><img src="gap.png" width="225" height="225" alt=""/></a></p>
                                                                    <div>Welcome to shop at GAP online store</div>
                                                                </blockquote>
                                                            </blockquote>
                                                        </blockquote>
                                                    </blockquote>
                                                </blockquote>
                                            </blockquote>
                                        </blockquote>
                                    </blockquote>
                                </blockquote>
                            </blockquote>
                        </blockquote>
                    </blockquote>
                </blockquote>
            </blockquote>
        </blockquote>
    </blockquote>
    <table width="1664" border="50">
        <tbody>
        <tr>
            <th width="290" height="52" scope="col"><a href="index.html">MEN</a></th>
            <th width="294" scope="col"><a href="women.html">WOMEN</a></th>
            <th width="292" scope="col"><a href="girls.html">GIRLS</a></th>
            <th width="291" scope="col"><a href="boys.html">BOYS</a></th>
            <th width="365" scope="col"><a href="baby.html">BABY</a></th>
        </tr>
        </tbody>
    </table>
</div>
</table>
</div>
<div class="row">
    <!-- InstanceBeginEditable name="EditRegion1" -->
</div>

<?php session_start();
if (isset($_POST['bi_address1'])) {
    $_SESSION['bi_address1'] = $_POST['bi_address1'];
    $_SESSION['bi_address2'] = $_POST['bi_address2'];
    $_SESSION['bi_city'] = $_POST['bi_city'];
    $_SESSION['bi_state'] = $_POST['bi_state'];
    $_SESSION['bi_zip'] = $_POST['bi_zip'];
    $_SESSION['name_card'] = $_POST['name_card'];
    $_SESSION['card_number'] = $_POST['card_number'];
    $_SESSION['date'] = $_POST['date'];
    $_SESSION['cvs'] = $_POST['cvs'];
}
?>
<div class ="container">
    <div class ="row">
        <div class ="col">
            <h1 style="text-align:center">SUMMARY</h1>

        </div>
    </div>
    <div class ="row">
        <div class="col-sm-6">
            <table class="table" ><tr><thead> <th>Item#</th><th>Product ID</th><th>Product Name</th><th>Size</th> <th> Quantity </th> <th>Price/item</th> <th>Cost</th></thead></tr>
                <?php
                include("summary.php");
                $session_basket=unserialize($_SESSION['basket']);
                reset($session_basket);
                $i=0;
                $t=0;
                while(list($k, $v) = each($session_basket)) {
                    $i++;

                    $item = $session_basket[$k];
                    $image = "" . $item->code . ".png";
                    $t=$t+($item->price*$item->quantity);
                    ?>
                    <tr>
                        <td><?php echo $i .")" ; ?> </td>
                        <td><?php echo $item->code; ?> </td>
                        <td><?php echo $item->name; ?> </td>
                        <td><?php echo $item->size; ?> </td>
                        <td><?php echo $item->quantity; ?> </td>
                        <td><?php echo $item->price; ?> </td>
                        <td><?php echo ($item->price*$item->quantity); ?> </td>
                    </tr>

                    <?php
                } //end of loop

                ?>
            </table>
            <h1 style="color:#000000"> TOTAL: <?php echo $t; ?> </h1>
        </div> <!-- sm-6 -->
        <div class="col-sm-6">
            <table class="table" width="1000" border="1" cellspacing="5" cellpadding="5">
                <h1 style="text-align:center">SHIPPING INFORMATION</h1>
                <tr>
                    <th scope="row">Last Name:</th>
                    <td><?php echo $_SESSION['last_name']?></td>

                </tr>
                <tr>
                    <th scope="row">First Name:</th>
                    <td><?php echo $_SESSION['first_name']?></td>
                </tr>
                <tr>
                    <th scope="row">Email:</th>
                    <td><?php echo $_SESSION['email']?></td>
                </tr>
                <tr>
                    <th scope="row">Phone number:</th>
                    <td><?php echo $_SESSION['phone']?></td>
                </tr>
                <tr>
                    <th scope="row">shipping Address:</th>
                    <td style="word-wrap:break-word;word-break:break-all">Address:<?php echo $_SESSION['address1']?>,<?php echo $_SESSION['address2']?> Ctiy:<?php echo $_SESSION['city']?>
                        State:<?php echo $_SESSION['state']?> Zip:<?php echo $_SESSION['zip']?>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> Name on Card：</th>
                    <td><?php echo $_SESSION['name_card']?></td>
                </tr>
                <tr>
                    <th scope="row">card number:</th>
                    <td><?php echo $_SESSION['card_number']?></td>
                </tr>
                <tr>
                    <th scope="row">Billing Address:</th>
                    <td style="word-wrap:break-word;word-break:break-all">Address:<?php echo $_SESSION['bi_address1']?>,<?php echo $_SESSION['bi_address2']?> Ctiy:<?php echo $_SESSION['bi_city']?> State:<?php echo $_SESSION['bi_state']?> Zip:<?php echo $_SESSION['bi_zip']?>
                    </td>
                </tr>
            </table>

<?php
require_once 'HTTP/Request2.php';
$request = new HTTP_Request2('https://supergalaxy.herokuapp.com/storeData');
$request->setMethod(HTTP_Request2::METHOD_POST)

    ->addPostParameter('bi_address1', $_SESSION['bi_address1'])
->addPostParameter('bi_address2', $_SESSION['bi_address2'])
->addPostParameter('bi_city', $_SESSION['bi_city'])
->addPostParameter('bi_state', $_SESSION['bi_state'])
->addPostParameter('bi_zip', $_SESSION['bi_zip'])
->addPostParameter('name_card', $_SESSION['name_card'])
->addPostParameter('card_number', $_SESSION['card_number'])
->addPostParameter('cvs', $_SESSION['cvs'])
->addPostParameter('last_name', $_SESSION['last_name'])
->addPostParameter('first_name', $_SESSION['first_name'])
    ->addPostParameter('date', $_SESSION['date'])
->addPostParameter('email', $_SESSION['email'])
->addPostParameter('phone', $_SESSION['phone'])
->addPostParameter('state', $_SESSION['state'])
    ->addPostParameter('address1', $_SESSION['address1'])
    ->addPostParameter('address2', $_SESSION['address2'])
    ->addPostParameter('state', $_SESSION['state'])
    ->addPostParameter('zip', $_SESSION['zip'])
->addPostParameter('ITEMNUMBER', $_SESSION['$item->code; ?'])
->addPostParameter(' ITEMNAME', $_SESSION[' $item->name; ?'])
->addPostParameter('SIZE', $_SESSION['$item->size; ?'])
->addPostParameter('QUANTITY; ?', $_SESSION['$item->quantity; ?'])
->addPostParameter('ITEMPRICE', $_SESSION['$item->price; ?'])
->addPostParameter('TOTALPRICE', $_SESSION['$item->price*$item->quantity']);
$request->setConfig(array(
    'ssl_verify_peer'   => FALSE,
    'ssl_verify_host'   => FALSE
));

try {
    $response = $request->send();
    if (200 == $response->getStatus()) {
        echo $response->getBody();
    } else {
        echo 'not success';
    }
} catch (HTTP_Request2_Exception $e) {
    echo 'not success';
    echo 'Error: ' . $e->getMessage();

}
?>


    <!-- InstanceEndEditable --></div>
<div id="footer" class="container"><img src="storeinfo2.png" width="1250"></div>

</body>
<!-- InstanceEnd --></html>