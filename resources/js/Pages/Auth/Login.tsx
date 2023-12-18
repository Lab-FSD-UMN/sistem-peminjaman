import { useEffect, FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import axiosClient from '@/Services/axiosClient';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    useEffect(() => {
        console.log("data", data);
    }, [data])

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
        axiosClient.post(`/auth/login`, data).then((res) => {
            console.log("Success", res.data.token)
            localStorage.setItem("token", res.data.token)
        }
        ).catch((err) => {
            console.log("Error", err)
        })
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <form onSubmit={submit} className="w-[20rem] bg-white shadow-md rounded-md p-5 space-y-4">
                    <h1>
                        <span className="text-2xl font-bold">Log in</span>
                    </h1>
                    <div className="space-y-2">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full p-2 border rounded-md focus:outline-none"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full p-2 border rounded-md focus:outline-none"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="text-sm text-gray-600">Remember me</span>
                    </div>

                    <div className="space-y-2">
                        <PrimaryButton disabled={processing}>Log in</PrimaryButton>
                    </div>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Don't have an account?</p>
                        <Link
                            href={route('register')}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Register here
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
