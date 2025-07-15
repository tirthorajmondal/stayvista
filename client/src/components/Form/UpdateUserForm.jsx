import { TbFidgetSpinner } from 'react-icons/tb';
import useAuth from '../../hooks/useAuth';

const UpdateUserForm = ({ handleUpdateProfile, handleUpdatedImage, imagePreview, imageText, handleClose }) => {
    const { loading } = useAuth()

    return (
        <form
            onSubmit={handleUpdateProfile}
            noValidate=''
            action=''
            className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
            <div className='space-y-4'>
                <div className='space-y-1 text-sm'>
                    <label htmlFor='title' className='block text-gray-600'>
                        Name
                    </label>
                    <input
                        className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Enter Your Name Here'
                    />
                </div>
                <div className='flex items-center gap-3 p-4 bg-white w-full m-auto rounded-lg'>
                    <div className='flex-1 px-5 py-8 relative border-4 border-dotted border-gray-300 rounded-lg'>
                        <div className='flex flex-col w-max mx-auto text-center '>
                            <label>
                                <input
                                    className='text-sm cursor-pointer w-36 hidden'
                                    type='file'
                                    name='image'
                                    onChange={e => handleUpdatedImage(e.target.files[0])}
                                    id='image'
                                    accept='image/*'
                                    hidden
                                />
                                <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                                    Upload Image
                                </div>
                            </label>
                        </div>
                    </div>
                    {<div className={`${imagePreview ? 'flex flex-col items-center justify-center ml-4 object-cover ' : ''}`}>
                        <img src={imagePreview} className='inline-block min-w-20 min-h-20 max-w-20 border-2 border-blue-950' />
                        <p className='text-nowrap'>{imageText}</p>
                    </div>}
                </div>
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
                    onClick={handleClose}
                    type='button'
                    className=' bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 w-full rounded-md '
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default UpdateUserForm;
