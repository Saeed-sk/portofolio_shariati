import React, {Fragment, useState} from 'react';
import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import TextEditor from "@/Components/TextEditor.jsx";


const Update = ({prevData, assetsPath, errors, template}) => {
    const [data, setData] = useState({
        type: 'update',
        id: prevData?.id ?? '',
        file: null,
        content: prevData?.content ?? '',
        pdf: null,
        alt: prevData?.alt ?? '',
        background: null,
        template: template
    });
    const templateLogic = template !== 'pdfTemplate';
    const [backgroundPreview, setBackgroundPreview] = useState(null)
    const [preview, setPreview] = useState(null)
    const [processing, setProcessing] = useState(false);
    const onHandleChangeFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setData((prev) => ({
                    ...prev,
                    file: file,
                }));
                setPreview(URL.createObjectURL(file));
            } else if (file.type === 'application/pdf') {
                setData((prev) => ({
                    ...prev,
                    previewPdf: URL.createObjectURL(file),
                    pdf: file,
                }));
            }
        }
    };
    const onHandleChange = (event) => {
        setData((prev) => ({
            ...prev,
            [event.target.id]: event.target.value,
        }));
    };

    const onHandleChangeBackground = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData((prev) => ({
                ...prev,
                background: file,
            }));
            setBackgroundPreview(URL.createObjectURL(file));
        }
    }
    const onHandleSubmit = async (event) => {
        event.preventDefault();

        // Prepare form data

        await router.post(route('sections.image.update', data.id), data, {
            onBefore: () => {
                setProcessing(true);
            },
            onFinish: () => {
                setProcessing(false);
            },
        })
    };

    return (
        <AuthenticatedLayout>
            <Head title="Update Section"/>
            <div dir="ltr" className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-5">
                    {/* Form starts here */}
                    <form className="flex flex-col gap-5" onSubmit={onHandleSubmit}>
                        <input
                            id="file"
                            name="file"
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={onHandleChangeFile}
                        />
                        {/* Images section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 flex flex-col gap-5">
                            {/* Image preview */}
                            <label className="btn btn-secondary self-start" htmlFor="file">Image</label>
                            {errors?.file && <p className="form-error">{errors.file}</p>}

                            <div
                                className="h-full w-full rounded-lg overflow-hidden relative flex items-center justify-center">
                                {preview &&
                                    <img className={'object-cover rounded-lg object-center w-full'}
                                         src={String(preview)}
                                         alt={data.alt ?? ''}/>}
                                {preview === null && prevData.url && (
                                    <img src={assetsPath + prevData.url} alt=""/>
                                )}
                            </div>

                            {templateLogic && (
                                <div className="w-full">
                                    <label className="form-label" htmlFor={`content`}>Content</label>
                                    <TextEditor
                                        name={'content'}
                                        value={data.content}
                                        onChange={(content) => setData((prev) => ({...prev, content}))}
                                    />
                                    {errors?.content && <p className="form-error">{errors.content}</p>}
                                </div>                            )}

                            {/* Alt text */}
                            <div className="w-full">
                                <label className="form-label" htmlFor={`alt`}>Alt Text</label>
                                <input
                                    type="text"
                                    id={`alt`}
                                    className="form-input w-full"
                                    value={data.alt}
                                    onChange={onHandleChange}
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


                            <Fragment>
                                <label className="btn btn-secondary self-start" htmlFor="background">background</label>
                                <input
                                    id="background"
                                    name="background"
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={onHandleChangeBackground}
                                />
                            </Fragment>
                            {/* Images section */}

                            {/* Image preview */}
                            {errors?.background && <p className="form-error">{errors.background}</p>}

                            <div
                                className="h-full w-full rounded-lg overflow-hidden relative flex items-center justify-center">
                                {backgroundPreview &&
                                    <img className={'object-cover rounded-lg object-center w-full'}
                                         src={String(backgroundPreview)}
                                         alt={data.alt ?? ''}/>}
                                {backgroundPreview === null && prevData?.pdfs?.image_url && (
                                    <img src={assetsPath + prevData?.pdfs?.image_url} alt=""/>
                                )}
                            </div>
                        </div>


                        {/* Submit button */}
                        <div className="flex gap-2">
                            <button type="submit" className="btn btn-primary" disabled={processing}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Update;
