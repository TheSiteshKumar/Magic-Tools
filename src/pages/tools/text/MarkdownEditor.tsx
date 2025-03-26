import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Components } from "react-markdown";
import { Link } from "react-router-dom";

import {
  Share2,
  Star,
  Bug,
  Copy,
  RotateCcw,
  FileText,
  ChevronRight,
  Coffee,
  ArrowRight,
  Type,
  Quote,
  Hash,
  AlignLeft,
  Download,
  Upload,
  Bold,
  Italic,
  Heading,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image,
  Code,
  Table,
  Minus,
  Eye,
  EyeOff,
  Expand,
  Minimize,
} from "lucide-react";

const similarTools = [
  {
    name: "Text Case Converter",
    icon: Type,
    path: "/tools/text/case-converter",
    description: "Convert text between different cases",
  },
  {
    name: "JSON Formatter",
    icon: Hash,
    path: "/tools/text/json-formatter",
    description: "Format and validate JSON data",
  },
  {
    name: "Text Formatter",
    icon: AlignLeft,
    path: "/tools/text/formatter",
    description: "Format and beautify text content",
  },
  {
    name: "Quote Generator",
    icon: Quote,
    path: "/tools/text/quotes",
    description: "Generate random inspiring quotes",
  },
];

const toolbarItems = [
  { icon: Bold, text: "**Bold**", description: "Bold" },
  { icon: Italic, text: "*Italic*", description: "Italic" },
  { icon: Heading, text: "# ", description: "Heading" },
  { icon: List, text: "- ", description: "Bullet List" },
  { icon: ListOrdered, text: "1. ", description: "Numbered List" },
  { icon: LinkIcon, text: "[text](url)", description: "Link" },
  { icon: Image, text: "![alt](url)", description: "Image" },
  { icon: Code, text: "```\ncode\n```", description: "Code Block" },
  {
    icon: Table,
    text: "| Header | Header |\n| --- | --- |\n| Cell | Cell |",
    description: "Table",
  },
  { icon: Minus, text: "---\n", description: "Horizontal Rule" },
];

const initialMarkdown = `# 🚀 Welcome to the Markdown Editor  

This is a **✨ live preview** markdown editor. Start typing in the editor on the left and see the beautifully rendered output on the right!  

## 🔥 Features  

- ✅ **Live preview**  
- 🎨 **Syntax highlighting**  
- 🐙 **GitHub Flavored Markdown** support  
- 🛠 **Toolbar for common formatting**  
- 🖥 **Full-screen editing**  
- 📂 **Export to Markdown file**  

### 💻 Code Example  

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

### 📊 Table Example  

| Feature                 | Status |
|-------------------------|--------|
| 🚀 Live Preview         | ✅      |
| 🎨 Syntax Highlighting  | ✅      |
| 📂 File Export          | ✅      |
| 📱 Responsive           | ✅      |

> ✍ *Try editing this text to see how the Markdown editor works!*  
`;

// Define custom renderers (components) without using removed props.
const components: Components = {
  // Table elements
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50">{children}</thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-gray-200">{children}</tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="hover:bg-gray-50 even:bg-gray-50/50">{children}</tr>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-3 text-left font-medium text-gray-900" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-gray-700" {...props}>
      {children}
    </td>
  ),

  // Code block renderer (used when code is wrapped in <pre>)
  pre: ({ children, ...props }) => {
    // Extract language from the inner code element if available.
    const codeChild = Array.isArray(children) ? children[0] : children;
    const language =
      codeChild &&
      typeof codeChild === "object" &&
      "props" in codeChild &&
      codeChild.props.className
        ? /language-(\w+)/.exec(codeChild.props.className || "")?.[1] || ""
        : "";
    return (
      <div className="group relative my-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between bg-gray-50 px-4 py-2">
          <span className="text-xs font-medium text-gray-500">{language}</span>
          <button
            onClick={() => {
              const textToCopy =
                codeChild &&
                typeof codeChild === "object" &&
                "props" in codeChild
                  ? String(codeChild.props.children).replace(/\n$/, "")
                  : "";
              (navigator as any).clipboard.writeText(textToCopy);
            }}
            className="flex items-center gap-1 rounded bg-white px-2 py-1 text-xs text-gray-500 hover:bg-gray-100"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>
        </div>
        <pre className="overflow-x-auto p-4 text-sm" {...props}>
          {children}
        </pre>
      </div>
    );
  },
  // Inline code renderer
  code: ({ children, className, ...props }) => (
    <code
      className={`rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800 ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </code>
  ),

  // Headings
  h1: ({ children, ...props }) => (
    <h1 className="mt-8 mb-4 text-3xl font-bold text-gray-900" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="mt-6 mb-3 text-2xl font-semibold text-gray-900" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-4 mb-2 text-xl font-medium text-gray-900" {...props}>
      {children}
    </h3>
  ),

  // Lists (no depth logic needed)
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 my-3 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 my-3 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-2 text-gray-700" {...props}>
      {children}
    </li>
  ),

  // Links with hover effects
  a: ({ children, ...props }) => (
    <a
      className="font-medium text-indigo-600 underline hover:text-indigo-800"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-4 border-l-4 border-indigo-300 bg-indigo-50/50 py-2 pl-4 italic text-gray-700"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Images
  img: ({ children, ...props }) => (
    <img
      className="my-4 rounded-lg border border-gray-200"
      loading="lazy"
      {...props}
    />
  ),

  // Horizontal rule
  hr: (props) => (
    <hr className="my-6 border-t-2 border-gray-100" {...props} />
  ),
};

export const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [copyStatus, setCopyStatus] = useState("Copy");
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToolbarClick = (text: string) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value;

    const beforeSelection = currentValue.substring(0, start);
    const selection = currentValue.substring(start, end);
    const afterSelection = currentValue.substring(end);

    let newText;
    if (text.includes("text")) {
      newText = text.replace("text", selection || "text");
    } else {
      newText = text + (selection || "");
    }

    const newValue = beforeSelection + newText + afterSelection;
    setMarkdown(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + newText.length,
        start + newText.length
      );
    }, 0);
  };

  const handleCopy = useCallback(async () => {
    try {
      await (navigator as any).clipboard.writeText(markdown);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus("Copy"), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  }, [markdown]);

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === "string") {
        setMarkdown(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* Header Section - Hidden in fullscreen */}
      {!isFullscreen && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Markdown Editor
              </h1>
              <p className="text-gray-600">
                Write and preview markdown with live rendering
              </p>
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
      )}

      {/* Main Editor - Fullscreen Target */}
      <div
        className={`bg-white rounded-xl shadow-sm ${
          isFullscreen ? "fixed inset-0 z-50 m-0 rounded-none" : ""
        }`}
      >
        {/* Toolbar */}
        <div className="border-b border-gray-200 p-2">
          <div className="flex flex-wrap items-center gap-2">
            {toolbarItems.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleToolbarClick(item.text)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title={item.description}
              >
                <item.icon className="w-4 h-4 text-gray-600" />
              </motion.button>
            ))}
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPreviewVisible(!isPreviewVisible)}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title={isPreviewVisible ? "Hide Preview" : "Show Preview"}
            >
              {isPreviewVisible ? (
                <EyeOff className="w-4 h-4 text-gray-600" />
              ) : (
                <Eye className="w-4 h-4 text-gray-600" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 text-gray-600" />
              ) : (
                <Expand className="w-4 h-4 text-gray-600" />
              )}
            </motion.button>
            <motion.label
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
              title="Upload Markdown File"
            >
              <Upload className="w-4 h-4 text-gray-600" />
              <input
                type="file"
                accept=".md,.markdown"
                onChange={handleFileUpload}
                className="hidden"
              />
            </motion.label>
          </div>
        </div>

        {/* Editor & Preview */}
        <div
          className={`flex ${
            isPreviewVisible ? "divide-x divide-gray-200" : ""
          } flex-col md:flex-row`}
        >
          <div className={isPreviewVisible ? "w-full md:w-1/2" : "w-full"}>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className={`w-full p-4 font-mono text-sm bg-gray-50 focus:bg-white focus:outline-none resize-none ${
                isFullscreen ? "h-[calc(100vh-160px)]" : "h-[600px]"
              }`}
              placeholder="Type your markdown here..."
            />
          </div>
          {isPreviewVisible && (
            <div
              className={`w-full md:w-1/2 p-4 overflow-auto prose prose-sm max-w-none ${
                isFullscreen ? "h-[calc(100vh-160px)]" : "h-[600px]"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components}
                className="prose max-w-none"
              >
                {markdown}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 p-4 flex flex-wrap justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMarkdown("")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors w-full md:w-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-medium">Clear</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors w-full md:w-auto"
          >
            <Download className="w-4 h-4" />
            <span className="font-medium">Download</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors w-full md:w-auto"
          >
            <Copy className="w-4 h-4" />
            <span className="font-medium">{copyStatus}</span>
          </motion.button>
        </div>
      </div>

      {/* Additional Sections - Hidden in fullscreen */}
      {!isFullscreen && (
        <>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Similar Text Tools
              </h2>
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
                    <h3 className="text-sm font-medium text-gray-900">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500">{tool.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Coffee className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Support Our Work
                  </h2>
                  <p className="text-gray-600">
                    Help us keep the tools free and maintained
                  </p>
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
        </>
      )}
    </div>
  );
};

export default MarkdownEditor;
