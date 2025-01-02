import React, {useState} from 'react';
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ColorPicker, {useColorPicker} from 'react-best-gradient-color-picker'

const Create = ({type}) => {
    const {data, setData, post, processing, errors} = useForm({
        file: '',
        type: type,
        alt: '',
        color: '',
        content: '',
        status: 'active',
    });
    const [preview, setPreview] = useState(null)

    function onHandleChangeFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Set the file in your state (for example, using setData)
        setData('file', file);


        // Handle image or video file preview
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const url = URL.createObjectURL(file);
            setPreview(url); // Set the preview to the file URL
        } else {
            // If it's an unsupported file type
            setPreview(null);
            alert('Unsupported file type');
        }
    }

    console.log(data)
    function onHandleChange(event) {
        setData(event.target.name, event.target.value);
    }

    function onHandleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('type', data.type);
        formData.append('alt', data.alt);
        formData.append('color', data.color);
        formData.append('content', data.content);
        formData.append('status', data.status);

        // Sending the form data using a post request
        post(route('home.store'), {
            data: formData, // Sending the FormData here
            forceFormData: true, // This forces Inertia to use FormData
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Create Home"/>
            <div dir="ltr" className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-5">
                    {type === 'image' ? (
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
                                        {preview && <img className={'w-full object-contain'} src={String(preview)} alt={data.alt ?? ''}/>}
                                        {!preview && <div className="w-full h-full bg-gray-200 flex justify-center items-center">No image selected</div>}
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
                                    <select required={true} className={'form-input w-full pr-10'} name="status"
                                            id="status" onChange={(event) => onHandleChange(event)}>
                                        <option disabled={true} value="">publish</option>
                                        <option selected={data.status === 'active'} value="active">active</option>
                                        <option selected={data.status === 'inactive'} value="inactive">inactive</option>
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
                                            value={data.color}
                                            onChange={(value) => setData('color', value)}
                                            hideColorTypeBtns={false}
                                            disableDarkMode={true}
                                        />

                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary self-start">save</button>
                            </form>
                        </div>
                    ) : type === 'video' ? (
                        <div>
                            <form className={'flex flex-col gap-5 '} onSubmit={onHandleSubmit}>
                                <input type="hidden" name="type" value="video"/>
                                <div
                                    className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative p-5 flex flex-col items-start gap-5">
                                    <label htmlFor="file" className="btn btn-primary">Upload file (video)</label>
                                    <input type="file"
                                           onChange={(event) => onHandleChangeFile(event)}
                                           name="file" id="file" className="hidden"
                                           accept="video/*"
                                    />
                                    {errors?.file && <p className="form-error">{errors.file}</p>}
                                    {preview &&
                                        <video controls={true} src={String(preview)}
                                               className="w-full h-[500px] object-cover rounded-lg"></video>
                                    }
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

                                <button type="submit" className="btn btn-primary self-start">save</button>
                            </form>
                        </div>
                    ) : (
                        <div
                            className={'bg-white overflow-hidden shadow-sm sm:rounded-lg relative p-5 flex flex-col items-center'}>
                            <p className={'form-error font-bold'}>
                                type not found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
};

export default Create;
