import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import { Fragment } from "react";

const UpdatePasswordModal = ({ isUpdatePasswordModal, setUpdatePasswordModal, handleChangePassword }) => {
    const { loading } = useAuth()


    return (
        <Transition appear show={isUpdatePasswordModal} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={() => setUpdatePasswordModal(false)}
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
                            <DialogPanel className='w-full h-auto max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Update Your Profile
                                </DialogTitle>
                                <div className='mt-4 w-full'>
                                    {/* form */}

                                    <form onSubmit={handleChangePassword}>
                                        <div className='space-y-1 text-sm mb-4'>
                                            <label htmlFor='title' className='block text-gray-600'>
                                                Current Password
                                            </label>
                                            <input
                                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                                type='text'
                                                name='currentPassword'
                                                id='currentPassword'
                                                placeholder='Enter Your Password'
                                            />
                                        </div>
                                        <div className='space-y-1 text-sm mb-4'>
                                            <label htmlFor='title' className='block text-gray-600'>
                                                New Password
                                            </label>
                                            <input
                                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                                type='text'
                                                name='newPassword'
                                                id='newPassword'
                                                placeholder='Enter New Password'
                                            />
                                        </div>
                                        <div className='flex gap-5'>
                                            <button
                                                disabled={loading}
                                                type='submit'
                                                className={`
                                                    ${loading ? '' : 'font-semibold text-green-900 bg-green-100 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 w-full rounded-md py-3'}
                                                    `}
                                            >
                                                {loading ? <TbFidgetSpinner className='animate-spin mx-auto' /> : 'Update'}
                                            </button>
                                            <button
                                                onClick={() => setUpdatePasswordModal(false)}
                                                type='button'
                                                className=' bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 w-full rounded-md '
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdatePasswordModal;