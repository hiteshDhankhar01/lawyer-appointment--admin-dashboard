import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })

        .onUploadComplete(async ({ file }) => {
            console.log("Upload complete for userId:",);

            const imgUrl = file.url
            console.log("file url", imgUrl);

            return { imgUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;