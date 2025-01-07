@extends('layout.section_layout')
@section('content')
    <main data-template="single" class="z-0 relative h-svh w-screen overflow-clip">
        <div class="mySwiper single-swiper max-h-svh h-full w-full ">
            <div class="swiper-wrapper items-center">
                @forelse($section->images as $image)
                    <div class="swiper-slide h-full w-full relative flex items-center justify-center p-5">
                        <div class="h-full w-full absolute z-0">
                            <img class="w-full h-full object-cover" src="{{ asset('files/' . $image->url) }}" alt="{{ $image->alt }}">
                        </div>
                        <div class="flex items-center gap-x-5 justify-center relative z-10 h-full p-5 bg-gray-100 mx-auto">
                            <div class="relative group h-full ">
                                <img class="w-full h-full object-contain z-20" src="{{ asset('files/' . $image->url) }}" alt="{{ $image->alt }}">
                                <div class="absolute w-full transition-all h-full bg-black bg-opacity-70 top-0 left-0 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                    <a target="_blank" href="{{route('pdf.index', $image->id)}}" class="btn border hover:bg-gray-800 text-lg">
                                        show
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                    <p>images is empty</p>
                @endforelse
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    </main>
@endsection
