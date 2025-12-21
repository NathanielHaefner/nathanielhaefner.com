<?php
	ob_start();
	function url($url) {
	   $url = preg_replace('~[^\\pL0-9_]+~u', '-', $url);
	   $url = trim($url, "-");
	   $url = iconv("utf-8", "us-ascii//TRANSLIT", $url);
	   $url = strtolower($url);
	   $url = preg_replace('~[^-a-z0-9_]+~', '', $url);
	   return $url;
	}


	$email_to = "nathanielhaefner@gmail.com";
		//$to = "somebody@example.com, somebodyelse@example.com";
	$email_subject = "NH Communication Form Submission";
	$email_name = $_POST["name"];
	$person = url($email_name);
	$email_from = $_POST["email"];
	$email_message = $_POST["message"];


    define('UPLOAD_DIR', '../images/doodles/');
    $img = $_POST['hidden_data'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $filename = 'doodle_'.$person.'_'.date('m-d-Y_hia').'_'.uniqid().'.png';
    $file = UPLOAD_DIR.$filename;

    $success = file_put_contents($file, $data);
    // print $success ? $file : 'Unable to save the file.';

	$headers  = "MIME-Version: 1.0" . "\r\n";
    //$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1" . "\r\n";
    $headers .= "From: " . $email_from . "\r\n";
	$headers .= "Reply-To: " . $email_from . "\r\n";
    $message = '
        <html>
        <head>
         <title>'.$email_subject.'</title>
        </head>
        <body>
        	<p>From:</p>
        	<h1>'.$email_name.' ('.$email_from.')</h1>
        	<p>Message:</p>
        	<h2>'.$email_message.'</h2>
        	<p>Doodle:</p>
            <img src="https://nathanielhaefner.com/images/doodles/'.$filename.'"/>
        </body>
        </html>
        ';
	$sent = mail($email_to, $email_subject, $message, $headers);

	if ($sent) {
		header("Location: https://nathanielhaefner.com/thanks.html");
		exit();
	} else {
		header("Location: https://nathanielhaefner.com/404.html");
		exit();
	}
	//ob_end();
?>

