import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { api } from '~/utils/api';

export default function InputModal({
    setFiles,
    setModalOpen,
    currentFolderId,
}: {
    setFiles: () => void;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentFolderId: string;
}) {
    const [folderName, setFolderName] = useState('');
    const createFolder = api.fileManager.createFolder.useMutation();
    const createFolderInside = api.fileManager.createFolderInside.useMutation();

    const create = async () => {
        if (folderName === '') return;

        if (currentFolderId) {
            // Create a folder inside another folder
            console.log(currentFolderId);
            await createFolderInside.mutateAsync({
                name: folderName,
                parent_id: currentFolderId,
            });
        } else {
            // Create a single folder
            // await createFolder.mutateAsync({ name: folderName });
        }

        setFolderName(''); // Clear the folder name input field
        setFiles(); // Trigger the parent component to refetch the data
    };

    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setModalOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon
                                            className="h-6 w-6 text-green-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Ornder Name eingeben
                                        </Dialog.Title>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setFolderName(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Ordnername"
                                    />

                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={create}
                                    >
                                        Ordner Erstellen
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
