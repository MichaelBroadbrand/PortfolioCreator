import { useState, useCallback } from 'react';
import api from '../services/api';

export default function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const upload = useCallback(async (file, folder = 'portfolio-builder/images') => {
    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      // Validate client-side
      const maxSize = 5 * 1024 * 1024;
      const accepted = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

      if (!accepted.includes(file.type)) {
        throw new Error('Invalid file type. Only JPG, PNG, WebP, and GIF are accepted.');
      }
      if (file.size > maxSize) {
        throw new Error('File too large. Maximum size is 5MB.');
      }

      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);

      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        },
      });

      setUploading(false);
      setProgress(100);
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Upload failed';
      setError(message);
      setUploading(false);
      setProgress(0);
      throw new Error(message);
    }
  }, []);

  const remove = useCallback(async (publicId) => {
    try {
      await api.delete('/upload', { data: { publicId } });
    } catch (err) {
      console.error('Failed to delete image:', err);
    }
  }, []);

  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
  }, []);

  return { upload, remove, reset, uploading, progress, error };
}
