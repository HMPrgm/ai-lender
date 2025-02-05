'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { div } from 'framer-motion/client';

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const extension = '.xlsx'

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file || !file.name.endsWith(extension)) return;


        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const response = await axios.post('/api/statement', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            console.log(response.data)
            router.push(`/dashboard/statement/${response.data.data.id}`);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setLoading(false);
        }
    };

    // return (
    //     <div>
    //         <input 
    //             type="file" 
    //             accept=".xlsx" 
    //             onChange={handleFileChange}
    //         />
    //         <button 
    //             onClick={handleUpload}
    //             disabled={!file || loading}
    //         >
    //             {loading ? 'Uploading...' : 'Upload'}
    //         </button>
    //     </div>
    // );

    return (
        <div>
            <div className='flex flex-col text-center'>
                <h1 className='text-dark_1 text-5xl font-light text-center my-9'>Upload Bank Statement</h1>
                <h2 className='text-dark_2 font-light'>Make sure you have a column labeled <span className='font-medium'>"Balance"</span> and a column labeled <span className="font-medium">"Date"</span></h2>
            </div>
            <div className="max-w-xl mx-auto p-6 flex flex-col items-center">
            
                <label
                    htmlFor="dropzone-file"
                    className={`transition-colors flex flex-col items-center justify-center w-full h-64
                    border-2 border-dashed rounded-lg cursor-pointer
                    ${dragActive
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="mb-2 text-sm text-dark_2">
                            <span className="font-semibold text-dark_1">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-dark_4">
                            .xlsx files only
                        </p>
                    </div>
                    {file && (
                        <div className="mt-4 text-sm text-dark_3">
                            Selected file: {file.name}
                        </div>
                    )}
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept=".xlsx"
                        onChange={handleFileChange}
                    />
                </label>
                {file && (
                    <button
                        className="mt-4  px-12 py-2  text-white bg-primary rounded-lg
                        hover:bg-white hover:text-primary border-primary border-2 transition-colors"
                        onClick={handleUpload}
                    >
                        Upload File
                    </button>
                )}
            </div>
        </div>
    );
}

