import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToolsSidebar } from '../components/tools/ToolsSidebar';
import { CaseConverter } from './tools/text/CaseConverter';
import { LoremIpsum } from './tools/text/LoremIpsum';
import { WordCounter } from './tools/text/WordCounter';
import { JsonFormatter } from './tools/text/JsonFormatter';
import { MarkdownEditor } from './tools/text/MarkdownEditor';
import { CropTool } from './tools/image/CropTool';

export const Tools = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex">
      {/* Fixed sidebar */}
      <div className="hidden lg:block w-80 min-w-[320px] border-r border-gray-200 bg-white">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <ToolsSidebar />
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 min-w-0">
        <div className="max-w-[1600px] mx-auto p-8">
          <Routes>
            <Route path="text/case-converter" element={<CaseConverter />} />
            <Route path="text/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="text/word-counter" element={<WordCounter />} />
            <Route path="text/json-formatter" element={<JsonFormatter />} />
            <Route path="text/markdown-editor" element={<MarkdownEditor />} />
            <Route path="image/crop-tool" element={<CropTool />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};