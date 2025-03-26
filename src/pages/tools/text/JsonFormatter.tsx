import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, Star, Bug, Copy, RotateCcw, FileJson,
  ChevronRight, MessageSquare, Coffee, ArrowRight,
  Type, Quote, Hash, AlignLeft, Check, X, ChevronDown,
  Minimize2, Maximize2, AlertCircle, Download,
  Upload, Globe, List, Code
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
    name: 'Word Counter',
    icon: Hash,
    path: '/tools/text/word-counter',
    description: 'Count words, characters, and sentences'
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

interface JsonNode {
  key: string;
  value: any;
  type: string;
  depth: number;
  isExpanded: boolean;
  path: string[];
}

enum ViewMode {
  TREE = 'tree',
  RAW = 'raw'
}

export const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errorPosition, setErrorPosition] = useState<number | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [copyStatus, setCopyStatus] = useState('Copy');
  const [isMinified, setIsMinified] = useState(false);
  const [jsonTree, setJsonTree] = useState<JsonNode[]>([]);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.TREE);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndFormat = useCallback((jsonString: string, shouldMinify = false) => {
    try {
      if (!jsonString.trim()) {
        setOutput('');
        setError(null);
        setIsValid(false);
        setJsonTree([]);
        setErrorPosition(null);
        return;
      }

      const parsed = JSON.parse(jsonString);
      const formatted = shouldMinify 
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, 2);
      
      setOutput(formatted);
      setError(null);
      setIsValid(true);
      setIsMinified(shouldMinify);
      setErrorPosition(null);

      // Build tree structure for collapsible view
      const buildTree = (obj: any, path: string[] = [], depth = 0): JsonNode[] => {
        if (typeof obj !== 'object' || obj === null) {
          return [{
            key: path[path.length - 1] || '',
            value: obj,
            type: typeof obj,
            depth,
            isExpanded: true,
            path
          }];
        }

        const nodes: JsonNode[] = [];
        const entries = Array.isArray(obj) 
          ? obj.map((val, i) => [i.toString(), val])
          : Object.entries(obj);

        for (const [key, value] of entries) {
          const newPath = [...path, key];
          const pathString = newPath.join('.');
          const isExpanded = expandedPaths.has(pathString);

          nodes.push({
            key,
            value,
            type: typeof value,
            depth,
            isExpanded,
            path: newPath
          });

          if (typeof value === 'object' && value !== null && isExpanded) {
            nodes.push(...buildTree(value, newPath, depth + 1));
          }
        }

        return nodes;
      };

      setJsonTree(buildTree(parsed));
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      setIsValid(false);
      setJsonTree([]);
      
      // Try to extract position information from error
      const positionMatch = errorMessage.match(/position (\d+)/i);
      if (positionMatch && positionMatch[1]) {
        setErrorPosition(parseInt(positionMatch[1], 10));
      } else {
        setErrorPosition(null);
      }
    }
  }, [expandedPaths]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
    validateAndFormat(newInput, isMinified);
    setCopyStatus('Copy');
  };

  const handleFormat = () => {
    validateAndFormat(input, false);
    setIsMinified(false);
  };

  const handleMinify = () => {
    validateAndFormat(input, true);
    setIsMinified(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    setError(null);
    setIsValid(false);
    setCopyStatus('Copy');
    setJsonTree([]);
    setErrorPosition(null);
  };

  const toggleNode = (path: string[]) => {
    const pathString = path.join('.');
    const newExpandedPaths = new Set(expandedPaths);
    
    if (expandedPaths.has(pathString)) {
      newExpandedPaths.delete(pathString);
    } else {
      newExpandedPaths.add(pathString);
    }
    
    setExpandedPaths(newExpandedPaths);
    validateAndFormat(input, isMinified);
  };

  const handleDownload = () => {
    if (!output) return;
    
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted-json.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInput(content);
      validateAndFormat(content, isMinified);
    };
    reader.readAsText(file);
    
    // Reset file input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUrlImport = async () => {
    const url = prompt('Enter URL to fetch JSON:');
    if (!url) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.text();
      setInput(json);
      validateAndFormat(json, isMinified);
    } catch (err) {
      setError(`Failed to fetch from URL: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderJsonNode = (node: JsonNode) => {
    const { key, value, type, depth, path } = node;
    const pathString = path.join('.');
    const isExpanded = expandedPaths.has(pathString);
    const isObject = type === 'object' && value !== null;
    
    if (!isObject) {
      return (
        <div 
          key={pathString}
          className="font-mono text-sm"
          style={{ paddingLeft: `${depth * 1.5}rem` }}
        >
          {key && <span className="text-purple-600">{`"${key}": `}</span>}
          {type === 'string' && <span className="text-green-600">{`"${value}"`}</span>}
          {type === 'number' && <span className="text-blue-600">{value}</span>}
          {type === 'boolean' && <span className="text-amber-600">{value.toString()}</span>}
          {value === null && <span className="text-gray-600">null</span>}
        </div>
      );
    }

    return (
      <div key={pathString}>
        <button
          onClick={() => toggleNode(path)}
          className="flex items-center gap-2 hover:bg-gray-100 w-full rounded px-2"
          style={{ paddingLeft: `${depth * 1.5}rem` }}
        >
          <ChevronDown 
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
          />
          <span className="font-mono text-sm">
            {key && <span className="text-purple-600">{`"${key}": `}</span>}
            <span className="text-gray-600">
              {Array.isArray(value) ? '[' : '{'}
              {!isExpanded && '...'}
              {Array.isArray(value) ? ']' : '}'}
            </span>
          </span>
        </button>
      </div>
    );
  };

  const renderRawOutput = () => {
    if (!output) {
      return (
        <div className="h-full flex items-center justify-center text-gray-500">
          Formatted output will appear here
        </div>
      );
    }

    return (
      <pre className="p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
        {output}
      </pre>
    );
  };

  const renderErrorHighlight = () => {
    if (!error || errorPosition === null) return null;
    
    // Find the line and column of the error
    const lines = input.substring(0, errorPosition).split('\n');
    const lineNumber = lines.length;
    const columnNumber = lines[lines.length - 1].length + 1;
    
    return (
      <div className="mt-2 bg-red-50 p-3 rounded-lg border border-red-200">
        <p className="text-sm text-red-700 font-medium">Error at line {lineNumber}, column {columnNumber}:</p>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* Tool Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <FileJson className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">JSON Formatter</h1>
            <p className="text-gray-600">Format, validate, and beautify JSON data</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <label htmlFor="json-input" className="block text-sm font-medium text-gray-700">
              Input JSON
            </label>
            <div className="flex items-center space-x-2">
      <button
        onClick={handleFileImport}
            className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors 
               bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700"
      >
        <Upload className="w-4 h-4" />
        <span>Upload JSON</span>
      </button>
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,.txt"
        className="hidden"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleUrlImport}
         className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors 
               bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700"
        disabled={isLoading}
      >
        <Globe className="w-4 h-4" />
        <span>From URL</span>
      </motion.button>
    </div>
          </div>

          

          <div className="mb-4">
            <textarea
              id="json-input"
              value={input}
              onChange={handleInputChange}
              placeholder="Paste your JSON here..."
              className="w-full h-[400px] p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"
            />
          </div>

          {/* {renderErrorHighlight()} */}

          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="font-medium">Reset</span>
            </motion.button>
            
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Output
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(ViewMode.TREE)}
                className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
                  viewMode === ViewMode.TREE
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
                <span>Tree View</span>
              </button>
              <button
                onClick={() => setViewMode(ViewMode.RAW)}
                className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
                  viewMode === ViewMode.RAW
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Raw View</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              {error ? (
                <div className="flex items-center text-red-600 text-sm">
                  <X className="w-4 h-4 mr-1" />
                  Invalid JSON
                </div>
              ) : isValid && input ? (
                <div className="flex items-center text-green-600 text-sm">
                  <Check className="w-4 h-4 mr-1" />
                  Valid JSON
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gray-50 rounded-lg overflow-auto">
              {error ? (
                <div className="p-4 text-red-600 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Error parsing JSON</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              ) : viewMode === ViewMode.TREE && jsonTree.length > 0 ? (
                <div className="p-4 space-y-1">
                  {jsonTree.map(node => renderJsonNode(node))}
                </div>
              ) : viewMode === ViewMode.RAW ? (
                renderRawOutput()
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Formatted output will appear here
                </div>
              )}
            </div>
            <div className="h-[400px] w-full" />
          </div>

          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              disabled={!output}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span className="font-medium">Download</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              disabled={!output}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy className="w-4 h-4" />
              <span className="font-medium">{copyStatus}</span>
            </motion.button>
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About JSON Formatting</h2>
        <div className="prose max-w-none">
          <h3>Why Format JSON?</h3>
          <p>
            JSON formatting is essential for developers and data analysts who work with JSON data regularly. 
            Properly formatted JSON improves readability, makes debugging easier, and helps identify structural issues in your data.
          </p>
          
          <h3>Key Features</h3>
          <ul>
            <li><strong>Validation:</strong> Ensure your JSON is syntactically correct</li>
            <li><strong>Beautification:</strong> Convert minified JSON into a readable format</li>
            <li><strong>Minification:</strong> Reduce file size by removing unnecessary whitespace</li>
            <li><strong>Syntax Highlighting:</strong> Color-coded elements for better readability</li>
            <li><strong>Tree View:</strong> Collapsible structure for easier navigation of nested data</li>
            <li><strong>Error Highlighting:</strong> Precisely locates syntax errors in your JSON</li>
          </ul>

          <h3>Best Practices</h3>
          <p>
            When working with JSON, it's important to validate your data structure before using it in your applications.
            Regular formatting helps catch common issues like missing commas, unmatched brackets, or invalid values.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;

