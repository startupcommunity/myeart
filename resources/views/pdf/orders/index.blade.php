@extends('pdf.layouts.main')

@section('content')
    <h1>Orden Nº {{ '000' . $order->id }}</h1>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Order Nº</th>
                <th>Subtotal</th>
                <th>Impuesto</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ $order->id }}</td>
                <td>{{ $order->subtotal }}</td>
                <td>{{ $order->taxt }}</td>
                <td>{{ $order->total }}</td>
            </tr>
        </tbody>
    </table>
@endsection
