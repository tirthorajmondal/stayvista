import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import { toast } from 'react-hot-toast'
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setImageText] = useState('Upload Image');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    // query
    const { mutateAsync, } = useMutation({
        mutationFn: async (roomData) => {
            const { data } = await axiosSecure.post('/rooms', roomData)
            return data
        },
        onSuccess: () => {
            console.log('Room added successfully!');
            toast.success('Room added successfully!');
            navigate('/dashboard/my-listings');
            setLoading(false);
        },
    })

    // date handler
    const handleDates = item => {
        console.log(item);
        setDates(item.selection);
    }

    // handlepreview and name
    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        if (image.name.length > 15) {
            setImageText(image.name.split('.')[0].slice(0, 15) + '...' + image.name.split('.')[1]);
        } else {
            setImageText(image.name);
        }
    }

    // form handler
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const location = form.location.value;
        const category = form.category.value;
        const to = dates.endDate;
        const from = dates.startDate;
        const title = form.title.value;
        const price = form.price.value;
        const guests = form.total_guest.value;
        const bedrooms = form.bedrooms.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const image = form.image.files[0];
        const host = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL
        }

        try {
            const image_url = await imageUpload(image);
            const roomData = {
                location,
                category,
                to,
                from,
                title,
                price,
                guests,
                image: image_url,
                bedrooms,
                bathrooms,
                description,
                host
            }
            await mutateAsync(roomData);
        }
        catch (err) {
            console.log(err);
            toast.error(err.message);
            setLoading(false);
        }

    }

    return (
        <>
            <h1>Add room page</h1>
            <Helmet>
                <title> Add Room | Dashboard</title>
            </Helmet>


            {/* form */}
            <AddRoomForm
                dates={dates}
                handleDates={handleDates}
                handleSubmit={handleSubmit}
                handleImage={handleImage}
                imageText={imageText}
                imagePreview={imagePreview}
                loading={loading}
            />
        </>
    );
};

export default AddRoom;