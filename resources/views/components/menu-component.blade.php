<nav class="menu-nav z-20 fixed flex w-full justify-between p-4 top-0 invert-text">
    <button class="menu-btn h-6 w-6">
        <svg class="hidden" width="100%" height="100%" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M12 10.9394L16.9697 5.96961L18.0304 7.03027L13.0606 12L18.0303 16.9697L16.9697 18.0304L12 13.0607L7.03045 18.0302L5.96979 16.9696L10.9393 12L5.96973 7.03042L7.03039 5.96976L12 10.9394Z"
                  fill="currentColor"/>
        </svg>

        <svg class="" width="100%" height="100%" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M50,12.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z" fill="currentColor"/>
            <path d="M50,28H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z" fill="currentColor"/>
            <path d="M50,43.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z" fill="currentColor"/>
        </svg>
    </button>

</nav>

<div
    class="menu-body z-10 fixed min-h-screen w-full glass scale-y-0 flex flex-col justify-center items-center gap-2 ">
    @forelse($titles as $title)
        <a class="titles text-xl md:text-2xl lg:text-3xl capitalize"
           href="{{ route('section', $title['id']) }}">{{ $title['title'] }}</a>
    @empty
        <p>sections is empty</p>
    @endforelse

    <a href="/" class="titles text-xl md:text-2xl lg:text-3xl capitalize text-gray-800">
        Home
    </a>
    <a class="titles text-xl md:text-2xl lg:text-3xl text-gray-800" href="{{route('contact')}}">Contact us</a>
</div>


@if($showInfo)
    <nav class="info-nav z-20 fixed flex w-full justify-between p-4 bottom-0 invert-text">
        <div class="scroll-percent w-10">0%</div>
        <div>{{env('APP_NAME')}}</div>
        <button class="self-start" id="menu-btn">
            Info
        </button>
    </nav>

    <div id="info-body"
         class="z-10 fixed min-h-screen scale-y-0 w-full bg-[#eae800] flex flex-col p-5">
        @isset($info->images[0])
            <div class="body-item flex-1 w-full h-full flex justify-center items-center">
                <img class="w-full md:w-[50%] lg:w-[30%] max-h-72 object-cover" src="{{ asset('storage/' . $info->images[0]->url) }}"
                     alt="{{ $info->images[0]->alt }}">
            </div>

            <div class="w-full grid grid-cols-1 gap-10 lg:grid-cols-3 justify-between relative z-20">
                @isset($info->images[0])
                    <div class="body-item basis-2/5 h-full flex justify-center text-center lg:text-start items-center">
                        {{ $info->images[0]->content }}
                    </div>
                @endisset
                <div class="body-item flex justify-center lg:justify-end items-center flex-col">
                    <div class="flex flex-col items-center lg:items-stretch justify-center gap-0.5">
                        <!-- شماره تماس -->
                        @foreach($links as $link)
                            @if($link['type'] === 'phone')
                                <a href="tel:{{ $link['url'] }}">{{ $link['url'] }}</a>
                            @endif
                        @endforeach

                        <!-- ایمیل -->
                        @foreach($links as $link)
                            @if($link['type'] === 'email')
                                <a href="mailto:{{ $link['url'] }}">{{ $link['url'] }}</a>
                            @endif
                        @endforeach

                        <!-- لینک‌های اجتماعی -->
                        @foreach($links as $link)
                            @if($link['type'] === 'social' && $link['name'] !== 'code')
                                <a href="{{ $link['url'] }}">{{ $link['name'] }}</a>
                            @endif
                        @endforeach

                    </div>
                </div>

                <div class="body-item flex flex-col justify-center lg:justify-end items-center lg:items-end">
                    <div class="flex flex-col gap-0.5 justify-end items-end">
                        @foreach($links as $link)
                            @if($link['type'] === 'social' && $link['name'] === 'code')
                                <a href="{{ $link['url'] }}">{{ $link['name'] }}</a>
                            @endif
                        @endforeach
                    </div>
                </div>

            </div>
        @else
            <p>Info is empty</p>
        @endisset
    </div>
@endif

