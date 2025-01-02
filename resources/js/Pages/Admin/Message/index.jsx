import React, {Fragment} from 'react';
import {Head, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Icon from "@/Components/Icon/Icon.jsx";
import {summaryText} from "@/helpers/summaryText.js";
import Pagination from "@/Components/Pagination.jsx";

const Index = ({messages, assetsPath}) => {

    return (
        <AuthenticatedLayout>
            <Head title="home-setting"/>

            <div dir="ltr" className="py-12 relative w-full h-full">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-5 mb-20">
                    <div className="bg-white overflow-x-auto shadow-sm sm:rounded-lg relative p-5 flex flex-col ">
                        {messages?.data?.length > 0 ? (
                            <Fragment>
                                <table
                                    className="min-w-full overflow-x-auto table-auto border-collapse border border-gray-200">
                                    <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b text-left text-sm sm:text-base">#</th>
                                        <th className="px-4 py-2 border-b text-left text-sm sm:text-base">name</th>
                                        <th className="px-4 py-2 border-b text-left text-sm sm:text-base">email</th>
                                        <th className="px-4 py-2 border-b text-left text-sm sm:text-base">message</th>
                                        <th className="px-4 py-2 border-b text-left text-sm sm:text-base"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {messages?.data?.map((message) => (
                                        <tr key={message?.id}>
                                            <td className="border px-4 py-2 text-sm sm:text-base">{message?.id}</td>

                                            <td className="border min-w-[250px] px-4 py-2 text-sm sm:text-base">
                                                {message?.name}
                                            </td>

                                            <td className="border px-4 min-w-[250px] py-2 text-sm sm:text-base">{message?.email}
                                            </td>

                                            <td className="border px-4 min-w-[250px] py-2 text-sm sm:text-base">{message?.message}
                                            </td>
                                            <td className="border px-4 w-320 py-2 text-sm sm:text-base">
                                                <button onClick={() => {
                                                    router.delete(route('message.destroy', message.id))
                                                }}>
                                                    <Icon className={'text-xl'} name={'delete'}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <Pagination currentPage={messages?.current_page} lastPage={messages?.last_page}
                                            onPageChange={(page) => {
                                                router.get(route('message.index'), {page: page}, {
                                                    preserveState: true,
                                                    replace: true
                                                })
                                            }}/>
                            </Fragment>
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
