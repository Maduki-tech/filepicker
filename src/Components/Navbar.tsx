import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
    const { user, isSignedIn } = useUser();
    const router = useRouter();

    return (
        <>
            <div className="mx-auto px-2 sm:px-6 lg:px-8 shadow">
                <div className="relative flex h-16 justify-between">
                    <div className="flex flex-1 items-center justify-evenly sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                className="block h-8 w-auto lg:hidden"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                            <img
                                className="hidden h-8 w-auto lg:block"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href="/"
                                className={`inline-flex items-center border-b-2 ${
                                    router.pathname === '/'
                                        ? 'border-indigo-500'
                                        : 'border-transparent'
                                } border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900`}
                            >
                                Einstieg
                            </Link>
                            <Link
                                href="/Explorer"
                                className={`inline-flex items-center border-b-2 ${
                                    router.pathname === '/Explorer'
                                        ? 'border-indigo-500'
                                        : 'border-transparent'
                                } border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900`}
                            >
                                Explorer
                            </Link>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 gap-2 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {isSignedIn && (
                            <span className="mr-2">
                                Willkommen, {user?.username}
                            </span>
                        )}
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
        </>
    );
}
