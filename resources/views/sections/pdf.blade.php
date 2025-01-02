@extends('layout.section_layout')

@section('content')
    <iframe class="w-full h-screen" src="{{ asset('storage/'.$pdf->url) }}" frameborder="0" sandbox="allow-scripts allow-same-origin"></iframe>
@endsection
