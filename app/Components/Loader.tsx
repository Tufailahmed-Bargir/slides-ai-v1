export default function Loader() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent animate-spin shadow-lg" />
          <div className="absolute inset-2 rounded-full border-8 border-blue-200 shadow-inner" />
          <div className="absolute inset-6 bg-blue-500 rounded-full animate-pulse shadow-md" />
        </div>
      </div>
    );
  }
  