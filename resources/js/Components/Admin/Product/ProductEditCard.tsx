import { Input, message, Upload } from 'antd'
import React, { useState, useEffect } from 'react'
import { Link, router, useForm } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import type { UploadProps } from 'antd/lib/upload/interface';
import { PageProps } from '@/types';



// export default function ProductEditCard(ProductData: any) {
//     // ✨ form logic
//     const { data, setData, post, progress } = useForm({
//         id: ProductData.id,
//         title: ProductData.title,
//         description: ProductData.description,
//         slug: ProductData.slug,
//         price: ProductData.price,
//         image: null,

//     })
//     const [imagePreview, setImagePreview] = useState('') //for handling image preview

//     function handleChange(e: any) {
//         const key = e.target.id;
//         const value = e.target.value
//         setData(data => ({
//             ...data,
//             [key]: value,
//         }))
//     }

//     function handleSubmit(e: any) {
//         e.preventDefault()
//         console.log(data)
//         router.post(`/admin/product/${data.id}`, data, {
//             forceFormData: true,
//         })
//     }

//     function handleDelete(e: any) {
//         e.preventDefault()
//         console.log(data)
//         router.delete(`/admin/product/${data.id}`, {
//             method: 'delete',
//         })
//     }


//     const { TextArea } = Input;

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="bg-white overflow-hidden sm:rounded-lg p-10 flex flex-col gap-2
//             shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
//         >
//             <button
//                 type='button'
//                 onClick={handleDelete}
//                 className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
//             >
//                 Delete
//             </button>
//             <InputLabel
//                 title='Title'
//                 htmlFor='title'
//             >
//                 Nama Produk
//             </InputLabel>
//             <Input className="text-gray-500"
//                 defaultValue={data.title}
//                 onChange={handleChange}
//                 id='title'
//             />
//             <InputLabel>
//                 Deskripsi
//             </InputLabel>
//             <Input.TextArea className="text-gray-500"
//                 defaultValue={data.description}
//                 onChange={handleChange}
//                 id='description'
//             />
//             <InputLabel>
//                 Slug
//             </InputLabel>
//             <Input className="text-gray-500"
//                 defaultValue={data.slug}
//                 onChange={handleChange}
//                 id='slug'
//             />
//             <InputLabel>
//                 Harga
//             </InputLabel>
//             <Input className="text-gray-500"
//                 defaultValue={data.price}
//                 onChange={handleChange}
//                 id='price'
//             />
//             <InputLabel>
//                 File
//             </InputLabel>
//             <input type='file' className='input
//             text-black'
//                 id="image" onChange={(event: any) => {
//                     setData('image', event.target.files[0])
//                     setImagePreview(URL.createObjectURL(event.target.files[0]))
//                 }} />
//             <img
//                 className='w-full max-w-sm h-1/4'
//                 src={
//                     imagePreview ?
//                         imagePreview
//                         :
//                         ProductData.image.image
//                 }
//             />
//             <Dragger
//                 {...props}>
//                 <p className="ant-upload-drag-icon">
//                     {/* <InboxOutlined /> */}

//                 </p>
//                 <p className="ant-upload-text">Click or drag file to this area to upload</p>
//                 <p className="ant-upload-hint">
//                     Support for a single or bulk upload. Strictly prohibited from uploading company data or other
//                     banned files.
//                 </p>
//             </Dragger>
//             <br />
//             <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >Save
//             </button>
//         </form>
//     )
// }


export default function ProductEditCard(ProductData: any) {
    useEffect(() => {
        console.log(ProductData);
    }, [])
    return (
        <>
            <div className="
                p-4 w-full border-2 border-gray-300 shadow-sm rounded-md flex flex-col justify-center items-center hover:shadow-md transition duration-300">
                <h1 className="text-2xl w-full text-center font-bold mb-2">{ProductData.title}</h1>
                <h2 className="text-gray-500 mb-2">{ProductData.created_at}</h2>
                {ProductData.image.image && (
                    <img
                        src={ProductData.image.image}
                        alt={ProductData.title}
                        className="w-full h-[15rem] object-cover rounded-md mb-2"
                    />
                )}
                <p className="
            text-ellipsis
            overflow-hidden
            text-gray-800 line-clamp-3 h-full">{ProductData.description}</p>
                <Link
                    href={`/product/${ProductData.slug}`}
                    className="mt-2 text-white bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out rounded-md p-2 text-center w-full"
                >
                    Read More
                </Link>
            </div>

        </>
    )
}


// File upload
const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};