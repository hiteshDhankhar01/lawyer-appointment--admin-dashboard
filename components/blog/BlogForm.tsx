"use client";

import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loader from '../custom ui/Loader';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ImageUpload from "@/components/custom ui/ImageUpload";
import Image from 'next/image';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters long." }).max(36, { message: "Title must be at most 36 characters long." }),
    excerpt: z.string().min(5, { message: "Excerpt must be at least 5 characters long." }),
    image: z.string().url({ message: "Image must be a valid URL." }),
    paragraph: z.string().min(10, { message: "Paragraph must be at least 10 characters long." }),
});

interface BlogFormProps {
    initialData?: BlogType | null;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(initialData?.image || null);

    const form = useForm<BlogType>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            title: '',
            excerpt: '',
            image: '',
            paragraph: '',
        },
    });

    useEffect(() => {
        setLoading(false);
    }, []);

    const onSubmit = async (data: BlogType) => {
        setLoading(true);
        try {
            const response = await fetch( initialData ? `/api/blog/${initialData._id}` :'/api/blog', {
                method: initialData ? 'PUT' :'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorText = await response.text();
                alert("Something went wrong");
                console.error('Error creating blog:', errorText);
                setLoading(false);
                return;
            }
            const responseData = await response.json();
            router.push('/blogs');
        } catch (error) {
            console.error('Unexpected error:', error);
        }
        setLoading(false);
    };

    const handleImageUpload = (url: string) => {
        setUploadedImageUrl(url);
        form.setValue('image', url);
    };

    return loading ? (
        <Loader />
    ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6 bg-gray-900 text-white rounded-lg shadow-lg">
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} placeholder="Enter your title here" className="bg-gray-800" />
                            </FormControl>
                            <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Excerpt</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} placeholder="Enter a brief excerpt" className="bg-gray-800" />
                            </FormControl>
                            <FormMessage>{form.formState.errors.excerpt?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="paragraph"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Paragraph</FormLabel>
                            <FormControl>
                                <textarea {...field} placeholder="Write your content here..." rows={5} className="bg-gray-800 w-full  p-3 border border-gray-600 rounded-lg" />
                            </FormControl>
                            <FormMessage>{form.formState.errors.paragraph?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <div className="flex items-center">
                                <ImageUpload onUploadComplete={handleImageUpload} />
                                {uploadedImageUrl && (
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-400">Preview Image:</p>
                                        <Image src={uploadedImageUrl} alt="Uploaded" height={100} width={150} className="mt-2 rounded-md border border-gray-600" />
                                    </div>
                                )}
                            </div>
                            <FormMessage>{form.formState.errors.image?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <div className="text-right">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">{initialData ? "Update" : "Save"}  Appointment</Button>
                </div>
            </Form>
        </form>
    );
};

export default BlogForm;
