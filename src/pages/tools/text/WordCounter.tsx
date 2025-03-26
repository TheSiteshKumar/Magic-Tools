import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, Star, Bug, Hash, MessageSquare, 
  Coffee, ArrowRight, Type, Quote, AlignLeft,
  FileText, Check, X, AlertCircle,ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const similarTools = [
  { 
    name: 'Text Case Converter',
    icon: Type,
    path: '/tools/text/case-converter',
    description: 'Convert text between different cases'
  },
  {
    name: 'Lorem Ipsum Generator',
    icon: FileText,
    path: '/tools/text/lorem-ipsum',
    description: 'Generate placeholder text'
  },
  {
    name: 'Text Formatter',
    icon: AlignLeft,
    path: '/tools/text/formatter',
    description: 'Format and beautify text content'
  },
  {
    name: 'Quote Generator',
    icon: Quote,
    path: '/tools/text/quotes',
    description: 'Generate random inspiring quotes'
  }
];

const webAndSocialLimits = [
  { name: 'Meta Title', minMax: 'Max', limit: 55, type: 'Letter' },
  { name: 'Meta Description', minMax: 'Max', limit: 160, type: 'Letter' },
  { name: 'Google Ideal Post Content', minMax: 'Min', limit: 300, type: 'Word' },
  { name: 'Instagram Captions/Comments', minMax: 'Max', limit: 2200, type: 'Letter' },
  { name: 'Twitter Post', minMax: 'Max', limit: 280, type: 'Letter' },
  { name: 'Twitter Username', minMax: 'Max', limit: 20, type: 'Letter' },
  { name: 'Facebook Wall Post (Truncation)', minMax: 'Max', limit: 477, type: 'Letter' },
  { name: 'Facebook Wall Post (All)', minMax: 'Max', limit: 63206, type: 'Letter' },
  { name: 'Facebook Comment', minMax: 'Max', limit: 8000, type: 'Letter' },
  { name: 'Facebook Page Description', minMax: 'Max', limit: 255, type: 'Letter' },
  { name: 'Facebook Username', minMax: 'Max', limit: 50, type: 'Letter' },
  { name: 'Facebook Messenger Message', minMax: 'Max', limit: 20000, type: 'Letter' },
  { name: 'YouTube Video Title', minMax: 'Max', limit: 70, type: 'Letter' },
  { name: 'YouTube Video Description', minMax: 'Max', limit: 5000, type: 'Letter' },
  { name: 'Snapchat Caption', minMax: 'Max', limit: 250, type: 'Letter' },
  { name: 'Pinterest Pin Description', minMax: 'Max', limit: 500, type: 'Letter' }
];

interface TextStats {
  words: number;
  characters: number;
  sentences: number;
}

export const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    words: 0,
    characters: 0,
    sentences: 0
  });

  useEffect(() => {
    const calculateStats = () => {
      const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
      const characters = text.length;
      const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;

      setStats({
        words,
        characters,
        sentences
      });
    };

    calculateStats();
  }, [text]);

  const getStatus = (limit: number, minMax: string, type: string) => {
    const value = type === 'Word' ? stats.words : stats.characters;
    
    if (value === 0) return { icon: AlertCircle, status: 'Empty', color: 'text-gray-400' };
    if (minMax === 'Max' && value <= limit) return { icon: Check, status: 'Pass', color: 'text-green-600' };
    if (minMax === 'Min' && value >= limit) return { icon: Check, status: 'Pass', color: 'text-green-600' };
    return { icon: X, status: 'Fail', color: 'text-red-600' };
  };

  const StatCard = ({ title, value, icon }: { title: string; value: number; icon: React.ElementType }) => {
    const Icon = icon;
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white p-6 rounded-xl shadow-sm"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Icon className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tool Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Hash className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Word Counter</h1>
            <p className="text-gray-600">Count words, characters, and analyze text length</p>
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
      <div className="grid gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Sentences" value={stats.sentences} icon={MessageSquare} />
          <StatCard title="Words" value={stats.words} icon={Type} />
          <StatCard title="Characters" value={stats.characters} icon={Hash} />
        </div>

        
       {/* Web and Social Media Limits */}
      <div className="bg-white rounded-xl shadow-sm p-6">
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-900">Web and Social Media Limits</h2>
  </div>
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Name</th>
          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 hidden md:table-cell">Min/Max</th>
          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 hidden md:table-cell">Limit & Type</th>
          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Current Status</th>
        </tr>
      </thead>
      <tbody>
        {webAndSocialLimits.map((limit, index) => {
          const { icon: StatusIcon, status, color } = getStatus(limit.limit, limit.minMax, limit.type);
          return (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-900">{limit.name}</td>
              <td className="py-3 px-4 text-sm text-gray-600 hidden md:table-cell">{limit.minMax}</td>
              <td className="py-3 px-4 hidden md:table-cell">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-medium text-indigo-600">
                    {limit.limit}
                  </span>
                  <span className="text-xs text-gray-500 before:content-['/'] before:mr-1.5">
                    {limit.type}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <StatusIcon className={`w-4 h-4 ${color}`} />
                  <span className={`text-sm ${color}`}>{status}</span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>
      </div>

      {/* Similar Tools */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Similar Text Tools</h2>
          <Link 
            to="/tools/text"
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
      {/* Blog Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About Lorem Ipsum</h2>
        <div className="prose max-w-none">
          <h3>What is Lorem Ipsum?</h3>
          <p>
            Lorem Ipsum is dummy text that has been the industry's standard placeholder text ever since the 1500s. 
            It's used when you need to fill space in a design but the final copy isn't ready yet.
          </p>
          
          <h3>Why Use Lorem Ipsum?</h3>
          <ul>
            <li><strong>Neutral text:</strong> It doesn't distract from the design</li>
            <li><strong>Readable:</strong> Maintains a natural reading rhythm</li>
            <li><strong>Professional:</strong> Industry standard for mockups</li>
            <li><strong>Flexible:</strong> Can be generated in various lengths</li>
          </ul>

          <h3>Best Practices</h3>
          <p>
            When using Lorem Ipsum in your designs, consider the final content length and structure.
            This helps ensure your design will work well when real content is added.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;