"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface CreateWatchlistModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string) => void
}

export default function CreateWatchlistModal({ isOpen, onClose, onCreate }: CreateWatchlistModalProps) {
  const [watchlistName, setWatchlistName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (watchlistName.trim()) {
      onCreate(watchlistName.trim())
      setWatchlistName("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">Create New Watchlist</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={watchlistName}
            onChange={(e) => setWatchlistName(e.target.value)}
            placeholder="Enter watchlist name"
            className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-black placeholder-gray-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-150"
          >
            Create Watchlist
          </button>
        </form>
      </div>
    </div>
  )
}
