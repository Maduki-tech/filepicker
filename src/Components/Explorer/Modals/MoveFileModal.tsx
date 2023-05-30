import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { api } from '~/utils/api';
import { CheckIcon, ChevronUpDownIcon, FolderOpenIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import { type dateiablage } from '@prisma/client';

export default function MoveFileModal({
    setModalOpen,
    currentFolder,
}: {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentFolder: dateiablage | null;
}) {
    const [folderName, setFolderName] = useState<dateiablage>();
    const moveFolder = api.fileManager.moveFolder.useMutation();

    const move = async () => {
        if (folderName === null) return;

        if (currentFolder) {
            await moveFolder.mutateAsync({
                id: folderName.id,
                parent_id: currentFolder?.id,
            });
        }
        setModalOpen(false);
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

                <div className="fixed inset-0 z-10 ">
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
                            <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <FolderOpenIcon
                                            className="h-6 w-6 text-blue-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Verschieben nach
                                        </Dialog.Title>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 flex flex-col items-end">
                                    <AutoCompleteBox
                                        setFolderToChangeTo={setFolderName}
                                    />

                                    <button
                                        type="button"
                                        className="inline-flex w-2/6 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={move}
                                    >
                                        Verschieben
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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function AutoCompleteBox({
    setFolderToChangeTo,
}: {
    setFolderToChangeTo: React.Dispatch<React.SetStateAction<dateiablage>>;
}) {
    const [query, setQuery] = useState('');
    const [selectedAkte, setSelectedAkte] = useState(null);

    //TODO: Get all folders in whole Database
    const { data } = api.fileManager.getAllFolder.useQuery();

    const filteredAkten =
        query === ''
            ? data
            : data.filter((folder) => {
                  return folder.name
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    useEffect(() => {
        setFolderToChangeTo(selectedAkte);
    }, [selectedAkte]);

    return (
        <Combobox as="div" className='w-full' value={selectedAkte} onChange={setSelectedAkte}>
            <div className="relative mb-2">
                <Combobox.Input
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Ordnername"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(folder: dateiablage) => folder?.name}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </Combobox.Button>

                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredAkten.map((akte) => (
                        <Combobox.Option
                            key={akte.id}
                            value={akte}
                            className={({ active }) =>
                                classNames(
                                    'relative cursor-default select-none py-2 pl-3 pr-9',
                                    active
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-900'
                                )
                            }
                        >
                            {({ active, selected }) => (
                                <>
                                    <span
                                        className={classNames(
                                            'block truncate',
                                            selected && 'font-semibold'
                                        )}
                                    >
                                        {akte.name}
                                    </span>

                                    {selected && (
                                        <span
                                            className={classNames(
                                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                                active
                                                    ? 'text-white'
                                                    : 'text-indigo-600'
                                            )}
                                        >
                                            <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    )}
                                </>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </div>
        </Combobox>
    );
}
