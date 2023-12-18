import { usePage } from '@inertiajs/react';
import { SVGAttributes, useEffect } from 'react';
import LogoBackup from '@/Assets/image/logo.png';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    const page: any = usePage().props;
    // useEffect(() => {
    //     console.log(page);
    // }, []);
    return (
        <img
            className='h-11'
            src={LogoBackup}
        />
    );
}
