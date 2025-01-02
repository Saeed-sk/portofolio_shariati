import React from 'react';
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Create from "@/Pages/Admin/Info/links/create.jsx";

const Index = ({section, links, assetsPath}) => {
    const {data, setData, errors, post, processing} = useForm({
            title: 'info page',
            template: 'info',
            file: null,
            content: section?.images[0]?.content ?? '',
            preview: null,
            alt: section?.images[0]?.alt ?? '',
        }
    )
    const handleChange = (event) => {
        setData(event.target.id, event.target.value);
    }
    const onHandleSubmit = (event) => {
        event.preventDefault();
        post(route('info.update'));
    }
    const onHandleChangeFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setData('preview', URL.createObjectURL(file));
            }
        }
        setData(event.target.id, event.target.files[0]);
    };
    return (
        <AuthenticatedLayout>
            <Head title="Create Section"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-5">
                    {/* Form starts here */}
                    <form className="flex flex-col gap-5" onSubmit={onHandleSubmit} method="post">
                        <input
                            id="file"
                            name="file"
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={onHandleChangeFile}
                        />
                        {/* Images section */}
                        <div
                            className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 flex flex-col gap-5">

                            {/* Image preview */}
                            <label className="btn btn-secondary self-start" htmlFor="file">Image</label>
                            {errors?.file && <p className="form-error">{errors.file}</p>}

                            <div className="h-full w-full rounded-lg overflow-hidden relative flex items-center justify-center">
                                {data.preview &&
                                    <img className={'w-full object-cover'} src={data.preview} alt={data.alt ?? ''}/>}
                                {!data.preview && section?.images[0]?.url &&
                                    <img className={'w-full object-cover'} src={assetsPath + section?.images[0]?.url}
                                         alt={data.alt ?? ''}/>}
                                {!data.preview && !section?.images[0]?.url &&
                                    <div className="w-full h-full bg-gray-200 flex justify-center items-center">No image
                                        selected</div>}
                            </div>

                            {/* Image content */}

                            <div className="w-full">
                                <label className="form-label" htmlFor={`content`}>Content</label>
                                <textarea onChange={handleChange} placeholder={'text for the info page...'}
                                          className={'form-input w-full'}
                                          value={data.content}
                                          name="content" id="content" cols="30" rows="10">
                                </textarea>
                                {errors?.content && <p className="form-error">{errors.content}</p>}
                            </div>
                            {/* Alt text */}
                            <div className="w-full">
                                <label className="form-label" htmlFor={`alt`}>Alt Text</label>
                                <input

                                    type="text"
                                    id={`alt`}
                                    placeholder={'add alt text for the image...'}
                                    className="form-input w-full"
                                    value={data.alt}
                                    onChange={handleChange}
                                />
                                {errors?.alt && <p className="form-error">{errors.alt}</p>}
                            </div>
                        </div>

                        {/* Add new image button */}
                        <div className="flex gap-2">
                            <button type="submit" className="btn btn-primary" disabled={processing}>Save</button>
                        </div>
                    </form>
                </div>
                {links?.map((link, index) => (
                    <Create key={index} link={link}/>
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
