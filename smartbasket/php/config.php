<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/smartbasket/php/phpmailer/phpmailer.php');

// *** SMTP *** //

/* require_once($_SERVER['DOCUMENT_ROOT'] . '/smartbasket/php/phpmailer/smtp.php');
const HOST = 'sandbox.smtp.mailtrap.io';
const LOGIN = '351b71c54cb015';
const PASS = '24e5b8f5aafe61';
const PORT = '2525'; */

// *** /SMTP *** //

const SENDER = 'tripiroga31@gmail.com';
const CATCHER = 'ahmedalisherj@gmail.com';
const SUBJECT = 'Заявка с сайта';
const CHARSET = 'UTF-8';