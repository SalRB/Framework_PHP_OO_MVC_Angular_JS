<?php
class controller_contact
{

	function sendEmail()
	{
		// echo json_encode($_POST);
		// exit;
		$message = [
			'type' => 'contact',
			'inputName' => $_POST['name'],
			'fromEmail' => $_POST['email'],
			'inputMatter' => $_POST['matter'],
			'inputMessage' => $_POST['message']
		];
		$email = json_decode(mail::send_email($message), true);
		if (!empty($email)) {
			echo json_encode('Done');
			return;
		}
		echo json_encode('Error!');
	}
}
