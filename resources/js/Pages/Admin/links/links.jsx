import React from 'react';
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Create from "@/Pages/Admin/Info/links/create.jsx";

const Links = ({links}) => {

    return (
        <AuthenticatedLayout>
            <Head title="Create links"/>
            <div className="py-12">
                {links?.map((link, index) => (
                    <Create key={index} inactive={true} link={link}/>
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default Links;
