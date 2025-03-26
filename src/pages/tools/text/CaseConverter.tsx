import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, Star, Bug, Copy, RotateCcw, Type, 
  ChevronRight, MessageSquare, Coffee, ArrowRight,
  FileText, Quote, Hash, AlignLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const similarTools = [
  { 
    name: 'Lorem Ipsum Generator',
    icon: FileText,
    path: '/tools/text/lorem-ipsum',
    description: 'Generate placeholder text for your designs'
  },
  {
    name: 'String Hash Generator',
    icon: Hash,
    path: '/tools/text/hash',
    description: 'Generate MD5, SHA-1, and other hashes'
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

const CaseConverter = () => {
  const [text, setText] = useState('');
  const [copyStatus, setCopyStatus] = useState('Copy');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
      content: 'This tool is amazing! Saved me so much time.',
      date: '2 days ago'
    },
    {
      id: 2,
      user: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces',
      content: 'Very useful for formatting text quickly.',
      date: '5 days ago'
    }
  ]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setCopyStatus('Copy');
  };

  const convertCase = (type: string) => {
    switch (type) {
      case 'sentence':
        return text.replace(/(^\w|\.\s+\w)/gm, letter => letter.toUpperCase());
      case 'upper':
        return text.toUpperCase();
      case 'lower':
        return text.toLowerCase();
      case 'title':
        return text.replace(/\w\S*/g, word => 
          word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
        );
      case 'mixed':
        return text.split('').map((char, i) => 
          i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
        ).join('');
      case 'inverse':
        return text.split('').map(char => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join('');
      default:
        return text;
    }
  };

  const handleConversion = (type: string) => {
    setText(convertCase(type));
    setCopyStatus('Copy');
  };

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [text]);

  const handleReset = () => {
    setText('');
    setCopyStatus('Copy');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tool Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Type className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Case Converter</h1>
            <p className="text-gray-600">Convert text between different cases with ease</p>
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
        <div className="mb-6">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Enter your text here..."
            className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[
            { name: 'Sentence case', type: 'sentence' },
            { name: 'UPPER CASE', type: 'upper' },
            { name: 'lower case', type: 'lower' },
            { name: 'Title Case', type: 'title' },
            { name: 'MiXeD cAsE', type: 'mixed' },
            { name: 'iNvErSe CaSe', type: 'inverse' }
          ].map((button) => (
            <motion.button
              key={button.type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleConversion(button.type)}
              className="px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg font-medium transition-colors"
            >
              {button.name}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-medium">Reset</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span className="font-medium">{copyStatus}</span>
          </motion.button>
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

      {/* Comments Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Comments</h2>
        </div>
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-4">
              <img
                src={comment.avatar}
                alt={comment.user}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{comment.user}</span>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-600 mt-1">{comment.content}</p>
              </div>
            </div>
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Learn More About Text Case Conversion</h2>
        <div className="prose max-w-none">
          <h3>Why Use a Case Converter?</h3>
          <p>
            Case conversion is an essential tool for writers, developers, and content creators. 
            It helps maintain consistency in your text and saves time when formatting large blocks of content.
          </p>
          
          <h3>Different Types of Text Cases</h3>
          <ul>
            <li><strong>Sentence case:</strong> Capitalizes the first letter of each sentence</li>
            <li><strong>Title case:</strong> Capitalizes the first letter of each word</li>
            <li><strong>Upper case:</strong> Converts all letters to capitals</li>
            <li><strong>Lower case:</strong> Converts all letters to small letters</li>
          </ul>

          <h3>Best Practices for Text Formatting</h3>
          <p>
            When working with text, it's important to maintain consistent capitalization throughout your document.
            This helps improve readability and maintains a professional appearance in your writing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;

export { CaseConverter }