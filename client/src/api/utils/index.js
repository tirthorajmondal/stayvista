import axios from "axios";



// image upload function
export const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append('image', image);


    // upload image to imgbb
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
    const imageUrl = data.data.display_url;
    return imageUrl;
}



//request to server to  become a host 
