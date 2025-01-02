import React from 'react';
import {Head, Link, router, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Icon from "@/Components/Icon/Icon.jsx";
import {summaryContent} from "@/helpers/summaryText.js";

const Index = ({section, assetsPath}) => {
    const {data, setData, put, errors, processing} = useForm({
        title: section?.title, template: section?.template,
    })

    const onHandleChange = (event) => {
        setData(event.target.id, event.target.value);
    }
    const onHandleSubmit = (event) => {
        event.preventDefault();
        put(route('sections.update', section.id))
    }

    return (<AuthenticatedLayout>
        <Head title="sections-setting"/>
        <div dir="ltr" className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-5">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 flex flex-col">
                    <label className="form-label" htmlFor="title">Menu Title</label>
                    <input
                        type="text"
                        id="title"
                        value={data.title}
                        onChange={onHandleChange}
                        className="form-input w-full"
                        placeholder="Enter the menu title."
                    />
                    {errors?.title && <p className="form-error">{errors.title}</p>}

                    <label className="form-label" htmlFor="template">Template</label>
                    <select
                        id="template"
                        name="template"
                        value={data.template}
                        onChange={onHandleChange}
                        className="form-input w-full pr-10">
                        <option disabled value="not_selected">Select a template:</option>
                        <option value="single">Single Template</option>
                        <option value="multiple">Group Template</option>
                    </select>
                    {errors?.template && <p className="form-error">{errors.template}</p>}

                    <button
                        type="submit"
                        className="btn btn-primary self-start mt-5"
                        onClick={onHandleSubmit}
                        disabled={processing}>
                        Save
                    </button>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative mb-24">

                    <div className="p-6 fixed bottom-0 left-0">
                        <Link href={route('sections.image.create', section.id)}>
                            <div className="p-6 fixed bottom-0 left-0">
                                <Link href={route('sections.image.create', section.id)}>
                                    <div className="btn btn-primary px-1 py-1 rounded">
                                        <Icon name={'add'} className={'text-3xl'}/>
                                    </div>
                                </Link>
                            </div>
                        </Link>
                    </div>

                    <div>
                        <div className="overflow-x-auto">
                            {section?.images?.length > 0 ? (
                                <table className="min-w-full table-auto border-collapse border border-gray-200">
                                    <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b text-left text-sm sm:text-base">#</th>
                                        <th className="px-4 py-2 border-b text-left text-sm sm:text-base">content</th>
                                        <th className="px-4 py-2 border-b text-left text-sm sm:text-base">pdf</th>
                                        <th className="px-4 py-2 border-b text-left text-sm sm:text-base">image</th>
                                        <th className="px-4 py-2 border-b text-left text-sm sm:text-base">
                                            <span className="sr-only">Edit</span>
                                        </th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {section?.images?.map((image, index) => (<tr key={index}>
                                            <td className="border px-4 py-2 text-sm sm:text-base">{image.id}</td>

                                            <td className="border px-4 py-2 text-sm sm:text-base">
                                                <p>
                                                    {summaryContent({
                                                        htmlContent: image?.content, maxLength: 20
                                                    })}
                                                </p>
                                            </td>
                                            <td className="border px-4 py-2 text-sm sm:text-base">{image?.pdfs ? (
                                                <button
                                                    onClick={() => {
                                                        window.open(assetsPath + image?.pdfs?.url, '_blank')
                                                    }}
                                                    className="text-green-600  hover:text-green-800"
                                                >
                                                    <Icon name={'pdf'} className={'text-xl'}/>
                                                </button>) : ('ندارد')}</td>
                                            <td className="border px-4 py-2 text-sm sm:text-base flex relative h-[70px] overflow-hidden justify-center">
                                                <img
                                                    key={index}
                                                    onClick={() => {
                                                        window.open(assetsPath + image?.url, '_blank')
                                                    }}
                                                    className="mr-2 object-cover transition-all cursor-pointer top-1 h-[60px] border rounded z-0 hover:z-10 hover:scale-110"
                                                    src={assetsPath + image?.url}
                                                    alt={image?.alt}
                                                />
                                            </td>
                                            <td className="border px-4 py-2 text-sm sm:text-base">
                                                <div className={'flex gap-3'}>
                                                    <Link
                                                        href={route('sections.image.edit', image.id)}
                                                        className="text-green-600  hover:text-green-800">
                                                        <Icon name={'edit'} className={'text-xl'}/>
                                                    </Link>
                                                    <button type={'button'} onClick={() => {
                                                        if (confirm('Are you sure you want to delete this photo ?')) {
                                                            router.delete(route('sections.image.destroy', image.id), {
                                                                preserveScroll: true, preserveState: true
                                                            })
                                                        }
                                                    }}
                                                            className="text-red-600 hover:text-red-800">
                                                        <Icon name={'delete'} className={'text-xl'}/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>) : (<p className="text-red-600 text-center m-10">هیچ بخشی وجود ندارد</p>)}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>);
};

export default Index;
