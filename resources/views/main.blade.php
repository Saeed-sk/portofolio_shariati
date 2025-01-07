@extends('layout.main_layout')
@section('content')
    <div class="loading-wrapper fixed w-full h-full z-50 bg-black flex flex-col justify-center items-center gap-1">
        <div id="loadingText" class="text-2xl text-gray-100 h-10 font-semibold animate-pulse">
            {{env('APP_NAME')}}

        </div>
        <div class="loader"></div>
    </div>

    <div class="max-h-svh h-full fixed top-0 left-0 w-full -z-10 " id="background"></div>

    <main class=" mx-0 w-full h-full " id="main-container">
        <div class="main-wrapper relative">
            <section class="video-wrapper relative z-20 ">
                @if(isset($video))
                    <div class=" h-svh absolute top-0 left-0 w-full z-10 " id="video-container">
                        <video id="my-video" src="{{ asset('files/'.$video->url) }}"
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
            <section class="images-wrapper w-full flex flex-col justify-center mx-0">
                @forelse($images as $image)
                    <div
                            @class([
                                ' image-container flex flex-col relative overflow-hidden min-h-svh h-full ',
                                ' w-[70%] md:w-[25%] items-center justify-center self-center' => $loop->first,
                                ' w-[90%] md:w-[50%] mt-0 lg:mt-52 '=> !$loop->first,
                                ' self-start ' => $loop->even ,
                                ' self-end ' => $loop->odd
                            ])
                    >

                        <figure
                            class="transition-all duration-500 ease-in-out transform h-full">
                            <img
                                    data-color="{{ $image->color }}"
                                    alt="{{ $image->alt }}"
                                    class="lazy-image w-full object-contain opacity-100 rounded overflow-clip"
                                    src="{{ asset('files/'.$image->url) }}"
                            />
                        </figure>

                        <h2 class="text-start opacity-0 mt-1 text-sm md:text-base px-2">
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


