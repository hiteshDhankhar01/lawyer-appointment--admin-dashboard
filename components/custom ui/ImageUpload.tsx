"use client";

import { UploadButton } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast"


const ImageUpload = ({ onUploadComplete }: { onUploadComplete: (url: string) => void }) => {
    const { toast } = useToast()

    return (
        <main className="flex flex-col items-center justify-between p-8">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                        const uploadedUrl = res[0].url;
                        onUploadComplete(uploadedUrl);
                    }
                    toast({
                        description: "Upload Completed",
                    })
                }}
                onUploadError={(error: Error) => {
                    toast({
                        description: `ERROR! ${error.message}`,
                    })
                    // alert(`ERROR! ${error.message}`);
                }}
            />
        </main>
    );
};

export default ImageUpload;


// "use client";

// import { UploadButton } from "@/lib/uploadthing";

// const ImageUpload = () => {
//     return (
//         <main className="flex min-h-screen flex-col items-center justify-between p-24">
//             <UploadButton
//                 endpoint="imageUploader"
//                 onClientUploadComplete={(res) => {
//                     // Do something with the response
//                     console.log("Files: ", res);
//                     alert("Upload Completed");
//                 }}
//                 onUploadError={(error: Error) => {
//                     // Do something with the error.
//                     alert(`ERROR! ${error.message}`);
//                 }}
//             />
//         </main>
//     );
// }

// export default ImageUpload;
