import { useState, useRef, useCallback } from 'react';
import { CloudUpload, Camera, Trash2, RefreshCw } from 'lucide-react';
import useImageUpload from '../../hooks/useImageUpload';

export default function ImageUploadZone({
  value,
  onChange,
  shape = 'rect', // 'rect' | 'circle'
  aspectRatio = '16/9', // CSS aspect-ratio for rect
  className = '',
  folder,
}) {
  const inputRef = useRef(null);
  const { upload, uploading, progress, error, reset } = useImageUpload();
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(async (file) => {
    if (!file) return;
    try {
      const result = await upload(file, folder);
      onChange(result.url);
    } catch {
      // error state handled by hook
    }
  }, [upload, folder, onChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  }, [handleFile]);

  const handleRemove = () => {
    onChange('');
    reset();
  };

  const isCircle = shape === 'circle';
  const baseClasses = isCircle
    ? 'w-full aspect-square rounded-full'
    : `w-full rounded-lg`;

  // Has image — show preview
  if (value && !uploading) {
    return (
      <div className={`relative group overflow-hidden ${baseClasses} ${className}`} style={!isCircle ? { aspectRatio } : undefined}>
        <img
          src={value}
          alt="Uploaded"
          className={`w-full h-full object-cover ${isCircle ? 'rounded-full' : 'rounded-lg'}`}
        />
        <div className={`absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 ${isCircle ? 'rounded-full' : 'rounded-lg'}`}>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
            title="Replace"
          >
            <Camera className="w-5 h-5 text-white" />
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
            title="Remove"
          >
            <Trash2 className="w-5 h-5 text-white" />
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    );
  }

  // Uploading — show progress
  if (uploading) {
    return (
      <div className={`flex flex-col items-center justify-center border-2 border-brand-500/40 bg-brand-500/5 ${baseClasses} ${className}`} style={!isCircle ? { aspectRatio } : undefined}>
        <p className="text-sm text-brand-400 mb-2">Uploading...</p>
        <div className="w-3/4 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-brand-500 mt-1">{progress}%</p>
      </div>
    );
  }

  // Error — show retry
  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed border-error-500/40 bg-error-500/5 cursor-pointer ${baseClasses} ${className}`}
        style={!isCircle ? { aspectRatio } : undefined}
        onClick={() => { reset(); inputRef.current?.click(); }}
      >
        <RefreshCw className="w-6 h-6 text-error-500 mb-1" />
        <p className="text-sm text-error-500">Upload failed</p>
        <p className="text-xs text-error-500/60">Click to retry</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    );
  }

  // Default — empty zone
  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed cursor-pointer transition-colors ${
        dragOver ? 'border-brand-500 bg-brand-500/10' : 'border-surface-400 hover:border-brand-500/50'
      } ${baseClasses} ${className}`}
      style={!isCircle ? { aspectRatio } : undefined}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <CloudUpload className={`w-6 h-6 ${dragOver ? 'text-brand-500' : 'text-surface-500'} mb-1`} />
      <p className={`text-sm ${dragOver ? 'text-brand-400' : 'text-surface-600'}`}>
        {dragOver ? 'Drop to upload' : 'Drag & drop or click to upload'}
      </p>
      <p className="text-xs text-surface-500 mt-1">Max 5MB &middot; JPG, PNG, WebP, GIF</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
