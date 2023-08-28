import { usePage } from '@inertiajs/react';
import { SVGAttributes, useEffect } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    const page: any = usePage().props;
    // useEffect(() => {
    //     console.log(page);
    // }, []);
    return (
        <img
            className='
                h-full
                w-12
                aspect-square
            '
            src={page?.companyData.company_logo}
        />
    );
}
