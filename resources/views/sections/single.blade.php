@extends('layout.section_layout')
@section('content')
    <main data-template="single" class="z-0 relative h-screen w-screen overflow-clip">
        <div class="mySwiper single-swiper h-screen w-full ">
            <div class="swiper-wrapper items-center">
                @forelse($section->images as $image)
                    <div class="swiper-slide h-full w-full relative flex ">
                        <div class="h-full w-full absolute z-0">
                            <img class="w-full h-full object-cover" src="{{ asset('storage/' . $image->url) }}" alt="{{ $image->alt }}">
                        </div>
                        <div class=" flex items-center justify-between flex-col lg:flex-row m-5 lg:m-10 p-3 gap-5 relative z-10 bg-gray-100">
                            <a href="{{route('pdf.index', $image->id)}}" class="w-full lg:w-[35%] h-full">
                                <img class="w-full h-full object-cover" src="{{ asset('storage/' . $image->url) }}" alt="{{ $image->alt }}">
                            </a>

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
        </div>
    </main>
@endsection
