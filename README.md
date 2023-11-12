# Image Server

Image Server is a simple Express server for handling image uploads, removal, and replacement using Multer for file handling.

## Features

- Upload images to the server.
- Remove uploaded images.
- Replace existing images with new ones.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/image-server.git
2. Navigate to the project directory:
     ```bash
   cd image-server
3. Install dependencies:
     ```bash
   npm install
##Usage 

1. Start the server in development mode:
      ```bash
   npm run dev
This command will start the server using nodemon for automatic restarts during development.

2. Access the server at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Upload Image
 Endpoint: `POST /upload`

 Request: Upload a single image using the `image` field.
   ```bash
     curl -X POST -H "Content-Type: multipart/form-data" -F "image=@/path/to/image.jpg" http://localhost:3000/upload
   ```
Example Response:
```
{
  "imagePath": "/uploads/1622745423000.jpg"
}
```
### Remove Image
Endpoint: DELETE `/remove/:filename`
Request: Provide the filename of the image to be removed.
```bash
curl -X DELETE http://localhost:3000/remove/1622745423000.jpg
```
Example Response:
```
"File 1622745423000.jpg removed successfully."
```
### Replace Image
Endpoint: `PUT /replace/:filename`
Request: Replace an existing image with a new one. Upload the new image using the `image` field.
```basg
curl -X PUT -H "Content-Type: multipart/form-data" -F "image=@/path/to/new-image.jpg" http://localhost:3000/replace/1622745423000.jpg
```
Example Response:
```
{
  "imagePath": "/uploads/1622745425000.jpg"
}
```
## Built With
Express - Web framework for Node.js
Multer - Middleware for handling `multipart/form-data`
Node.js - JavaScript runtime

## Authors
   Mwero Abdalla
## License
   This project is licensed under the MIT License - see the LICENSE.md file for details.
   
