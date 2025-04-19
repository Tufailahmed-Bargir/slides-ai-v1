import React, { useCallback } from "react"; // Removed unused useState

interface SlideCardProps {
  title: string;
  content: string[];
  visuals?: string;
  layout?: string;
  isPreviewMode?: boolean;
  isEditing?: boolean; // New prop for editing mode
  onTitleChange?: (newTitle: string) => void; // Callback for title changes
  onContentChange?: (index: number, newContent: string) => void; // Callback for content changes
}

export default function SlideCard({
  title,
  content,
  visuals,
  layout = "default",
  isPreviewMode = false,
  isEditing = false, // Default to false
  onTitleChange,
  onContentChange,
}: SlideCardProps) {

  // Handlers for contentEditable changes
  const handleTitleInput = useCallback((e: React.FormEvent<HTMLHeadingElement>) => {
    // Use currentTarget.innerText which might be more reliable across browsers for contentEditable
    onTitleChange?.(e.currentTarget.innerText || "");
  }, [onTitleChange]);

  const handleContentInput = useCallback((index: number, e: React.FormEvent<HTMLParagraphElement | HTMLDivElement>) => {
    // Use currentTarget.innerText
    onContentChange?.(index, e.currentTarget.innerText || "");
  }, [onContentChange]);

  // Function to render content based on layout type
  const renderContent = () => {
    const baseTextStyle = `text-slate-700 ${isPreviewMode || isEditing ? 'text-lg md:text-xl leading-relaxed' : 'text-base leading-relaxed'}`;
    const visualContainerStyle = `mt-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200 ${isPreviewMode || isEditing ? 'p-8' : ''}`;
    const visualTextStyle = "text-slate-600 italic";

    // Helper to generate props for editable elements
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getEditableProps = (elementType: 'h1' | 'h2' | 'p' | 'div', handler: (e: React.FormEvent<any>) => void, currentText: string, extraClasses: string = "") => {
      const baseEditableClasses = `outline-none focus:ring-2 focus:ring-blue-300 focus:bg-blue-50/50 p-1 rounded-md`;
      if (isEditing) {
        return {
          contentEditable: true,
          suppressContentEditableWarning: true,
          onInput: handler,
          // Combine base text style, editable style, and any extra classes
          className: `${baseTextStyle} ${baseEditableClasses} ${extraClasses}`,
          // Use key based on content to help React diffing? Maybe too complex, stick to index for now.
        };
      } else {
        return { className: `${baseTextStyle} ${extraClasses}` };
      }
    };

    switch (layout?.toLowerCase()) {
      case "split":
        return (
          <div className={`grid ${visuals ? 'grid-cols-2' : 'grid-cols-1'} gap-6 md:gap-8 h-full`}>
            <div className="space-y-4">
              {content.map((item, index) => (
                <p
                  key={`split-content-${index}`}
                  {...getEditableProps('p', (e) => handleContentInput(index, e), item)}
                >
                  {item}
                </p>
              ))}
            </div>
            {visuals && (
              <div className={`${visualContainerStyle} flex items-center justify-center`}>
                <p className={visualTextStyle}>{visuals}</p> {/* Visuals not editable for now */}
              </div>
            )}
          </div>
        );

      case "centered":
        return (
          <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto text-center">
            {content.map((item, index) => (
              <p
                key={`centered-content-${index}`}
                {...getEditableProps('p', (e) => handleContentInput(index, e), item, "mb-4")}
              >
                {item}
              </p>
            ))}
            {visuals && (
              <div className={`${visualContainerStyle} w-full`}>
                <p className={visualTextStyle}>{visuals}</p>
              </div>
            )}
          </div>
        );

      case "bullets":
        const marginTopClass = `mt-[${isPreviewMode || isEditing ? '0.6rem' : '0.5rem'}]`;
        return (
          <div className="space-y-3">
            {content.map((item, index) => (
              <div key={`bullet-item-${index}`} className="flex items-start gap-3">
                <svg className={`w-4 h-4 text-blue-500 ${marginTopClass} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="5" />
                </svg>
                <p
                  {...getEditableProps('p', (e) => handleContentInput(index, e), item)}
                >
                  {item}
                </p>
              </div>
            ))}
            {visuals && (
              <div className={visualContainerStyle}>
                <p className={visualTextStyle}>{visuals}</p>
              </div>
            )}
          </div>
        );

      case "grid":
        const gridCols = isPreviewMode || isEditing ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2';
        const gridItemBaseClass = "p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:shadow-md transition-shadow";
        return (
          <div>
            <div className={`grid ${gridCols} gap-4 md:gap-6`}>
              {content.map((item, index) => (
                <div
                  key={`grid-content-${index}`}
                  {...getEditableProps('div', (e) => handleContentInput(index, e), item)}
                  // Apply base styles when not editing
                  className={isEditing ? getEditableProps('div', (e) => handleContentInput(index, e), item).className : `${gridItemBaseClass} ${baseTextStyle}`}
                >
                  {item} {/* Render item directly as div is contentEditable */}
                </div>
              ))}
            </div>
            {visuals && (
              <div className={`${visualContainerStyle} mt-6`}>
                <p className={visualTextStyle}>{visuals}</p>
              </div>
            )}
          </div>
        );

      default: // Default layout
        return (
          <div className="space-y-4">
            {content.map((item, index) => (
              <p
                key={`default-content-${index}`}
                {...getEditableProps('p', (e) => handleContentInput(index, e), item)}
              >
                {item}
              </p>
            ))}
            {visuals && (
              <div className={visualContainerStyle}>
                <p className={visualTextStyle}>{visuals}</p>
              </div>
            )}
          </div>
        );
    }
  };

  const containerClasses = isPreviewMode
    ? "h-full w-full bg-white flex flex-col p-10 md:p-16" // Preview mode
    : isEditing
    ? "h-full w-full bg-white flex flex-col p-10 md:p-16 border-2 border-blue-300 rounded-lg shadow-lg" // Editing mode style
    : "p-6 md:p-8 relative group bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out aspect-[16/9] flex flex-col"; // Standard card view

  const titleBaseStyle = "font-bold";
  const titleH1Style = `${titleBaseStyle} text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ${isPreviewMode || isEditing ? 'text-4xl md:text-5xl' : ''}`;
  const titleH2Style = `${titleBaseStyle} text-xl md:text-2xl text-slate-800 ${isPreviewMode || isEditing ? 'text-3xl md:text-4xl' : ''}`;
  const dividerStyle = `mt-2 w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full ${isPreviewMode || isEditing ? 'w-24 h-1.5' : ''}`;

  // Generate title props based on editing state
  const titleElement = title.startsWith("#");
  const currentTitleStyle = titleElement ? titleH1Style : titleH2Style;
  const titleEditableProps = isEditing ? {
    contentEditable: true,
    suppressContentEditableWarning: true,
    onInput: handleTitleInput,
    className: `${currentTitleStyle} outline-none focus:ring-2 focus:ring-blue-300 focus:bg-blue-50/50 p-1 rounded-md`,
  } : { className: currentTitleStyle };

  return (
    <div className={containerClasses}>
      {/* Title Section */}
      <div className={`mb-6 md:mb-8 ${isPreviewMode || isEditing ? 'mb-8 md:mb-12' : ''} flex-shrink-0`}>
        {titleElement ? (
          <h1 {...titleEditableProps}>
            {title.replace("#", "").trim()}
          </h1>
        ) : (
          <h2 {...titleEditableProps}>
            {title}
          </h2>
        )}
        <div className={dividerStyle} />
      </div>

      {/* Content Section */}
      <div className={`relative flex-grow overflow-y-auto pr-2 -mr-2 ${isPreviewMode ? 'scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100' : ''}`}>
        {renderContent()}
      </div>

      {/* Footer/Branding (Optional - Example) */}
      {(isPreviewMode || isEditing) && (
         <div className="mt-8 pt-4 border-t border-slate-200 text-right flex-shrink-0">
           <span className="text-xs text-slate-400">{isEditing ? 'Editing Mode' : 'Generated by SlidesAI'}</span>
         </div>
       )}
    </div>
  );
}
