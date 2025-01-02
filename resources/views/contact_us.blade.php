@extends('layout.section_layout')

@section('content')

    <main class="relative min-h-screen w-full flex flex-col lg:flex-row gap-5 justify-center items-center">
        <div class="w-full lg:w-1/4 ">
            <img src="{{asset('storage/'.$section->images[0]->url)}}" alt="">
        </div>
        <div class="w-full p-5 lg:p-0 lg:w-1/3 flex flex-col gap-5">
            <h3 class="text-5xl font-bold">{{$section->title}}</h3>
            <section class="w-full h-full">
                <form action="{{route('contact.create')}}" method="post"
                      class="w-full border-2 p-10 py-10 border-gray-600 flex flex-col gap-10"
                >
                    @csrf
                    <div class="relative z-0">
                        <input type="text" id="name" name="name" value="{{@old('name')}}"
                               class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "/>
                        <label for="name"
                               class="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Full
                            Name</label>
                        @error('name')
                            <p class="form-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="relative z-0">
                        <input type="email" id="email" name="email" value="{{@old('email')}}"
                               class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "/>
                        <label for="email"
                               class="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
                        @error('email')
                        <p class="form-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="relative z-0">
                        <input type="text" id="message" name="message" value="{{@old('message')}}"
                               class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "/>
                        <label for="message"
                               class="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Message</label>
                        @error('message')
                        <p class="form-error">{{ $message }}</p>
                        @enderror
                    </div>

                    @if (session('success'))
                        <div class="text-green-600">
                            {{ session('success') }}
                        </div>
                    @endif
                    <button type="submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 self-start">
                        {{$section->title}}
                    </button>

                </form>

            </section>
        </div>
    </main>
@endsection
