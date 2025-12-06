import { Handle, Position } from 'reactflow'

const EndNode = ({ data }) => (
  <div className="bg-red-100 border-2 border-red-600 rounded-lg px-6 py-4 text-center font-semibold">
    <Handle type="target" position={Position.Left} />
    <div className="text-red-800">End</div>
    <div className="text-sm mt-1">{data.endMessage || 'Workflow Complete'}</div>
  </div>
)
export default EndNode
