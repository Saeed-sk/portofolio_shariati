import React from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

// وارد کردن فونت‌ها به Quill
const modules = {
    toolbar: [
        // Dropdowns برای انتخاب فونت‌ها
        [{ font: ["sans-serif", "Comfortaa", "Encode-Sans-Condensed", "Fjalla-One"] }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }, { color: [], background: [] }],
        ["clean"],
    ],
};

const formats = [
    "font",
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "color",
    "background",
    "link",
    "image",
];

const TextEditor = ({ value, onChange, name, className = "" }) => {
    const Quill = ReactQuill.Quill;
    const Font = Quill.import("attributors/class/font");
    Font.whitelist = ["sans-serif", "Comfortaa", "Encode-Sans-Condensed", "Fjalla-One"];
    Quill.register(Font, true);

    return (
        <ReactQuill
            id={name}
            theme="snow"
            value={value}
            modules={modules}
            formats={formats}
            className={"w-full " + className}
            onChange={onChange}
            placeholder="Enter image content..."
        />
    );
};

export default TextEditor;
