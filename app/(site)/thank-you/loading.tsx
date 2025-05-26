export default function ThankYouLoading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl text-primary-700 font-medium">Processing your request...</h2>
        <p className="text-gray-500 mt-2">Please wait while we confirm your submission.</p>
      </div>
    </div>
  )
}
