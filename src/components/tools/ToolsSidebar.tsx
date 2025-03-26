import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown,
  Type, 
  Image, 
  Palette, 
  Code,
  FileText,
  FileDigit,
  AlignLeft,
  Braces,
  FileJson,

  ImagePlus,
  Paintbrush,
  Shapes,
  Droplets,
  PenTool,
  Share2,
  Crop,
  Move,
  Repeat,
  Minimize2,
  RotateCcw,
  Droplet,
  Layers,
  ImageOff,
  Sliders,
  Settings,
} from 'lucide-react';

const categories = [
  { 
    id: 'text',
    name: 'Text Tools',
    icon: Type,
    tools: [
      { name: 'Text Case Converter', slug: 'case-converter', icon: Type },
      { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum', icon: FileText },
      { name: 'Word Counter', slug: 'word-counter', icon: FileDigit },
      { name: 'JSON Formatter', slug: 'json-formatter', icon: Braces },
      { name: 'Markdown Editor', slug: 'markdown-editor', icon: FileJson },
    ]
  },
  { 
    id: 'image',
    name: 'Image Tools',
    icon: Image,
    tools: [
  { name: 'Crop Tool', slug: 'crop-tool', icon: Crop },
  { name: 'Resize Image Online', slug: 'resize-image-online', icon: Move },
  { name: 'PNG to JPG Converter', slug: 'png-to-jpg-converter', icon: Repeat },
  { name: 'Compress Image Online', slug: 'compress-image-online', icon: Minimize2 },
  { name: 'Rotate & Flip Tool', slug: 'rotate-flip-tool', icon: RotateCcw },
  { name: 'Add Watermark to Image', slug: 'add-watermark-to-image', icon: Droplet },
  { name: 'Batch Image Converter', slug: 'batch-image-converter', icon: Layers },
  { name: 'Background Removal Tool', slug: 'background-removal-tool', icon: ImageOff },
  { name: 'Color Correction Tool', slug: 'color-correction-tool', icon: Sliders },
  { name: 'Image Optimization Tool', slug: 'image-optimization-tool', icon: Settings },
]
  },
  { 
    id: 'design',
    name: 'Design Tools',
    icon: Palette,
    tools: [
      { name: 'Color Palette', slug: 'colors', icon: Paintbrush },
      { name: 'Gradient Generator', slug: 'gradient', icon: Droplets },
      { name: 'Pattern Generator', slug: 'patterns', icon: Shapes },
      { name: 'Shadow Generator', slug: 'shadows', icon: Palette }
    ]
  },
  { 
    id: 'dev',
    name: 'Developer Tools',
    icon: Code,
    tools: [
      { name: 'Code Formatter', slug: 'formatter', icon: Code },
      { name: 'Minifier', slug: 'minifier', icon: FileJson },
      { name: 'JSON Validator', slug: 'json', icon: Braces },
      { name: 'API Tester', slug: 'api', icon: Share2 }
    ]
  }
];

export const ToolsSidebar = () => {
  const location = useLocation();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(() => {
    const category = location.pathname.split('/')[2];
    return category || null;
  });

  return (
    <div className="h-full py-6 border-r border-gray-100">
      <div className="px-4 space-y-2">
        {categories.map((category) => {
          const isExpanded = expandedCategory === category.id;
          const isActive = location.pathname.includes(`/tools/${category.id}`);
          
          return (
            <div key={category.id} className="select-none">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all
                  ${isActive ? 'bg-indigo-50/80 shadow-sm' : 'hover:bg-gray-50'} 
                  ${isExpanded ? 'shadow-sm' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <category.icon className={`w-5 h-5 ${
                    isActive ? 'text-indigo-600' : 'text-gray-600'
                  }`} />
                  <span className={`font-medium ${
                    isActive ? 'text-indigo-600' : 'text-gray-700'
                  }`}>
                    {category.name}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  } ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}
                />
              </button>
              
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: 'auto', 
                      opacity: 1,
                      transition: { duration: 0.2, ease: 'easeOut' }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: { duration: 0.15, ease: 'easeIn' }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="py-2 pl-11 pr-3 space-y-1.5">
                      {category.tools.map((tool) => {
                        const toolPath = `/tools/${category.id}/${tool.slug}`;
                        const isToolActive = location.pathname === toolPath;
                        
                        return (
                          <motion.div
                            key={tool.slug}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Link
                              to={toolPath}
                              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors
                                ${isToolActive 
                                  ? 'bg-indigo-100/90 text-indigo-600 font-medium shadow-xs'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                            >
                              <tool.icon className={`w-4 h-4 ${
                                isToolActive ? 'text-indigo-600' : 'text-gray-400'
                              }`} />
                              {tool.name}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};