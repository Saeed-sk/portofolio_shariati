@extends('layout.section_layout')
@section('content')
    <main data-template="group" class="z-0 relative flex h-svh w-full mx-auto overflow-clip bg-gray-200 ">
        <div class="mySwiper group-swiper w-full h-full p-5 lg:p-10 lg:md:w-[1980px]">
            <div class="swiper-wrapper items-center w-full h-full">
                @forelse($section->images as $image)
                    <div class="swiper-slide h-full flex flex-col items-center justify-center w-[400px]">
                        <!-- Content Section: Text and HTML content -->
                        <div class="w-full h-1/3 flex justify-center items-start mx-auto ql-editor p-0 m-0 overflow-hidden">
                            <div class="text transition-all">
                                {!! $image->content !!}
                            </div>
                        </div>

                        <!-- Image Section -->
                        <div class="w-full h-2/3 overflow-hidden flex items-center relative group">
                            <div class="w-full h-full block image transition-all ">
                                <img class="w-full h-full object-cover" src="{{ asset('files/' . $image->url) }}"
                                     alt="{{ $image->alt }}">
                            </div>
                            <div class="image absolute w-full transition-all h-full bg-black bg-opacity-70 left-0 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                <a href="{{ route('pdf.index', $image->id) }}" class="btn border hover:bg-gray-800 text-lg">
                                    show
                                </a>
                            </div>
                        </div>
                    </div>
                @empty
                    <p class="text-center">No images available</p>
                @endforelse
            </div>

            <!-- Pagination for Swiper -->
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next top-[70%]"></div>
            <div class="swiper-button-prev top-[70%]"></div>
        </div>
    </main>


@endsection
