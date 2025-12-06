import { Handle, Position } from 'reactflow'

const TaskNode = ({ data }) => (
  <div className="bg-blue-100 border-2 border-blue-600 rounded-lg px-6 py-4">
    <Handle type="target" position={Position.Left} />
    <div className="font-semibold text-blue-900">Task</div>
    <div className="text-sm">{data.title || 'Untitled Task'}</div>
    <Handle type="source" position={Position.Right} />
  </div>
)
export default TaskNode
