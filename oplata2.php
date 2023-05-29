<!DOCTYPE html>
<html lang="ru">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=7">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.7.0.js"
        integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
</head>

<body>
    <div class="forms">
        <div>
            <h1 class="texts">Три пирога</h1>
            <h1>Оплата заказа</h1>
        </div>
        <div>
            <table>
                <thead>
                    <tr id="result">
                        <th scope="col">#</th>
                        <th scope="col">Наименование продукта</th>
                        <th scope="col">Кол-во</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Сумма</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $totalPrice = 0;
                    $quant = 0;
                    $i = 0;
                    if (isset($_POST['data']) && $_POST['data']) {
                        $data = json_decode(($_POST['data']), true); // Преобразование строки в массив
                        $count = count($data);
                        echo $count;
                        foreach ((array) $data as $key => $value) {
                            $i++;
                            if ($count === $i) {                                
                                echo '<tr>' .
                                    "<td>{$i}</td>" .
                                    "<td>{$value['sbName']}</td>" .
                                    "<td>{$value['sbQuantity']}</td>" .
                                    "<td>{$value['sbPrice']}</td>" .
                                    "<td>{$value['sbPriceCommon']}</td>" .
                                    '</tr>';
                                $totalPrice += $value['sbPriceCommon'];
                                $quant += $value['sbQuantity'];
                                return;
                            }                           
                        }
                        echo "<tr><td></td><td>Цена: </td><td>$quant</td><td></td><td>$totalPrice</td></tr>";
                    }
                    ?>
                </tbody>
            </table>

            <!--  <div id="result"></div> -->
            <!-- &total=<?php echo $totalPrice; ?> -->
            <iframe width="300" height="300"
                src="https://widget.qiwi.com/widgets/middle-widget-300x300?publicKey=48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPtQuuDszcZt3Gj7MUpRxKGo49f1uAuZRCx2VB2XUHkoV2pLgEd97fH1w7HQpNxirxhfGqfGHgM3VHXnKCR2k8Tp1qWmfNvgZQCybmtSjq6"
                allowtransparency="true" scrolling="no" frameborder="0">
                <input type="hidden" value="<?php echo $totalPrice; ?>">
            </iframe>
        </div>
    </div>
</body>

</html>

<style>
    .forms {
        margin-left: auto;
        margin-right: auto;
        width: 45em;
        padding: 50px;
        border-radius: 5%;
        border: outset;
        background: rgba(255, 234, 13, 0.5);
        opacity: none;
        filter: none;

    }

    .fon {
        background-image: url('images/fons.png');
        opacity: 0.4;
        filter: alpha(opacity=40);
    }

    .texts {
        font-family: "Lobster", cursive;
    }

    h1 {
        display: flex;
    }

    img {
        width: 251px;
        height: 159px;
    }
</style>

<script>
    var value = localStorage.getItem('basketItems');
    $.ajax({
        url: 'oplata.php',
        method: 'post',
        dataType: 'html',
        data: { data: value },
        success: function (data) {
            $('#result').html(data);
        }
    });
</script>