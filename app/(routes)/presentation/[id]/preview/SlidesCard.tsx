import React from "react";

interface SlideCardProps {
  title: string;
  content: string[];
  visuals?: string;
  layout?: string;
  isPreviewMode?: boolean;
}

export default function SlideCard({
  title,
  content,
  visuals,
  layout = "default",
  isPreviewMode = false,
}: SlideCardProps) {
  // Function to render content based on layout type
  const renderContent = () => {
    switch (layout?.toLowerCase()) {
      case "split":
        return (
          <div className="grid grid-cols-2 gap-8 h-full">
            <div className="space-y-4">
              {content.map((item, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
            {visuals && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center p-6">
                <p className="text-gray-600">{visuals}</p>
              </div>
            )}
          </div>
        );

      case "centered":
        return (
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center">
            {content.map((item, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {item}
              </p>
            ))}
            {visuals && (
              <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 w-full">
                <p className="text-gray-600">{visuals}</p>
              </div>
            )}
          </div>
        );

      case "bullets":
        return (
          <div className="space-y-3">
            {content.map((item, index) => (
              <div key={index} className="flex items-start gap-3 group">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 group-hover:scale-150 transition-transform" />
                <p className="text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
            {visuals && (
              <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                <p className="text-gray-600">{visuals}</p>
              </div>
            )}
          </div>
        );

      case "grid":
        return (
          <div className="grid grid-cols-2 gap-6">
            {content.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-shadow"
              >
                <p className="text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
            {visuals && (
              <div className="col-span-2 mt-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <p className="text-gray-600">{visuals}</p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            {content.map((item, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {item}
              </p>
            ))}
            {visuals && (
              <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                <p className="text-gray-600">{visuals}</p>
              </div>
            )}
          </div>
        );
    }
  };

  const containerClasses = isPreviewMode
    ? "h-full p-12 bg-white"
    : "p-6 relative";

  return (
    <div className={containerClasses}>
      {/* Title Section */}
      <div className={`mb-8 ${isPreviewMode ? 'mb-12' : ''}`}>
        {title.startsWith("#") ? (
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {title.replace("#", "").trim()}
          </h1>
        ) : (
          <h2 className="text-2xl font-medium text-gray-800">
            {title}
          </h2>
        )}
        <div className="mt-2 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
      </div>

      {/* Content Section */}
      <div className="relative h-[calc(100%-theme(spacing.8)-theme(spacing.12))]">
        {renderContent()}
      </div>
    </div>
  );
}
