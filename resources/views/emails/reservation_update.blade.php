<!DOCTYPE html>
<html>
<head>
    <title>Reservation Update</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }

        h1 {
            color: #333;
            font-size: 24px;
            font-weight: bold;
        }

        p {
            color: #555;
            font-size: 16px;
            margin: 10px 0;
        }

        .bold {
            font-weight: bold;
             /* Green color to replace text-green-500 */
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            background-color: #fff;
            padding: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <h1>Reservation Update</h1>
    <p>Dear <span class="bold">{{ $reservation->user->name }}</span>,</p>
    <p>Your reservation for <span class="bold">{{ $reservation->product_name }} </span> has been {{ $status }}.</p>

    <p>Reservation Details:</p>
    <ul>
        <li>Product Name: {{ $reservation->product_name }}</li>
        <li>Product Price: {{ $reservation->product_price }} DH</li>
        <li>Product Description: {{ $reservation->product_description }}</li>
        <li>Quantity: {{ $reservation->product_qty }}</li>
    </ul>

    <p>Thank you for using our service.</p>
</body>
</html>
