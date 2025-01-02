import React, {Fragment} from 'react';
import {Head, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Icon from "@/Components/Icon/Icon.jsx";
import {summaryText} from "@/helpers/summaryText.js";

const Index = ({video, images, assetsPath}) => {

    return (
        <AuthenticatedLayout>
            <Head title="home-setting"/>

            <div dir="ltr" className="py-12 relative w-full h-full">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-5 mb-20">
                    <div className="p-6 fixed bottom-0 left-0">
                        <Link href={route('home.create', {'type': 'image'})}>
                            <div className="btn btn-primary px-1 py-1 rounded">
                                <Icon name={'add'} className={'text-3xl'}/>
                            </div>
                        </Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative p-5 flex flex-col ">
                        {video?.url ? (
                            <Fragment>
                                <h2 className={'flex gap-1'}>
                                    <span>starter video</span>

                                    <span>
                                        <Link href={route('home.create', {'type': 'video'})}
                                              className="text-blue-700 text-xs underline">
                                            (change)
                                        </Link>
                                    </span>

                                </h2>
                                <video src={assetsPath + video.url} controls loop></video>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <label htmlFor="video" className="form-label">
                                    starter video
                                </label>
                                <p className="form-error w-full text-center">
                                    No video added.
                                    <a href={route('home.create', {'type': 'video'})}
                                       className="text-blue-700 underline">add starter video</a>
                                </p>
                            </Fragment>
                        )}
                    </div>
                    <div className="bg-white overflow-x-auto shadow-sm sm:rounded-lg relative p-5 flex flex-col ">
                        <h2 className="form-label">images</h2>
                        {images?.length > 0 ? (
                            <table
                                className="min-w-full overflow-x-auto table-auto border-collapse border border-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b text-left text-sm sm:text-base">#</th>
                                    <th className="px-4 py-2 border-b text-left text-sm sm:text-base">image</th>
                                    <th className="px-4 py-2 border-b text-left text-sm sm:text-base">title</th>
                                    <th className="px-4 py-2 border-b text-left text-sm sm:text-base">alt</th>
                                    <th className="px-4 py-2 border-b text-left text-sm sm:text-base">color</th>
                                    <th className="px-4 py-2 border-b text-left text-sm sm:text-base"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {images?.map((image) => (
                                    <tr key={image.id}>
                                        <td className="border px-4 py-2 text-sm sm:text-base">{image?.id}</td>
                                        <td
                                            onClick={() => window.open(assetsPath + image?.url, '_blank')}
                                            className="border px-1 py-2 text-sm sm:text-base flex items-center justify-center">
                                            <img className="w-[100px] h-[100px] object-contain rounded-lg overflow-clip"
                                                 src={assetsPath + image?.url} alt={image?.alt}
                                                 width="100" height="100"/>
                                        </td>
                                        <td className="border min-w-[250px] px-4 py-2 text-sm sm:text-base">
                                            {summaryText({text: image?.content, length: 5})}
                                        </td>

                                        <td className="border px-4 min-w-[250px] py-2 text-sm sm:text-base">{summaryText({
                                            text: image?.alt,
                                            length: 5
                                        })}</td>
                                        <td className="border px-4 py-2 text-sm sm:text-base">
                                            <div className={'w-10 h-10'} style={{background: image?.color}}/>
                                        </td>
                                        <td className="border  px-4 py-2 text-sm sm:text-base">
                                            <div className={'flex gap-2'}>
                                                <Link href={route('home.edit', image.id)}
                                                      className="text-blue-600 underline underline-offset-2 hover:text-blue-800">
                                                    <Icon name={'edit'} className={'text-xl'}/>
                                                </Link>
                                                <button type={'button'} onClick={() => {
                                                    if (confirm('Are you sure you want to delete this photo?')) {
                                                        router.delete(route('home.destroy', image.id), {
                                                            preserveScroll: true,
                                                            preserveState: true
                                                        })
                                                    }
                                                }}
                                                        className="text-red-600 underline underline-offset-2 hover:text-red-800">
                                                    <Icon name={'delete'} className={'text-xl'}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="form-error w-full text-center">
                                There is no data to display.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
