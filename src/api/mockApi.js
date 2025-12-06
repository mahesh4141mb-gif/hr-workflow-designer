// Mock API - simulates fetching available automation actions
export const getAutomations = async () => {
  // In a real app, this would be an actual API call
  return [
    { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
    {
      id: 'generate_doc',
      label: 'Generate Document',
      params: ['template', 'recipient'],
    },
  ]
}

// Simulates workflow execution by traversing the node graph
export const simulateWorkflow = async (workflow) => {
  const logs = []
  let currentId = workflow.nodes.find((n) => n.type === 'start')?.id
  
  // Walk through the workflow following the edges
  while (currentId) {
    const node = workflow.nodes.find((n) => n.id === currentId)
    logs.push(`Executing ${node.type}: ${node.data.title || 'Untitled'}`)
    
    const nextEdge = workflow.edges.find((e) => e.source === currentId)
    currentId = nextEdge ? nextEdge.target : null
  }
  
  logs.push('Workflow completed.')
  return logs
}
