import React from 'react';
import {useForm} from "@inertiajs/react";

const Create = ({link}) => {
    const {data, setData, errors, post, processing} = useForm({
            template: 'info',
            id: link.id,
            type: link.type,
            name: link.name,
            url: link.url,
        }
    )
    let urlType = 'url';
    let urlPlaceholder = 'https://www.example.com';
    if (link.type === 'phone') {
        urlType = 'phone';
        urlPlaceholder = '09123456789';
    } else if (link.type === 'email') {
        urlType = 'email';
        urlPlaceholder = 'https://www.example.com';
    } else if (link.type === 'social') {
        urlType = 'url';
        urlPlaceholder = 'https://www.example.com';
    }

    function handelChange(event) {
        event.preventDefault()
        setData(event.target.id, event.target.value);
    }

    const onHandleSubmit = (event) => {
        event.preventDefault();
        post(route('links.update', link.id));
    }
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-5">
                {/* Form starts here */}
                <form className="flex flex-col gap-5" onSubmit={onHandleSubmit} method="post">
                    <div
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 flex flex-col gap-5">
                        <div className="w-full">
                            <label className="form-label" htmlFor={'name'}>title</label>
                            <input
                                type="text"
                                id={'name'}
                                placeholder={'add alt text for the image...'}
                                className="form-input w-full"
                                value={data.name}
                                onChange={handelChange}
                            />
                            {errors?.name && <p className="form-error">{errors.name}</p>}
                        </div>
                    </div>

                    <div
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 flex flex-col gap-5">
                        <div className="w-full">
                            <label className="form-label" htmlFor={'url'}>{urlType}</label>
                            <input
                                type="text"
                                id={'url'}
                                placeholder={urlPlaceholder}
                                className="form-input w-full"
                                value={data.url}
                                onChange={handelChange}
                            />
                            {errors?.url && <p className="form-error">{errors.url}</p>}
                        </div>
                    </div>

                    {/* Add new image button */}
                    <div className="flex gap-2">
                        <button type="submit" className="btn btn-primary" disabled={processing}>Save link</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
