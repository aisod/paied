'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const { language, isPortuguese } = useLanguage();
  const [ReactMarkdown, setReactMarkdown] = useState<any>(null);
  const [remarkGfm, setRemarkGfm] = useState<any>(null);
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<any>(null);
  const [oneDark, setOneDark] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    
    // Dynamically import all markdown-related libraries only on client side to avoid SSR issues
    Promise.all([
      import('react-markdown').then((mod) => mod.default),
      import('remark-gfm').then((mod) => mod.default),
      import('react-syntax-highlighter').then((mod) => mod.Prism).catch(() => null),
      import('react-syntax-highlighter/dist/esm/styles/prism').then((mod) => mod.oneDark).catch(() => null)
    ]).then(([Markdown, Gfm, Prism, style]) => {
      if (isCancelled) return;
      
      setIsMounted(true);
      setReactMarkdown(() => Markdown);
      setRemarkGfm(() => Gfm);
      setSyntaxHighlighter(() => Prism);
      setOneDark(style);
    }).catch((err) => {
      if (isCancelled) return;
      console.error('Failed to load markdown libraries:', err);
      setError('Failed to load content renderer');
    });
    
    return () => {
      isCancelled = true;
    };
  }, []);

  // Handle empty content
  if (!content || content.trim().length === 0) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        <p className="text-gray-500 italic">No content available.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        <p className="text-red-600">Error loading content. Please refresh the page.</p>
      </div>
    );
  }

  if (!isMounted || !ReactMarkdown || !remarkGfm) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  // Filter content based on language
  const filterContentByLanguage = (text: string): string => {
    const lines = text.split('\n');
    const filteredLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if line contains language tags
      const hasEN = /\(EN\)/i.test(line);
      const hasPT = /\(PT\)/i.test(line);
      
      if (hasEN || hasPT) {
        // This is a language-specific line
        if (isPortuguese) {
          // Portuguese users: prefer PT, fall back to EN if PT not available
          if (hasPT) {
            // Remove (PT) tag and show the line
            filteredLines.push(line.replace(/\(PT\)/gi, '').trim());
          } else if (hasEN) {
            // Fall back to EN if no PT version exists
            filteredLines.push(line.replace(/\(EN\)/gi, '').trim());
          }
        } else {
          // English users: only show EN links (never show PT links)
          if (hasEN) {
            filteredLines.push(line.replace(/\(EN\)/gi, '').trim());
          }
          // Skip PT-only lines for English users
        }
      } else {
        // Regular line without language tags - always include
        filteredLines.push(line);
      }
    }

    return filteredLines.join('\n');
  };

  const filteredContent = filterContentByLanguage(content);

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={remarkGfm ? [remarkGfm] : []}
        components={{
          h1: ({ children }: { children: React.ReactNode }) => (
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6 mt-8 first:mt-0 leading-tight">{children}</h1>
          ),
          h2: ({ children }: { children: React.ReactNode }) => (
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 mt-8 leading-tight">{children}</h2>
          ),
          h3: ({ children }: { children: React.ReactNode }) => (
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 mt-6 leading-tight">{children}</h3>
          ),
          h4: ({ children }: { children: React.ReactNode }) => (
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 mt-5 leading-tight">{children}</h4>
          ),
          p: ({ children }: { children: React.ReactNode }) => (
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }: { children: React.ReactNode }) => (
            <ul className="list-disc list-outside text-gray-700 mb-4 space-y-2 ml-6">{children}</ul>
          ),
          ol: ({ children }: { children: React.ReactNode }) => (
            <ol className="list-decimal list-outside text-gray-700 mb-4 space-y-2 ml-6">{children}</ol>
          ),
          li: ({ children }: { children: React.ReactNode }) => (
            <li className="text-base sm:text-lg text-gray-700 leading-relaxed">{children}</li>
          ),
          blockquote: ({ children }: { children: React.ReactNode }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6 bg-gray-50 py-3 rounded-r">
              {children}
            </blockquote>
          ),
          code: ({ node, inline, className, children, ...props }: { node?: any; inline?: boolean; className?: string; children: React.ReactNode; [key: string]: any }) => {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match && isMounted && SyntaxHighlighter && oneDark) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg my-6"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            return (
              <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          table: ({ children }: { children: React.ReactNode }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }: { children: React.ReactNode }) => (
            <thead className="bg-gray-50">{children}</thead>
          ),
          tbody: ({ children }: { children: React.ReactNode }) => (
            <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
          ),
          tr: ({ children }: { children: React.ReactNode }) => (
            <tr className="hover:bg-gray-50">{children}</tr>
          ),
          th: ({ children }: { children: React.ReactNode }) => (
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }: { children: React.ReactNode }) => (
            <td className="px-6 py-4 text-sm text-gray-700">{children}</td>
          ),
          a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 underline font-medium"
            >
              {children}
            </a>
          ),
          strong: ({ children }: { children: React.ReactNode }) => (
            <strong className="font-semibold text-gray-900">{children}</strong>
          ),
          em: ({ children }: { children: React.ReactNode }) => (
            <em className="italic text-gray-700">{children}</em>
          ),
          img: ({ src, alt, ...props }: { src?: string; alt?: string; [key: string]: any }) => {
            if (!src) return null;
            // Handle both relative and absolute URLs
            const imageSrc = src.startsWith('http') ? src : `/images/${src}`;
            return (
              <div className="my-8">
                <Image
                  src={imageSrc}
                  alt={alt || 'Curriculum image'}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-sm border border-gray-200 w-full h-auto"
                  onError={(e) => {
                    // Fallback to a placeholder or hide on error
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                  {...props}
                />
              </div>
            );
          },
        }}
      >
        {filteredContent}
      </ReactMarkdown>
    </div>
  );
}
