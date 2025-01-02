@extends('layout.main_layout')
@section('content')
    <div class="loading-wrapper fixed w-full h-full z-50 bg-gray-400 flex flex-col justify-center items-center">
        <div class="loader"></div>
    </div>

    <div class="h-screen fixed top-0 left-0 w-full -z-10 " id="background"></div>

    <main class="mx-0 w-full h-full " id="main-container">
        <div class="main-wrapper relative">
            <section class="video-wrapper relative z-20 ">
                @if(isset($video))
                    <div class="h-screen absolute top-0 left-0 w-full z-10" id="video-container">
                        <video id="my-video" src="{{ asset('storage/'.$video->url) }}"
                               class="w-full h-full object-cover"
                               playsinline
                               autoplay
                               muted loop
                        >
                        </video>
                    </div>
                @else
                    no video found
                @endif
            </section>
            <section class="images-wrapper w-full flex flex-col justify-center mx-0 gap-y-[300px]">
                @forelse($images as $image)

                    <div
                            @class([
                                ' image-container flex flex-col h-full relative overflow-hidden ',
                                ' w-[70%] md:w-[30%] h-[50%] items-center justify-center min-h-screen self-center' => $loop->first,
                                ' w-[90%] md:w-[50%] '=> $loop->index !== 0,
                                'self-start' => $loop->even ,
                                'self-end ' => $loop->odd
                            ])
                    >

                        <figure class="transition-all duration-500 ease-in-out transform">
                            <img
                                    data-color="{{ $image->color }}"
                                    alt="{{ $image->alt }}"
                                    class="lazy-image w-full object-contain opacity-100 rounded overflow-clip"
                                    src="{{ asset('storage/'.$image->url) }}"
                            />
                        </figure>

                        <h2 class="text-start opacity-0 mt-1 text-sm md:text-base ">
                            {{$image->content}}
                        </h2>

                    </div>

                @empty
                    <p class="text-center">No images available.</p>
                @endforelse

            </section>
            <div class="h-[120vh] hidden md:block">

            </div>
        </div>
    </main>
@endsection


