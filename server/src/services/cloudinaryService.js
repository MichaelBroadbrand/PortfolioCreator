const cloudinary = require('../config/cloudinary');

const MOCK_MODE = !process.env.CLOUDINARY_CLOUD_NAME;

/**
 * Upload a buffer to Cloudinary (or return a mock URL in dev).
 * @param {Buffer} buffer — the file buffer
 * @param {object} options — { folder, transformation, publicId }
 * @returns {Promise<{ url: string, publicId: string }>}
 */
async function uploadImage(buffer, options = {}) {
  if (MOCK_MODE) {
    // Return a placeholder in mock mode
    const id = `mock-${Date.now()}`;
    return {
      url: `https://placehold.co/600x400/4f46e5/ffffff?text=Uploaded`,
      publicId: id,
    };
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'portfolio-builder',
        public_id: options.publicId,
        transformation: options.transformation || [
          { quality: 'auto', fetch_format: 'auto' },
        ],
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Delete an image from Cloudinary.
 */
async function deleteImage(publicId) {
  if (MOCK_MODE) return { result: 'ok' };
  return cloudinary.uploader.destroy(publicId);
}

module.exports = { uploadImage, deleteImage };
