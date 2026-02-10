const { uploadImage, deleteImage } = require('../services/cloudinaryService');

exports.uploadSingle = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    const folder = req.body.folder || 'portfolio-builder/images';
    const result = await uploadImage(req.file.buffer, { folder });

    res.json({
      success: true,
      data: {
        url: result.url,
        publicId: result.publicId,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSingle = async (req, res, next) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ success: false, message: 'publicId is required' });
    }

    await deleteImage(publicId);
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    next(error);
  }
};
