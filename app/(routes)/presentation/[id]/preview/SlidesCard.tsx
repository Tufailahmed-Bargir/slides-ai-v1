interface SlideProps {
    title: string
    content: string[]
    visuals?: string
    layout?: string
  }
  
  export default function SlideCard({ title, content, visuals, layout }: SlideProps) {
    // This component now assumes each slide is a complete slide with multiple points
    return (
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <h2 className="text-3xl font-bold p-6 pb-2">{title}</h2>
  
        <div className="p-4">
          {content.map((point, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-4 last:mb-0">
              <div className="bg-blue-100 p-4 rounded-l-md flex items-center">
                <h3 className="text-lg font-medium text-blue-500">
                  {/* Extract a title from the point or use a default */}
                  {point.includes(":")
                    ? point.split(":")[0]
                    : point.split(".")[0].length < 50
                      ? point.split(".")[0]
                      : point.split(" ").slice(0, 5).join(" ")}
                </h3>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-r-md text-gray-700">
                <p>
                  {/* Extract the description from the point or use the full point */}
                  {point.includes(":")
                    ? point.split(":").slice(1).join(":")
                    : point.split(".").length > 1
                      ? point.split(".").slice(1).join(".")
                      : point.split(" ").slice(5).join(" ")}
                </p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Keep these hidden but available if needed */}
        {visuals && (
          <div className="hidden text-sm text-gray-500 italic">
            <strong>Visual Suggestion:</strong> {visuals}
          </div>
        )}
  
        {layout && (
          <div className="hidden text-sm text-gray-400">
            <strong>Layout:</strong> {layout}
          </div>
        )}
      </div>
    )
  }
  