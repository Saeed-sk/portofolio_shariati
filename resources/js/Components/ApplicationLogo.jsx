import {usePage} from "@inertiajs/react";

export default function ApplicationLogo(props) {
    const assetsPath = usePage()?.props?.assetsPath;
    return (
        <div>
            <img className={'w-full h-full object-cover rounded-lg'} src={assetsPath + 'logo/logo.png'} alt="logo"/>
        </div>
    );
}
