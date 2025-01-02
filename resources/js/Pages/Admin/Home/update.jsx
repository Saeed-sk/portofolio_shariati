import React, {useState} from 'react';
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ColorPicker from 'react-best-gradient-color-picker'

const Update = ({home, assetsPath}) => {
    const {data, setData, post, processing, errors} = useForm({
        id: home.id,
        file: null,
        type: home.type,
        alt: home.alt,
        color: home.color,
        content: home.content,
        status: home.status,
    });
    const [preview, setPreview] = useState(null)

    function onHandleChangeFile(event) {
        const file = event.target.files[0];
        setData('file', file);

        // Check file type
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }

    function onHandleChange(event) {
        setData(event.target.name, event.target.value);
    }

    function onHandleSubmit(event) {
        event.preventDefault();
        post(route('home.update'));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Upadate Home"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-5">
                    <div>
                        <form className={'flex flex-col gap-5 '} onSubmit={onHandleSubmit}>
                            <input type="hidden" name="type" value="image"/>
                            <div
                                className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative p-5 flex flex-col items-start gap-5">
                                <label htmlFor="file" className="btn btn-primary">Upload file (image)</label>
                                <input type="file"
                                       onChange={(event) => onHandleChangeFile(event)}
                                       name="file" id="file" className="hidden"
                                       accept="image/*"
                                />
                                {errors?.file && <p className="form-error">{errors.file}</p>}
                                <div className="h-full w-full rounded-lg overflow-hidden relative flex items-center justify-center">
                                    {
                                        preview ? (
                                            <img src={String(preview)} className="object-contain"
                                                 alt={'preview'}/>
                                        ) : (
                                            <img className={'object-contain'}
                                                 src={assetsPath + home.url} alt=""/>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative p-5">
                                <label htmlFor="alt" className="form-label">
                                    Alt text
                                </label>
                                <input required={true} type="text" name="alt" id="alt" className="form-input w-full"
                                       value={data?.alt} onChange={(event) => onHandleChange(event)}
                                />
                                {errors?.alt && <p className="form-error">{errors.alt}</p>}
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative p-5">
                                <label htmlFor="content" className="form-label">
                                    Title under the photo
                                </label>
                                <input required={true} type="text" name="content" id="content"
                                       className="form-input w-full"
                                       value={data?.content} onChange={(event) => onHandleChange(event)}/>
                                {errors?.content && <p className="form-error">{errors.content}</p>}
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative p-5">
                                <label htmlFor="status" className="form-label">publish</label>
                                <select
                                    required={true}
                                    className={'form-input w-full pr-10'}
                                    name="status"
                                    id="status"
                                    value={data?.status}
                                    onChange={(event) => onHandleChange(event)}
                                >
                                    <option disabled={true} value="">publish</option>
                                    <option value="active">active</option>
                                    <option value="inactive">inactive</option>
                                </select>
                                {errors?.status && <p className="form-error">{errors.status}</p>}
                            </div>
                            <div
                                className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative p-5 flex flex-col">
                                <label htmlFor="color" className="form-label text-lg font-bold mb-4">Color Gradient selection</label>
                                {errors?.color && <p className="form-error">{errors.color}</p>}

                                <div dir={'ltr'}
                                     className={'border inline-block p-5 rounded-lg self-center'}>
                                    <ColorPicker
                                        hideGradientAngle={false}
                                        hideInputType={true}
                                        hideInputValue={false}
                                        hideGradientControls={false}
                                        value={data.color || home.color || '#ffffff'}
                                        onChange={(value) => setData('color', value)}
                                        hideColorTypeBtns={false}
                                        disableDarkMode={true}
                                    />

                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary self-start">save</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
};

export default Update;
