import { Helmet } from 'react-helmet-async'
import useAxiosSecure, { axiosSecure } from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import { useMutation, useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import RoomDataRow from '../../../components/Dashboard/TableRows/RoomDataRow'
import toast from 'react-hot-toast'

const MyListings = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    console.log(user);
    const { data: myListings = [], isLoading, refetch } = useQuery({
        queryKey: ['myListings', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-listings/${user?.email}`)
            return data;
        }
    })

    // delete
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`room/${id}`)
            return data;
        },
        onSuccess: data => {
            toast.success(`Successfully deleted!`)
            refetch()
        }

    })

    // handle delete
    const handleDelete = async (id) => {
        try {
            await mutateAsync(id)
        } catch (err) {
            console.log(err);
        }
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <>
            <Helmet>
                <title>My Listings | Host</title>
            </Helmet>

            <div className='container mx-auto px-4 sm:px-8'>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Location
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            From
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            To
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Delete
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Update
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{/* Room row data */}</tbody>

                                {
                                    myListings.map(room => <RoomDataRow
                                        key={room._id}
                                        room={room}
                                        handleDelete={handleDelete}
                                    />
                                    )
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyListings