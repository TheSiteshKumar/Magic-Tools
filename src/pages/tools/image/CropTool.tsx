import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, Star, Bug, Crop as CropIcon, 
  ChevronRight, Coffee, ArrowRight,
  Type, Image as ImageIcon, FileImage, Code,
  Download, Upload, ZoomIn, Maximize,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';

const similarTools = [
  { 
    name: 'Image Resizer',
    icon: Maximize,
    path: '/tools/image/resize',
    description: 'Resize images while maintaining quality'
  },
  {
    name: 'Image Converter',
    icon: RefreshCw,
    path: '/tools/image/converter',
    description: 'Convert between image formats'
  },
  {
    name: 'Image Optimizer',
    icon: FileImage,
    path: '/tools/image/optimizer',
    description: 'Optimize images for web use'
  },
  {
    name: 'Image Effects',
    icon: ImageIcon,
    path: '/tools/image/effects',
    description: 'Apply filters and effects to images'
  }
];

interface AspectRatio {
  name: string;
  value: number;
}

const aspectRatios: AspectRatio[] = [
  { name: '3:2', value: 3/2 },
  { name: '2:3', value: 2/3 },
  { name: '4:3', value: 4/3 },
  { name: '3:4', value: 3/4 },
  { name: '5:4', value: 5/4 },
  { name: '4:5', value: 4/5 },
  { name: '16:9', value: 16/9 },
  { name: '9:16', value: 9/16 }
];

export const CropTool = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  const [cropSize, setCropSize] = useState({ width: 450, height: 253 });
  const [selectedRatio, setSelectedRatio] = useState<string | null>('16:9');
  const [zoom, setZoom] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.createElement('img');
        imgElement.onload = () => {
          setOriginalSize({
            width: imgElement.width,
            height: imgElement.height
          });
          setSelectedImage(e.target?.result as string);
        };
        imgElement.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAspectRatioChange = (ratio: AspectRatio) => {
    setSelectedRatio(ratio.name);
    const newHeight = Math.round(cropSize.width / ratio.value);
    setCropSize({ ...cropSize, height: newHeight });
  };

  const handleWidthChange = (width: number) => {
    const ratio = aspectRatios.find(r => r.name === selectedRatio)?.value || 16/9;
    const height = Math.round(width / ratio);
    setCropSize({ width, height });
  };

  const handleHeightChange = (height: number) => {
    const ratio = aspectRatios.find(r => r.name === selectedRatio)?.value || 16/9;
    const width = Math.round(height * ratio);
    setCropSize({ width, height });
  };

  const handleCrop = () => {
    if (!selectedImage || !cropAreaRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get crop area dimensions and position
    const cropArea = cropAreaRef.current.getBoundingClientRect();
    const image = imageRef.current;
    if (!image) return;

    canvas.width = cropSize.width;
    canvas.height = cropSize.height;

    // Draw the cropped portion
    ctx.drawImage(
      image,
      cropArea.left,
      cropArea.top,
      cropArea.width,
      cropArea.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cropped-image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Tool Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <CropIcon className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Image Crop Tool</h1>
            <p className="text-gray-600">Crop and resize your images with precision</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-600 hover:text-indigo-600 border border-gray-200 hover:border-indigo-600 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-600 hover:text-amber-600 border border-gray-200 hover:border-amber-600 transition-colors"
          >
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Add to Favs</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-600 transition-colors"
          >
            <Bug className="w-4 h-4" />
            <span className="text-sm font-medium">Report Bug</span>
          </motion.button>
        </div>
      </div>

      {/* Main Tool */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Image Upload Area */}
        {!selectedImage ? (
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">Drag and drop an image here, or click to select</p>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Select Image
                </span>
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Original Size Display */}
            <div className="text-center text-gray-600">
              Original Image Size: {originalSize.width}x{originalSize.height}
            </div>

            {/* Crop Controls */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Width</label>
                <input
                  type="number"
                  value={cropSize.width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Height</label>
                <input
                  type="number"
                  value={cropSize.height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Aspect Ratio Buttons */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {aspectRatios.map((ratio) => (
                <button
                  key={ratio.name}
                  onClick={() => handleAspectRatioChange(ratio)}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedRatio === ratio.name
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {ratio.name}
                </button>
              ))}
            </div>

            {/* Zoom Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Zoom</label>
                <span className="text-sm text-gray-500">{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Image Preview Area */}
            <div className="relative overflow-hidden rounded-lg border border-gray-200" style={{ height: '500px' }}>
              <div
                ref={cropAreaRef}
                className="absolute inset-0 m-auto"
                style={{
                  width: cropSize.width,
                  height: cropSize.height,
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                  cursor: 'move'
                }}
              >
                <img
                  ref={imageRef}
                  src={selectedImage}
                  alt="Preview"
                  className="max-w-none"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {/* Crop Handles */}
                <div className="absolute inset-0 border-2 border-white pointer-events-none">
                  <div className="absolute -left-1 -top-1 w-3 h-3 bg-white rounded-full" />
                  <div className="absolute -right-1 -top-1 w-3 h-3 bg-white rounded-full" />
                  <div className="absolute -left-1 -bottom-1 w-3 h-3 bg-white rounded-full" />
                  <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                New Image
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCrop}
                className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Crop Image
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Similar Tools */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Similar Image Tools</h2>
          <Link 
            to="/tools/image"
            className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
          >
            See All Tools
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {similarTools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 p-2 bg-indigo-50 rounded-lg">
                <tool.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">{tool.name}</h3>
                <p className="text-sm text-gray-500">{tool.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Coffee className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Support Our Work</h2>
              <p className="text-gray-600">Help us keep the tools free and maintained</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow"
          >
            Buy me a coffee
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CropTool;