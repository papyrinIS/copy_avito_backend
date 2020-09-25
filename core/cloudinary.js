

const cloudinary = require('cloudinary');
const multer = require('multer')

cloudinary.config({
    cloud_name: 'sqrt9989',
    api_key: '547244249831147',
    api_secret: 'xpZqBjhNR9yrdTBCxv3xLNV32TU'
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images',
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: (req, file) => 'computed-filename-using-request',
    },
});

const parser = multer({ storage: storage });
export default parser