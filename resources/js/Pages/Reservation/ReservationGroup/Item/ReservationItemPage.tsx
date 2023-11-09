import Guest from '@/Layouts/GuestLayout'
import axiosClient from '@/Services/axiosClient'
import { Link, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { useDebounce } from 'use-debounce'

export default function ReservationItemPage() {
    const pageInfo: any = usePage().props.items;
    const Items: any = pageInfo.data;


    // [searching logic]
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<any[]>([]);
    const [debouncedValue] = useDebounce(searchTerm, 500); //set delay for 500 ms
    const fetch = async () => {
        // call searching item API
        try {
            await axiosClient.post(`/search/item`, {
                keyword: searchTerm,
                per_page: 10,
                sort_by: "name",
                sort_direction: "asc"
            }).then((res) => {
                console.log("res", res)
                setSearchResults(res.data.items.data) // set search result from API
            }).catch((err) => {
                console.log("Error", err) // catch error
            })
        }
        catch (err) {
            console.log("Error", err) // catch error
        }
    }

    // update search term/ search key every time user type
    const handleChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    // call fetch function every time search key is updated and debounced
    useEffect(() => {
        if (debouncedValue) { // if search key is not empty
            fetch(); // call fetch function
        } else {
            setSearchResults(Items); // if search key is empty, set search result to all items
        }
    }, [debouncedValue]);


    useEffect(() => {
        console.log("Page Info: ", pageInfo);
        console.log("Search Result: ", searchResults);
    }, [searchResults])
    return (
        <Guest>
            <div
                className='flex flex-col p-[1rem] gap-[1rem]'
            >
                <h1
                    className='text-black uppercase text-[2rem] font-bold py-2 rounded'
                >
                    <button
                        onClick={() => {
                            window.history.back()
                        }}
                    >
                        {"<"}
                    </button>
                    Item Reservation
                </h1>
                <div
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    <input
                        onChange={handleChange}
                        type="text" placeholder="Search.." name="search"
                        className='w-full text-black font-bold py-2 px-4 rounded'
                    />
                </div>
                <div id='Content-Section'
                    className='flex flex-col gap-[1rem]'
                >
                    {
                        searchResults ?
                            searchResults.length == 0 ?
                                <h1
                                    className='text-black uppercase text-[2rem] font-bold py-2 rounded'
                                >
                                    OOOPS! No Item Found
                                </h1> :
                                searchResults.map((item: any) => (
                                    <ItemCard
                                        {...item}
                                    />
                                ))

                            :
                            Items.map((item: any) => (
                                <ItemCard
                                    {...item}
                                />
                            ))
                    }
                </div>
            </div>
        </Guest>
    )
}


// This is the card for each item
const ItemCard = ({ ...item }: any) => {
    const images = item.item_images[0];
    return (
        <Link
            href={`/reservation/item/${item.id}`}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            key={item.id}>
            <div className='flex flex-row gap-[0.4rem] items-center'>
                {
                    images ?
                        <img
                            className='w-[150px] h-[150px] object-cover'
                            src={images.link} alt=""
                            onError={
                                (e: any) => {
                                    e.target.src = "https://via.placeholder.com/150"
                                }
                            }
                        />
                        :
                        <img
                            className='w-[150px] h-[150px] object-cover'
                            src="https://via.placeholder.com/150" alt="" />
                }
                <div
                    className='flex flex-col gap-[0.4rem] align-top h-full'
                >
                    <h1
                        className='text-white font-bold py-2 rounded'
                    >
                        {item.name}
                    </h1>
                    <p
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 '
                    >{item.is_available ? "available" : "unavailable"}</p>
                </div>
            </div>
        </Link>
    )
}