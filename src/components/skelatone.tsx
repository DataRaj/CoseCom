export const TableRowLoading = () => (
  <div className="w-full animate-pulse">
    <div className="flex items-center space-x-4 p-4 border-b border-gray-700/30">
      <div className="h-16 w-16 rounded-md bg-gray-700/40"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-700/40 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700/40 rounded w-1/2"></div>
      </div>
      <div className="h-8 w-16 bg-gray-700/40 rounded"></div>
    </div>
  </div>
);

// Component for address form loading animation
export const AddressFormLoading = () => (
  <div className="space-y-4 animate-pulse">
    <div className="bg-background shadow rounded-lg p-6 border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 bg-gray-700/40 rounded w-36"></div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/40 rounded w-16"></div>
            <div className="h-6 bg-gray-700/40 rounded w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/40 rounded w-16"></div>
            <div className="h-6 bg-gray-700/40 rounded w-full"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/40 rounded w-24"></div>
          <div className="h-6 bg-gray-700/40 rounded w-full"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/40 rounded w-20"></div>
          <div className="h-6 bg-gray-700/40 rounded w-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/40 rounded w-16"></div>
            <div className="h-6 bg-gray-700/40 rounded w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/40 rounded w-16"></div>
            <div className="h-6 bg-gray-700/40 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Button loading state component
export const ButtonLoading = () => (
  <button 
    className="w-full py-3 px-4 bg-primary/60 rounded-md font-medium text-black flex items-center justify-center cursor-not-allowed"
    disabled
  >
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Processing...
  </button>
);