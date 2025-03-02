import type { Route } from './+types/proxy-image';

export async function loader({ request }: Route.LoaderArgs) {
    // Extract the Instagram URL from the query parameter
    const urlParam = new URL(request.url).searchParams.get("url");

    // Validate the URL parameter
    if (!urlParam || !urlParam.startsWith("https://scontent-")) {
        return new Response("Invalid or missing url parameter", { status: 400 });
    }

    try {
        // Fetch the image from Instagram
        const response = await fetch(urlParam);
        if (!response.ok) {
            return new Response("Failed to fetch image", { status: response.status });
        }

        // Get relevant headers from the Instagram response
        const contentType = response.headers.get("content-type");
        const cacheControl = response.headers.get("cache-control");
        const expires = response.headers.get("expires");
        const lastModified = response.headers.get("last-modified");

        // Read the image data as a binary buffer
        const buffer = await response.arrayBuffer();

        // Set up response headers
        const headers = new Headers();
        if (contentType) headers.set("Content-Type", contentType);
        if (cacheControl) headers.set("Cache-Control", cacheControl);
        if (expires) headers.set("Expires", expires);
        if (lastModified) headers.set("Last-Modified", lastModified);

        // Return the image as a Response object
        return new Response(buffer, { headers });
    } catch (error) {
        console.error("Error fetching image:", error);
        return new Response("Error fetching image", { status: 500 });
    }
};