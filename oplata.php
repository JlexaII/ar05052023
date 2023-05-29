<div id="ans">
    <div class="forms">
        <h1 class="texts">Три пирога</h1>
        <table>
            <thead>
                <tr>
                    <th scope="col">№</th>
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
                if (isset($_POST['basketItems'])) {
                    $data = json_decode($_POST['basketItems'], true);
                    foreach ((array) $data as $value) {
                        $i++;
                        echo '<tr>' .
                            "<td>{$i}</td>" .
                            "<td>{$value['sbName']}</td>" .
                            "<td>{$value['sbQuantity']}</td>" .
                            "<td>{$value['sbPrice']}</td>" .
                            "<td>{$value['sbPriceCommon']}</td>" .
                            '</tr>';
                        $totalPrice += $value['sbPriceCommon'];
                        $quant += $value['sbQuantity'];
                    }
                    echo "<tr><td></td><td>Сумма: </td><td>$quant</td><td></td><td>$totalPrice</td></tr>";
                }
                ?>
                <input class="widget__input" id="donation-amount" value="<?php echo $totalPrice ?>" required>
                <iframe class="textss" id="iframe"
                    src="https://widget.qiwi.com/widgets/middle-widget-300x300?publicKey=48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPtQuuDszcZt3Gj7MUpRxKGo49f1uAuZRCx2VB2XUHkoV2pLgEd97fH1w7HQpNxirxhfGqfGHgM3VHXnKCR2k8Tp1qWmfNvgZQCybmtSjq6&noCache=true&amount=<?php echo $totalPrice ?>"
                    width="300" height="180" allowTransparency="true" scrolling="no" frameBorder="0">
                </iframe>
            </tbody>
        </table>
    </div>
</div>
<style>
    .forms {
        margin-left: auto;
        margin-right: auto;
        width: 24em;
        padding: 50px;
        border-radius: 5%;
        border: outset;
        background: rgba(255, 234, 13, 0.5);
        opacity: none;
        filter: none
    }

    .texts {
        font-family: "Lobster", cursive;
        margin-left: 114px;
    }

    .textss {
        font-family: "Lobster", cursive;
        margin-left: 53px;
    }

    table {
        margin-left: -11px;
        padding: 14px;
    }
</style>

<script>
    const basketItems = JSON.parse(localStorage.getItem('basketItems'));
    const xhr = new XMLHttpRequest();
    const url = "/oplata.php";
    const params = `basketItems=${encodeURIComponent(JSON.stringify(basketItems))}`;
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('ans').innerHTML = xhr.responseText
        }
    };
    xhr.send(params);


    var iframe = document.getElementById('iframe');

    iframe.addEventListener('load', function () {
        var widgetWindow = iframe.contentWindow;
        widgetWindow.WIDGET_API.setShowMoneyInput(true);
        widgetWindow.addEventListener('onChange', function (event) {
            var amount = event.detail.amount;
            var input = document.getElementById('donation-amount');
            if (input) {
                input.value = amount;
            }
        });
    });
    function setAmount(value) {
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({ type: "setAmount", amount: value }, "*");
        }
    }
</script>