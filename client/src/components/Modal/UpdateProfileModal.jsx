import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react';
import { TbFidgetSpinner } from 'react-icons/tb';
import UpdateUserForm from '../Form/UpdateUserForm';

const UpdateProfileModal = ({ handleUpdateProfile, isUpdateProfileModal, setUpdateProfileModal, handleClose, imageText, imagePreview, handleUpdatedImage }) => {

    return (
        <Transition appear show={isUpdateProfileModal} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={() => setUpdateProfileModal(false)}
            >
                <TransitionChild
                    tran
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full h-auto max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Update Your Profile
                                </DialogTitle>
                                <div className='mt-4 w-full'>
                                    {/* form */}
                                    <UpdateUserForm
                                        handleUpdateProfile={handleUpdateProfile}
                                        handleUpdatedImage={handleUpdatedImage}
                                        imagePreview={imagePreview}
                                        imageText={imageText}
                                        handleClose={handleClose}

                                    />
                                </div>
                                {/* <hr className='mt-16 ' /> */}

                                {/* <div className='flex mt-2 justify-center gap-5'>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                                        onClick={() => handleUpdateProfile()}
                                    >
                                        Update
                                    </button>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                        onClick={() => setUpdateProfileModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div> */}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
};

export default UpdateProfileModal;

