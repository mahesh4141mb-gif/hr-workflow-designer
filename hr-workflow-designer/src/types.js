import StartNode from './nodes/StartNode'
import TaskNode from './nodes/TaskNode'
import ApprovalNode from './nodes/ApprovalNode'
import AutomatedStepNode from './nodes/AutomatedStepNode'
import EndNode from './nodes/EndNode'

export const NODE_TYPES = {
  start: 'start',
  task: 'task',
  approval: 'approval',
  automated: 'automated',
  end: 'end',
}

export const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedStepNode,
  end: EndNode,
}
