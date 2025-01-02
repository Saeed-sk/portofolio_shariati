import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import TextEditor from "@/Components/TextEditor.jsx";

const Create = ({errors}) => {
    const {data, setData, post, processing} = useForm({
        title: '', // Menu title
        template: 'single', // Template type (single or group)
        images: [], // List of images
    });
    // Handle changes in text fields
    const onHandleChange = (event) => {
        setData(event.target.id, event.target.value);
    };

    // Submit the form
    const onHandleSubmit = (event) => {
        event.preventDefault();
        post(route('sections.store'));
    };

    // Handle image file uploads
    const onHandleChangeFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData('images', [
                ...data.images,
                {
                    id: data.images.length + 1,
                    file: file,
                    content: '',
                    preview: URL.createObjectURL(file),
                    pdf: null,
                    alt: ''
                },
            ]);
        }
    };

    // Handle PDF file uploads for an image
    const onHandleChangePdf = (event, index) => {
        const updatedImages = [...data.images];
        updatedImages[index].pdf = event.target.files[0];
        setData('images', updatedImages);
    };

    // Handle content changes for each image
    const onHandleChangeImageData = (content, index) => {
        const updatedImages = [...data.images];
        updatedImages[index].content = content;
        setData('images', updatedImages);
    };

    // Handle alternative text (alt) changes for each image
    const onHandleChangeAlt = (event, index) => {
        const updatedImages = [...data.images];
        updatedImages[index].alt = event.target.value;
        setData('images', updatedImages);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Section"/>
            <div dir="ltr" className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-5">
                    {/* Form starts here */}
                    <form className="flex flex-col gap-5" onSubmit={onHandleSubmit} method="post">

                        {/* Title input */}
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
                        </div>

                        {/* Template selection */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 flex flex-col">
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
                        </div>


                        {/* Images section */}
                        {data?.images?.length > 0 && <h3 className="form-label">Images</h3>}
                        {data?.images?.map((image, index) => (
                            <div
                                key={index}
                                className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 flex flex-col gap-5">

                                {/* Image preview */}
                                <h3>Image ({image.id})</h3>
                                <div className="h-52 w-full object-cover rounded-lg overflow-hidden relative">
                                    <img src={image.preview} alt={image.alt || `Image ${image.id}`} />

                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 m-2 btn btn-danger"
                                        onClick={() => {
                                            const updatedImages = data.images.filter((_, i) => i !== index);
                                            setData('images', updatedImages);
                                        }}>
                                        Delete
                                    </button>
                                </div>
                                {errors?.[`images.${index}.file`] && <p className="form-error">{errors[`images.${index}.file`]}</p>}

                                {/* Image content */}
                                <div className="w-full">
                                    <label className="form-label" htmlFor={`content-${index}`}>Content</label>
                                    <TextEditor
                                        name={'content'}
                                        value={image.content}
                                        onChange={(content) => setData((prev) => ({...prev, content}))}
                                    />
                                    {errors?.[`images.${index}.content`] && <p className="form-error">{errors[`images.${index}.content`]}</p>}
                                </div>

                                {/* Alt text */}
                                <div className="w-full">
                                    <label className="form-label" htmlFor={`alt-${index}`}>Alt Text</label>
                                    <input
                                        type="text"
                                        id={`alt-${index}`}
                                        className="form-input w-full"
                                        value={image.alt}
                                        onChange={(event) => onHandleChangeAlt(event, index)}
                                    />
                                    {errors?.[`images.${index}.alt`] && <p className="form-error">{errors[`images.${index}.alt`]}</p>}
                                </div>

                                {/* PDF upload */}
                                <div className="w-full">
                                    <label className="form-label" htmlFor={`pdf-${index}`}>PDF</label>
                                    <input
                                        type="file"
                                        id={`pdf-${index}`}
                                        className="form-input w-full"
                                        accept=".pdf"
                                        onChange={(event) => onHandleChangePdf(event, index)}
                                    />
                                    {errors?.[`images.${index}.pdf`] && <p className="form-error">{errors[`images.${index}.pdf`]}</p>}
                                </div>
                            </div>
                        ))}

                        {/* Add new image button */}
                        <div className="flex gap-2">
                            <label className="btn btn-secondary" htmlFor="file">Add Image</label>
                            <input
                                id="file"
                                name="file"
                                className="hidden"
                                type="file"
                                accept="image/*"
                                onChange={onHandleChangeFile}
                            />
                            <button type="submit" className="btn btn-primary" disabled={processing}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
