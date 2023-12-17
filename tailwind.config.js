import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import plugin from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                // sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                'nunito-sans': ['Nunito Sans', 'sans'],
                'nexa': ['Nexa', 'sans'],
            },
            colors: {
                'biru_umn' : '#005596',
                'biru_muda' : '#0F9EED',
                'biru_navbar' : '#0377D0',
                'orange' : '#F28A15',
                'purple' : '#904992',
                'teal' : '#1C968F',
                'grey_footer' : '#333333',
                'grey_copyrights' : '#222222',
                'greyBG' : '#F8F8F8',
                'kuning' : '#FFC000'
            },
            fontSize: {
                xxs: '0.5rem'
            }

        },
    },
    variants: {
        extend: {},
    },
    plugins: [forms],
};
