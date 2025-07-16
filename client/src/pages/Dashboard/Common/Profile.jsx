import useAuth from '../../../hooks/useAuth'
import { Helmet } from 'react-helmet-async'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import EmptyState from '../../../components/Shared/EmptyState'
import { useState } from 'react'
import UpdateProfileModal from '../../../components/Modal/UpdateProfileModal'
import { imageUpload } from '../../../api/utils'
import toast from 'react-hot-toast'

const Profile = () => {
    const { user, updateUserProfile, loading } = useAuth()
    const [role, isLoading] = useRole()
    const [imageText, setImageText] = useState('Image.jpg')
    const [imagePreview, setImagePreview] = useState();

    const [isUpdateProfileModal, setUpdateProfileModal] = useState(false)

    const handleUpdatedImage = (image) => {
        setImagePreview(URL.createObjectURL(image))
        if (image.name.length > 15) {
            setImageText(image.name.split('.')[0].slice(0, 15) + '...' + image.name.split('.')[1]);
        } else {
            setImageText(image.name);
        }
    }


    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value || user?.displayName
        const image = form.image.files[0]
        let image_url

        // use default image if no image uploaded 
        if (!image) {
            image_url = user?.photoURL
        } else {
            image_url = await imageUpload(image)
        }

        try {
            await updateUserProfile(name, image_url)
            handleClose()
            toast.success('Profile Updated!')
        } catch (err) {
            console.log(err.message);
            setUpdateProfileModal(false)
            toast.error(err.message);
        }
    }
    // close modal
    const handleClose = () => {
        setUpdateProfileModal(false)
        setImagePreview(null)
        setImageText('')
    }

    if (loading || isLoading) return <LoadingSpinner />

    return (
        <div className='flex justify-center items-center h-screen'>
            <Helmet>
                <title>Profile | StayVista</title>
            </Helmet>
            {user ? <div className='bg-white shadow-lg rounded-2xl w-4/5 md:w-3/5'>
                <img
                    alt='profile'
                    src='https://wallpapercave.com/wp/wp10784415.jpg'
                    className='w-full mb-4 rounded-t-lg h-36'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block bg-black/80 rounded-full border-0'>
                        <img
                            alt={user?.displayName}
                            referrerPolicy='no-referrer'
                            src={user?.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>

                    <p className='p-2 px-4 text-xs text-white bg-pink-500 rounded-full capitalize'>
                        {role}
                    </p>
                    <p className='mt-2 text-lg md:text-xl font-medium text-gray-800 '>
                        User Id: {user?.uid}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-black '>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-black '>{user?.email}</span>
                            </p>

                            <div>
                                <button
                                    onClick={() => setUpdateProfileModal(true)}
                                    className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                    Update Profile
                                </button>
                                {/* modal here */}
                                <UpdateProfileModal
                                    isUpdateProfileModal={isUpdateProfileModal}
                                    setUpdateProfileModal={setUpdateProfileModal}
                                    handleUpdateProfile={handleUpdateProfile}
                                    handleClose={handleClose}
                                    imageText={imageText}
                                    imagePreview={imagePreview}
                                    handleUpdatedImage={handleUpdatedImage}
                                />
                                <button className='bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <EmptyState address='/' message='Please Login to see your profile' label='Back to Home' />}
        </div>
    )
}

export default Profile