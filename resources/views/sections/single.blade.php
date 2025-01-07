@extends('layout.section_layout')
@section('content')
    <main data-template="single" class="z-0 relative h-svh w-screen overflow-clip">
        <div class="mySwiper single-swiper max-h-svh h-full w-full ">
            <div class="swiper-wrapper w-full">
                @forelse($section->images as $image)
                    <div class="swiper-slide h-full w-full relative flex ">
                        <div class="h-full w-full absolute z-0">
                            <img class="w-full h-full object-cover " src="{{ asset('files/' . $image->url) }}" alt="{{ $image->alt }}">
                        </div>
                        <div class="w-full flex items-center gap-x-5 flex-col lg:flex-row lg:m-10 p-3 relative z-10 bg-gray-100">
                            <div  class="w-full lg:w-[35%] h-1/2 lg:h-full relative group">
                                <img class="w-full h-full object-contain z-20" src="{{ asset('files/' . $image->url) }}" alt="{{ $image->alt }}">
                                <div class="absolute w-full transition-all h-full bg-opacity-70 top-0 left-0 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                    <a href="{{route('pdf.index', $image->id)}}" class="btn border hover:bg-gray-800 text-lg">
                                        show
                                    </a>
                                </div>
                            </div>

                            <div class="w-full lg:w-1/2 overflow-auto ">
                                <div class="ql-editor">
                                    {!! $image->content !!}
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
            <div class="swiper-button-prev"></div>        </div>
    </main>
@endsection
