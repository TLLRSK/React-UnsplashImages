import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";

const key = import.meta.env.VITE_API_KEY;
const url = `https://api.unsplash.com/search/photos/?client_id=${key}`

const Gallery = () => {
    const {searchTerm} = useGlobalContext();
    const response = useQuery({
        queryKey: ['images', searchTerm],
        queryFn: async () => {
            const result = await axios.get(`${url}&query=${searchTerm}`);

            return result.data;
        }
    })
    
    console.log(response)
    if (response.isLoading) {
        return (
            <section className='image-container'>
                <h4>Loading...</h4>
            </section>
        )
    }
    if (response.isError) {
        return (
            <section className='image-container'>
                <h4>There was an error</h4>
            </section>
        )
    }

    const results = response.data.results;

    console.log(results)

    return <section className='image-container'>
        {results.map((item) => {
            const url = item?.urls?.regular;
            return <img 
            src={url}
            key={item.id}
            alt={item.alt_description}
            className='img'
        />
        })}
    </section>
}

export default Gallery;