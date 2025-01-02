import React from 'react';
import {FiEdit} from "react-icons/fi";
import {FiTrash2} from "react-icons/fi";
import {TbError404} from "react-icons/tb";
import {GrFormNext} from "react-icons/gr";
import {GrFormPrevious} from "react-icons/gr";
import {CiSquarePlus} from "react-icons/ci";
import { GrDocumentPdf } from "react-icons/gr";


const Icon = ({className = '', name}) => {
    let DynamicComponent;
    switch (name) {
        case 'edit':
            DynamicComponent = FiEdit
            break;
        case 'pdf':
            DynamicComponent = GrDocumentPdf
            break;
        case 'add':
            DynamicComponent = CiSquarePlus
            break;
        case 'next':
            DynamicComponent = GrFormNext
            break;
        case 'prev':
            DynamicComponent = GrFormPrevious
            break;
        case 'delete':
            DynamicComponent = FiTrash2
            break;
        default:
            DynamicComponent = TbError404
    }
    return (
        <DynamicComponent className={`${className} transition-all`}/>
    );
};

export default Icon;
