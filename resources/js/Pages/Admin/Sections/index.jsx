import React from 'react';
import {Head, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";
import Icon from "@/Components/Icon/Icon.jsx";

const Index = ({sections, assetsPath}) => {
    return (
        <AuthenticatedLayout>
            <Head title="sections-setting"/>
            <div dir="ltr" className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative mb-24">

                        <div className="p-6 fixed bottom-0 left-0">
                            <Link href={route('sections.create')}>
                                <div className="btn btn-primary px-1 py-1 rounded">
                                    <Icon name={'add'} className={'text-3xl'}/>
                                </div>
                            </Link>
                        </div>

                        <div>
                            <div className="overflow-x-auto">
                                {
                                    sections?.data?.length > 0 ? (
                                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                                            <thead>
                                            <tr>
                                                <th className="px-4 py-2 border-b text-left text-sm sm:text-base">#</th>
                                                <th className="px-4 py-2 border-b text-left text-sm sm:text-base">title</th>
                                                <th className="px-4 py-2 border-b text-left text-sm sm:text-base">template</th>
                                                <th className="px-4 py-2 border-b text-left text-sm sm:text-base">
                                                    images
                                                </th>
                                                <th className="px-4 py-2 border-b text-left text-sm sm:text-base"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {sections?.data?.map((section) => (
                                                <tr key={section.id}>
                                                    <td className="border px-4 py-2 text-sm sm:text-base">{section.id}</td>
                                                    <td className="border px-4 py-2 text-sm sm:text-base">{section?.title}</td>
                                                    <td className="border px-4 py-2 text-sm sm:text-base">
                                                        {section.template}
                                                    </td>
                                                    <td className="border px-4 py-2 text-sm sm:text-base flex relative h-[70px] overflow-hidden">
                                                        {section?.images?.map((image, index) => (
                                                            <img
                                                                key={index}
                                                                onClick={() => {
                                                                    window.open(assetsPath + image?.url, '_blank')
                                                                }}
                                                                className=" ml-2 absolute w-[40px] object-cover transition-all cursor-pointer top-1 h-[60px] border rounded z-0 hover:z-10 hover:scale-110"
                                                                style={{left: index * 12 + 'px'}}
                                                                src={assetsPath + image?.url}
                                                                alt={image?.alt}/>
                                                        ))}
                                                        {
                                                            section?.images?.length === 0 && (
                                                                <p className="form-error text-center w-full mt-3">There is no data to display.</p>)
                                                        }

                                                    </td>
                                                    <td className="border px-4 py-2 ">
                                                        <div className={'flex gap-3'}>
                                                            <Link
                                                                href={route('sections.edit', section.id)}
                                                                className="block text-blue-600 underline underline-offset-2 hover:text-blue-800">
                                                                <Icon name={'edit'} className={'text-xl'}/>
                                                            </Link>
                                                            <button type={'button'} onClick={(event) => {
                                                                event.preventDefault()
                                                                if (confirm('Are you sure you want to delete this photo?')) {
                                                                    router.delete(route('sections.destroy', section.id), {
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
                                        <p className="text-red-600 text-center m-10">There is no sections to display.</p>
                                    )
                                }
                                <Pagination currentPage={sections?.current_page} lastPage={sections?.last_page}
                                            onPageChange={(page) => {
                                                router.get(route('sections.index'), {page: page}, {
                                                    preserveState: true,
                                                    replace: true
                                                })
                                            }}/>

                                {/*<div className="">*/}
                                {/*    {{}}*/}
                                {/*</div>*/}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
