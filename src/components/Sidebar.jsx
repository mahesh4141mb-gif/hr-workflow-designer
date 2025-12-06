import { NODE_TYPES } from '../types'

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    // Set the node type data for the drop handler
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="w-64 bg-gray-100 p-6 border-r border-gray-300">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Nodes</h2>
      <div className="space-y-3">
        {Object.values(NODE_TYPES).map((type) => (
          <div
            key={type}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing border border-gray-200 font-medium text-gray-700"
            onDragStart={(e) => onDragStart(e, type)}
            draggable
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Node
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
