import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, Star, Bug, Copy, RotateCcw, FileText,
  ChevronRight, MessageSquare, Coffee, ArrowRight,
  Type, Quote, Hash, AlignLeft
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

const words = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
  'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
  'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse',
  'cillum', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat',
  'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt',
  'mollit', 'anim', 'id', 'est', 'laborum'
];

const LoremIpsum = () => {
  const [generatedText, setGeneratedText] = useState('');
  const [copyStatus, setCopyStatus] = useState('Copy');
  const [settings, setSettings] = useState({
    paragraphs: 1,
    wordsPerSentence: 8,
    sentencesPerParagraph: 8
  });

  const generateText = useCallback(() => {
    const result = [];
    
    for (let p = 0; p < settings.paragraphs; p++) {
      const paragraph = [];
      
      for (let s = 0; s < settings.sentencesPerParagraph; s++) {
        const sentenceLength = Math.floor(Math.random() * 
          (settings.wordsPerSentence + 3 - (settings.wordsPerSentence - 3))) + 
          (settings.wordsPerSentence - 3);
        
        const sentence = [];
        for (let w = 0; w < sentenceLength; w++) {
          const word = words[Math.floor(Math.random() * words.length)];
          sentence.push(w === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
        }
        paragraph.push(sentence.join(' ') + '.');
      }
      
      result.push(paragraph.join(' '));
    }
    
    setGeneratedText(result.join('\n\n'));
    setCopyStatus('Copy');
  }, [settings]);

  // Auto-generate text when settings change
  useEffect(() => {
    generateText();
  }, [settings, generateText]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [generatedText]);

  const handleReset = () => {
    setSettings({
      paragraphs: 1,
      wordsPerSentence: 8,
      sentencesPerParagraph: 8
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tool Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lorem Ipsum Generator</h1>
            <p className="text-gray-600">Generate placeholder text for your designs</p>
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

      {/* Generator Setting */}

    <div className="bg-white rounded-xl shadow-sm p-6">
  <h2 className="text-lg font-semibold text-gray-900 mb-6">Generator Settings</h2>
  <div className="flex flex-row gap-8">
    {/* Paragraph Count */}
    <div className="flex-1">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">Paragraph Count</label>
        <span className="text-sm text-gray-600">{settings.paragraphs}</span>
      </div>
      <input
        type="range"
        min="1"
        max="20"
        value={settings.paragraphs}
        onChange={(e) => setSettings(prev => ({ ...prev, paragraphs: parseInt(e.target.value) }))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-indigo-600 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-indigo-600"
        style={{
          background: `linear-gradient(to right, #4f46e5 ${((settings.paragraphs - 1) / 19 * 100)}%, #e5e7eb ${((settings.paragraphs - 1) / 19 * 100)}%)`
        }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>1</span>
        <span>20</span>
      </div>
    </div>

    {/* Words Per Sentence */}
    <div className="flex-1">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">Avg. Words Per Sentence</label>
        <span className="text-sm text-gray-600">{settings.wordsPerSentence}</span>
      </div>
      <input
        type="range"
        min="3"
        max="20"
        value={settings.wordsPerSentence}
        onChange={(e) => setSettings(prev => ({ ...prev, wordsPerSentence: parseInt(e.target.value) }))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-indigo-600 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-indigo-600"
        style={{
          background: `linear-gradient(to right, #4f46e5 ${((settings.wordsPerSentence - 3) / 17 * 100)}%, #e5e7eb ${((settings.wordsPerSentence - 3) / 17 * 100)}%)`
        }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>3</span>
        <span>20</span>
      </div>
    </div>

    {/* Sentences Per Paragraph */}
    <div className="flex-1">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">Avg. Sentences Per Paragraph</label>
        <span className="text-sm text-gray-600">{settings.sentencesPerParagraph}</span>
      </div>
      <input
        type="range"
        min="3"
        max="25"
        value={settings.sentencesPerParagraph}
        onChange={(e) => setSettings(prev => ({ ...prev, sentencesPerParagraph: parseInt(e.target.value) }))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-indigo-600 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-indigo-600"
        style={{
          background: `linear-gradient(to right, #4f46e5 ${((settings.sentencesPerParagraph - 3) / 22 * 100)}%, #e5e7eb ${((settings.sentencesPerParagraph - 3) / 22 * 100)}%)`
        }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>3</span>
        <span>25</span>
      </div>
    </div>
  </div>
</div>

      {/* Generated Text */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <textarea
          value={generatedText}
          readOnly
          placeholder="Generated text will appear here..."
          className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"
        />
        
        <div className="flex items-center justify-between mt-4">
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
            disabled={!generatedText}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

export default LoremIpsum;

export { LoremIpsum };