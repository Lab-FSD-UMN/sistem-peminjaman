import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center text-sm font-medium font-semibold leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 text-white text-opacity-50 focus:border-indigo-700 '
                    : 'border-transparent text-white hover:text-opacity-50 hover:border-gray-300 focus:text-opacity-50 focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
