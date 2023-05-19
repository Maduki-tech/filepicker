import { Disclosure } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { UserButton } from '@clerk/nextjs';

export default function Navbar() {
    return (
        <Disclosure as="header" className="bg-white shadow">
                <>
                    <div className="mx-auto max-w-full px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
                        <div className="relative flex h-16 justify-between">
                            <div className="relative z-10 flex px-2 lg:px-0">
                                <div className="flex flex-shrink-0 items-center">
                                    <h1 className="font-bold text-2xl text-blue-600">
                                        Flox
                                    </h1>
                                </div>
                            </div>
                            <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                                <div className="w-full sm:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                                <div className="lg:hidden">
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            </div>
                            <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </div>
                    </div>
                </>
        </Disclosure>
    );
}
