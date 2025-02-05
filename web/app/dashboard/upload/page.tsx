'use client'
import { useState } from 'react';
import axios from 'axios';

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const extension = '.xlsx'

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
            console.log('Upload successful:', response.data);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input 
                type="file" 
                accept=".xlsx" 
                onChange={handleFileChange}
            />
            <button 
                onClick={handleUpload}
                disabled={!file || loading}
            >
                {loading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
}
