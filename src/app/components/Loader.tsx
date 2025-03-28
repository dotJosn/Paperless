import React from 'react'

export default function StarLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-16 h-16 animate-spin">
        <div className="absolute top-0 left-1/2 w-4 h-4 bg-gray-400 rounded-full transform -translate-x-1/2"></div>
        <div className="absolute top-1/2 right-0 w-4 h-4 bg-gray-400 rounded-full transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-400 rounded-full transform -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-0 w-4 h-4 bg-gray-400 rounded-full transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-gray-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  )
}
