import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleSignInBtn = () => {
    const { signInWithGoogle, setLoading, loading } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle()
            toast.success('User logged in successfully');
            console.log(result);
            navigate(location.state || '/')
        }
        catch (err) {
            console.log(err)
            toast.error(err.message);
        }
    }
    return (
        <div
            onClick={handleGoogleSignIn}
            className='flex justify-center items-center space-x-2 border my-3 p-2 rounded-lg border-gray-300   cursor-pointer active:border-rose-500'>
            <FcGoogle size={32} />

            <p>Continue with Google</p>
        </div>
    );
};

GoogleSignInBtn.propTypes = {
    loading: PropTypes.bool,
    setLoading: PropTypes.func,
    signInWithGoogle: PropTypes.func,
    navigate: PropTypes.func,
    location: PropTypes.object
};

export default GoogleSignInBtn;