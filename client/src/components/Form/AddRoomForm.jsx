import { DateRange } from 'react-date-range'
import { categories } from '../Categories/CategoriesData'
import { TbFidgetSpinner } from 'react-icons/tb'

const AddRoomForm = ({ dates, handleDates, handleSubmit, imagePreview, imageText, handleImage, loading }) => {


    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='location' className='block text-gray-600'>
                                Location
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='location'
                                id='location'
                                type='text'
                                placeholder='Location'
                                required
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='category' className='block text-gray-600'>
                                Category
                            </label>
                            <select
                                required
                                className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                                name='category'
                            >
                                {categories.map(category => (
                                    <option value={category.label} key={category.label}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='space-y-1'>
                            <label htmlFor='location' className='block text-gray-600'>
                                Select Availability Range
                            </label>
                            {/* Calender */}
                            <DateRange
                                // editableDateInputs={true}
                                onChange={item => handleDates(item)}
                                moveRangeOnFirstSelection={false}
                                ranges={[dates]}
                                rangeColors={['#f43f5e']}

                            />
                        </div>
                    </div>
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='title' className='block text-gray-600'>
                                Title
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='title'
                                id='title'
                                type='text'
                                placeholder='Title'
                                required
                            />
                        </div>

                        <div className='flex items-center p-4 bg-white w-full  m-auto rounded-lg'>
                            <div className='flex-1 px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>

                                <div className='flex flex-col w-max mx-auto text-center'>
                                    <label>
                                        <input
                                            className='text-sm cursor-pointer w-36 hidden'
                                            type='file'
                                            name='image'
                                            onChange={e => handleImage(e.target.files[0])}
                                            id='image'
                                            accept='image/*'
                                            hidden
                                        />
                                        <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                                            {imageText}
                                        </div>
                                    </label>
                                </div>
                            </div>
                            {imagePreview && <div className={`${imagePreview ? 'block w-16 h-16 ml-4 object-cover overflow-hidden' : 'hidden'}`}>
                                <img src={imagePreview} />
                            </div>}
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='price' className='block text-gray-600'>
                                    Price
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='price'
                                    id='price'
                                    type='number'
                                    placeholder='Price'
                                    required
                                />
                            </div>

                            <div className='space-y-1 text-sm'>
                                <label htmlFor='guest' className='block text-gray-600'>
                                    Total guest
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='total_guest'
                                    id='guest'
                                    type='number'
                                    placeholder='Total guest'
                                    required
                                />
                            </div>
                        </div>

                        <div className='flex justify-between gap-2'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='bedrooms' className='block text-gray-600'>
                                    Bedrooms
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='bedrooms'
                                    id='bedrooms'
                                    type='number'
                                    placeholder='Bedrooms'
                                    required
                                />
                            </div>

                            <div className='space-y-1 text-sm'>
                                <label htmlFor='bathrooms' className='block text-gray-600'>
                                    Bathrooms
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='bathrooms'
                                    id='bathrooms'
                                    type='number'
                                    placeholder='Bathrooms'
                                    required
                                />
                            </div>
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='description' className='block text-gray-600'>
                                Description
                            </label>

                            <textarea
                                id='description'
                                className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                                name='description'
                            ></textarea>
                        </div>
                    </div>
                </div>

                <button
                    disabled={loading}
                    type='submit'
                    className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                >
                    {loading ? <TbFidgetSpinner className='animate-spin mx-auto' /> : 'Save & Continue'}
                </button>
            </form>
        </div>
    )
}

export default AddRoomForm