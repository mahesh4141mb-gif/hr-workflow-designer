import { useState } from 'react'

const StartEditor = ({ data = {}, updateData }) => {
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')
  const metadata = data.metadata || {}

  const addMetadata = () => {
    if (newKey.trim()) {
      updateData({ metadata: { ...metadata, [newKey]: newValue } })
      setNewKey('')
      setNewValue('')
    }
  }

  const removeMetadata = (key) => {
    const { [key]: _removed, ...rest } = metadata
    updateData({ metadata: rest })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Workflow Title
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          value={data.title ?? ''}
          onChange={(e) => updateData({ title: e.target.value })}
          placeholder="e.g. New Employee Onboarding"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Metadata (Key-Value Pairs)
        </label>
        {Object.entries(metadata).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2 mb-2">
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              {key}: {value}
            </span>
            <button
              onClick={() => removeMetadata(key)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              ×
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Key"
            className="flex-1 px-2 py-1 border rounded text-sm"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            className="flex-1 px-2 py-1 border rounded text-sm"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button
            onClick={addMetadata}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        This is the starting point of your workflow.
      </p>
    </div>
  )
}

export default StartEditor
