<nav class="menu-nav z-20 fixed flex flex-row-reverse w-full justify-between p-4 top-0 invert-text">
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
    class="menu-body ql-font-Fjalla-One z-10 fixed max-h-svh h-full w-full glass scale-y-0 flex flex-col justify-between ">
    <div class="flex-1 flex flex-col w-full h-full items-center justify-center lg:gap-1">
        @forelse($titles as $title)
            <a class="titles text-xl md:text-2xl lg:text-3xl capitalize"
               href="{{ route('section', $title['id']) }}">{{ $title['title'] }}
            </a>
        @empty
            <p>sections is empty</p>
        @endforelse

        <a class="titles text-xl md:text-2xl lg:text-3xl" href="{{route('contact')}}">Contact us</a>
        <a href="/" class="titles text-xl md:text-2xl lg:text-3xl capitalize">
            Home
        </a>
    </div>
    <div class="w-full flex items-center justify-center gap-2 mb-10">
        @foreach($menuLinks as $link)
            @if($link['name'] === 'instagram')
                <a class="w-10 h-10 titles " href="{{$link['url']}}">
                    <svg fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-143 145 512 512" xml:space="preserve">
                <g>
                    <path d="M113,446c24.8,0,45.1-20.2,45.1-45.1c0-9.8-3.2-18.9-8.5-26.3c-8.2-11.3-21.5-18.8-36.5-18.8s-28.3,7.4-36.5,18.8
                        c-5.3,7.4-8.5,16.5-8.5,26.3C68,425.8,88.2,446,113,446z"/>
                    <polygon points="211.4,345.9 211.4,308.1 211.4,302.5 205.8,302.5 168,302.6 168.2,346 	"/>
                    <path d="M183,401c0,38.6-31.4,70-70,70c-38.6,0-70-31.4-70-70c0-9.3,1.9-18.2,5.2-26.3H10v104.8C10,493,21,504,34.5,504h157
                        c13.5,0,24.5-11,24.5-24.5V374.7h-38.2C181.2,382.8,183,391.7,183,401z"/>
                    <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M241,374.7v104.8
                        c0,27.3-22.2,49.5-49.5,49.5h-157C7.2,529-15,506.8-15,479.5V374.7v-52.3c0-27.3,22.2-49.5,49.5-49.5h157
                        c27.3,0,49.5,22.2,49.5,49.5V374.7z"/>
                </g>
            </svg>
                </a>
            @elseif($link['name'] === 'Behance')
                <a class="w-10 titles" href="{{$link['url']}}">
                    <svg fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                <g>
                    <path d="M344.1,244.5c-4.9-4.2-11-6.3-18.2-6.3c-7.8,0-13.9,2.2-18.3,6.7c-4.3,4.5-7,10.5-8.2,18.1h52.7
                        C351.7,254.9,348.9,248.8,344.1,244.5z"/>
                    <path d="M214.3,266.1c-3.8-1.7-9-2.6-15.8-2.7h-39v42.2H198c6.9,0,12.2-0.9,16-2.8c7-3.5,10.4-10,10.4-19.7
                        C224.4,274.9,221,269.2,214.3,266.1z"/>
                    <path d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M291.6,182.3h67.8V202h-67.8
                        L291.6,182.3L291.6,182.3z M250.7,310.6c-3,4.9-6.7,9.1-11.2,12.4c-5,3.9-11,6.5-17.9,8c-6.9,1.4-14.3,2.1-22.4,2.1H128V174.9h76.5
                        c19.3,0.3,33,5.9,41,16.9c4.8,6.7,7.2,14.8,7.2,24.2c0,9.6-2.4,17.4-7.3,23.3c-2.7,3.3-6.8,6.3-12.1,9c8.1,3,14.2,7.6,18.3,14
                        s6.2,14.1,6.2,23.2C257.8,294.7,255.4,303.1,250.7,310.6z M384,283.2h-85.2c0.5,11.7,4.5,20,12.2,24.7c4.7,2.9,10.3,4.4,16.9,4.4
                        c6.9,0,12.6-1.8,17-5.4c2.4-1.9,4.5-4.6,6.3-8.1h31.2c-0.8,6.9-4.6,14-11.3,21.2c-10.5,11.4-25.1,17.1-44,17.1
                        c-15.6,0-29.3-4.8-41.2-14.4c-11.9-9.6-17.9-25.2-17.9-46.8c0-20.3,5.4-35.8,16.1-46.6c10.8-10.8,24.7-16.2,41.8-16.2
                        c10.2,0,19.4,1.8,27.5,5.5c8.2,3.6,14.9,9.4,20.2,17.3c4.8,6.9,7.9,15,9.3,24.2C383.8,265.4,384.1,273.1,384,283.2z"/>
                    <path d="M214.8,233.3c4.3-2.6,6.4-7.3,6.4-13.9c0-7.4-2.8-12.2-8.5-14.6c-4.9-1.6-11.1-2.5-18.7-2.5h-34.4v34.9H198
                        C204.9,237.3,210.4,236,214.8,233.3z"/>
                </g>
                </svg>
                </a>
            @elseif($link['name'] === 'linkedin')
                <a class="w-10 titles" href="{{$link['url']}}">
                    <svg fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-143 145 512 512" xml:space="preserve">
                <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9
                    V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7
                    C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6
                    c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z
                    "/>
                </svg>
                </a>
            @endif
        @endforeach
    </div>
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
         class="z-10 fixed min-h-svh scale-y-0 w-full bg-black flex flex-col lg:p-5">
        @isset($info->images[0])
            <div class="body-item flex-1 w-full h-full flex justify-center items-center">
                <img class="w-full md:w-[50%] lg:w-[30%] max-h-72 h-full object-contain"
                     src="{{ asset('files/' . $info->images[0]->url) }}"
                     alt="{{ $info->images[0]->alt }}">
            </div>

            <div class="w-full grid grid-cols-1 gap-10 lg:grid-cols-3 justify-between relative z-20 text-gray-100">
                @isset($info->images[0])
                    <div class="body-item basis-2/5 h-full flex justify-center text-center lg:text-start items-center p-3 lg:p-0">
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
                    <div class="flex flex-col gap-0.5 justify-end items-end mb-10 lg:mb-0">
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

