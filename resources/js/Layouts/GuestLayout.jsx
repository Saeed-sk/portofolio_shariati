import ApplicationLogo from '@/Components/ApplicationLogo';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-svh flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <a className="flex h-32" href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </a>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
