<?
mb_internal_encoding("UTF-8");
// ini_set('error_reporting', E_ALL);
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
use PHPMailer\PHPMailer\PHPMailer;

/* require_once($_SERVER['DOCUMENT_ROOT'] . '/smartbasket/php/config.php'); */
if ($_SERVER["REQUEST_METHOD"] == "POST") {

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if (isset($_POST['userName'])) {
			if (empty($_POST['userName'])) {
				echo 'notName';
			} else {
				$name = "<b>Имя: </b>" . strip_tags($_POST['userName']) . "; ";
			}
		}
		if (isset($_POST['userTel'])) {
			if (empty($_POST['userTel'])) {
				echo 'notTel';
			} else {
				$tel = "<b>Телефон: </b>" . strip_tags($_POST['userTel']) . "<br>";
			}
		}

		if (isset($_POST['userEmail'])) {
			if (empty($_POST['userEmail'])) {
				echo 'notEmail';
			} else {
				$email = "<b>Email: </b>" . strip_tags($_POST['userEmail']) . "<br>";
			}
		}

		/* if (isset($_POST['agreement'])) {
			echo 'agreement';
			if (empty($_POST['agreement'])) {
				echo 'agreement';
			} else {
				$agreement = "<b>Соглашение: </b>" . strip_tags($_POST['agreement']) . "<br>";
			}
		} */

		if (isset($_POST['finalPrice'])) {
			$finalPrice = "<b>Общая стоимость: </b>" . strip_tags($_POST['finalPrice']) . "<br>";
		}



		$productArr = [];
		$counter = 0;
		$body;
		$bodyHeader = '<table border="0" cellpadding="0" cellspacing="0" style="border-bottom:1px; border-right:1px; border-color:#e2e2e2; border-style: solid; width:800px" width="800" align="center">
			<tr >
				<th colspan="3" style="width: 400px; padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;">' . $name . $tel . $finalPrice . '</th>
				<th colspan="4" style="width: 400px; padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;">' . $email . "Условия принимаю" .  '</th>
			</tr>';

		foreach ($_POST as $key => $value) {
			$body .= '<tr>';
			if (is_array($value) || $value instanceof Traversable) {
				foreach ($value as $k => $v) {

					if ($k == 'productImg') {
						$productImg = '<img src="https://tripiroga.com/' . $v . '"  width="100" height="100" alt="картинка товара">';
						$body .=
							'
											<td style="width: 100px; padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
											<div style="padding: 5px;">
											'
							. $productImg .
							'
											</div></td>';
					}
					if ($k == 'productName') {
						$body .=
							'<td style="width: 300px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
											<div style="padding: 5px;">
											'
							. $v .
							'
											</div></td>';
					}
					if ($k == 'productSize') {
						if (!empty($v)) {
							$body .=
								'<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
											<div style="padding: 5px;"> Объём: 
											'
								. $v .
								'
											</div></td>';
						} else {
							$body .=
								'<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
									<div style="padding: 5px;"> Объём отстутствует </div>
								</td>';
						}
					}
					if ($k == 'productId') {
						$body .=
							'<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
												<div style="padding: 5px;"> ID: 
												'
							. $v .
							'
												</div></td>';
					}
					if ($k == 'productPrice') {
						$body .=
							'<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
												<div style="padding: 5px;"> Цена: 
												'
							. $v .
							'
												</div></td>';
					}
					if ($k == 'productQuantity') {
						$body .=
							'<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
												<div style="padding: 5px;"> Кол-во: 
												'
							. $v .
							'
												</div></td>';
					}

					if ($k == 'productPriceCommon') {
						$body .=
							'<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
												<div style="padding: 5px;"> Общая цена:
												'
							. $v .
							'
												</div></td>';
					}

				}

				$body .= '</tr>';
			}

		}
		;
		$bodybottom = '</table>';
	}

	if ($body) {
		/* $agreement = 'https://tripiroga.com\agreemets.html'; */
		// END
// ?????????? $headers ????? ??? Email ?????????
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n";
		$headers .= "To: <support@tripiroga.com>\r\n";
		// ????????? ??? Email
		$message = '
                <html>
                <head>
                <title>Заказ TriPiroga</title>
                </head>
                <body>
                <p>Номерb/n</p>
                <p> ' . $bodyHeader . $body . $bodybottom . ' </p>
                </body>
                </html>
                ';
		// ????? ????????????? 

		mail($email, 'Заявка в Tri Piroga', $message, $headers);

	} else {
		header("Location: https://pay.freekassa.ru/?m=&oa=&o=&s=fa235d950cff3dba8816add59771fd6a&currency=RUB");
		exit;
	}
}