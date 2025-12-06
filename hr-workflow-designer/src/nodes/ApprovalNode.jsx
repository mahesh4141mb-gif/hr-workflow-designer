import { Handle, Position } from 'reactflow'

const ApprovalNode = ({ data }) => (
  <div className="bg-purple-100 border-2 border-purple-600 rounded-lg px-6 py-4 text-center">
    <Handle type="target" position={Position.Left} />
    <div className="font-semibold text-purple-900">Approval</div>
    <div className="text-sm">{data.title || 'Awaiting Approval'}</div>
    <Handle type="source" position={Position.Right} />
  </div>
)
export default ApprovalNode
