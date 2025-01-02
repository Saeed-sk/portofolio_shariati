@extends('layout.section_layout')
@section('content')
    <main data-template="group" class="z-0 relative flex h-screen w-full mx-auto overflow-clip ">
        <div class="mySwiper group-swiper w-full h-full p-10">
            <div class="swiper-wrapper items-center w-full h-full">
                @forelse($section->images as $image)
                    <div class="swiper-slide h-full w-full flex flex-col items-center justify-center ">
                        <!-- Content Section: Text and HTML content -->
                        <div class="w-full h-1/3 flex justify-center items-start mx-auto ql-editor p-0 m-0 overflow-hidden">
                            <div class="text transition-all">
                                {!! $image->content !!}
                            </div>
                        </div>

                        <!-- Image Section -->
                        <div class="w-full h-2/3 overflow-hidden flex items-center">
                            <a href="{{ route('pdf.index', $image->id) }}" class="w-full block image transition-all ">
                                <img class="w-full h-full object-cover" src="{{ asset('storage/' . $image->url) }}"
                                     alt="{{ $image->alt }}">
                            </a>
                        </div>
                    </div>
                @empty
                    <p class="text-center">No images available</p>
                @endforelse
            </div>

            <!-- Pagination for Swiper -->
            <div class="swiper-pagination"></div>
        </div>
    </main>


@endsection
