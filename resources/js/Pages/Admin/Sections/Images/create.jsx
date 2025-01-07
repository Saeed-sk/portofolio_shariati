import React, {Fragment} from 'react';
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import TextEditor from "@/Components/TextEditor.jsx";

const Create = ({id, template}) => {
    const {data, setData, errors, post, processing} = useForm({
            section_id: id,
            file: null,
            content: '',
            preview: null,
            pdf: null,
            previewPdf: null,
            background: null,
            backgroundPreview: null,
            alt: '',
            template: template
        }
    )

    const templateLogic = template!=='pdfTemplate'
    const onHandleSubmit = (event) => {
        event.preventDefault();
        post(route('sections.image.store', id));
    }
    const onHandleChangeFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setData('preview', URL.createObjectURL(file));
            } else if (file.type === 'application/pdf') {
                setData('previewPdf', URL.createObjectURL(file));
            }
        }
        setData(event.target.id, event.target.files[0]);
    };

    const onHandleChangeBackground = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData('backgroundPreview', URL.createObjectURL(file));
        }
        setData(event.target.id, event.target.files[0]);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Section"/>
            <div dir="ltr" className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-5">
                    {/* Form starts here */}
                    <form className="flex flex-col gap-5" onSubmit={onHandleSubmit} method="post">

                        {/* Images section */}
                        <div
                            className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 flex flex-col gap-5">
                            <input
                                id="file"
                                name="file"
                                className="hidden"
                                type="file"
                                accept="image/*"
                                onChange={onHandleChangeFile}
                            />
                            {/* Image preview */}
                            <label className="btn btn-secondary self-start" htmlFor="file">Image</label>
                            {errors?.file && <p className="form-error">{errors.file}</p>}

                            <div
                                className="h-full w-full rounded-lg overflow-hidden relative flex items-center justify-center">
                                {data.preview &&
                                    <img className={'w-full object-contain'} src={data.preview} alt={data.alt ?? ''}/>}
                                {!data.preview &&
                                    <div className="w-full h-full bg-gray-200 flex justify-center items-center">No image
                                        selected</div>}
                            </div>


                            {/* Image content */}

                            {templateLogic && (
                                <div className="w-full">
                                    <label className="form-label" htmlFor={`content`}>Content</label>
                                    <TextEditor
                                        name={'content'}
                                        value={data.content}
                                        onChange={(content) => setData((prev) => ({...prev, content}))}
                                    />
                                    {errors?.content && <p className="form-error">{errors.content}</p>}
                                </div>
                            )}
                            {/* Alt text */}
                            <div className="w-full">
                                <label className="form-label" htmlFor={`alt`}>Alt Text</label>
                                <input
                                    type="text"
                                    id={`alt`}
                                    className="form-input w-full"
                                    value={data.alt}
                                    onChange={(event) => setData('alt', String(event.target.value))}
                                />
                                {errors?.alt && <p className="form-error">{errors.alt}</p>}
                            </div>

                            {/* PDF upload */}
                            <div className="w-full">
                                <label className="form-label" htmlFor={`pdf`}>PDF</label>
                                <input
                                    type="file"
                                    id={`pdf`}
                                    className="form-input w-full"
                                    accept=".pdf"
                                    onChange={onHandleChangeFile}
                                />
                                {errors?.pdf && <p className="form-error">{errors.pdf}</p>}
                            </div>
                            {/* Background upload */}
                            <input
                                id="background"
                                name="background"
                                className="hidden"
                                type="file"
                                accept="image/*"
                                onChange={onHandleChangeBackground}
                            />
                            {/* Image preview */}
                            <label className="btn btn-secondary self-start" htmlFor="background">background</label>
                            {errors?.background && <p className="form-error">{errors.background}</p>}

                            <div
                                className="h-full w-full rounded-lg overflow-hidden relative flex items-center justify-center">
                                {data.backgroundPreview &&
                                    <img className={'w-full object-contain'} src={data.backgroundPreview}
                                         alt={data.alt ?? ''}/>}
                                {!data.backgroundPreview &&
                                    <div className="w-full h-full bg-gray-200 flex justify-center items-center">No image
                                        selected</div>}
                            </div>

                        </div>

                        {/* Add new image button */}
                        <div className="flex gap-2">
                            <button type="submit" className="btn btn-primary" disabled={processing}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
