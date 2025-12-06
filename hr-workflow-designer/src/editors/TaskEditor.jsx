import { useState } from 'react'

const TaskEditor = ({ data = {}, updateData }) => {
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')
  const customFields = data.customFields || {}

  const handleChange = (field) => (e) => {
    updateData({ [field]: e.target.value })
  }

  const addCustomField = () => {
    if (newKey.trim()) {
      updateData({ customFields: { ...customFields, [newKey]: newValue } })
      setNewKey('')
      setNewValue('')
    }
  }

  const removeCustomField = (key) => {
    const { [key]: _removed, ...rest } = customFields
    updateData({ customFields: rest })
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Title *</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={data.title || ''}
          onChange={handleChange('title')}
          placeholder="e.g. Submit Documents"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          value={data.description || ''}
          onChange={handleChange('description')}
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Assignee</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={data.assignee || ''}
          onChange={handleChange('assignee')}
          placeholder="employee@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Due Date</label>
        <input
          type="date"
          className="w-full border rounded px-2 py-1"
          value={data.dueDate || ''}
          onChange={handleChange('dueDate')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Custom Fields</label>
        {Object.entries(customFields).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2 mb-2">
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              {key}: {value}
            </span>
            <button
              onClick={() => removeCustomField(key)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              ×
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Field name"
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
            onClick={addCustomField}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskEditor
