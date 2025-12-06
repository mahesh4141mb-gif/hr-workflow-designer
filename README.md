# HR Workflow Designer

A drag-and-drop workflow builder for HR teams. I built this to help HR admins visually design and test their internal processes - things like employee onboarding, leave approvals, document verification, etc.

## Getting Started

You'll need Node.js installed (v16+). Then just:

```bash
npm install
npm run dev
```

Open `http://localhost:5173` and you're good to go.

## How It Works

The app is split into a few main parts:

- **Canvas** - The main workspace where you drag nodes and connect them
- **Sidebar** - Palette of available node types you can drag onto the canvas
- **Node Editor** - Right panel that shows up when you click a node, lets you configure it
- **Sandbox Modal** - Testing interface to simulate your workflow

I used React Flow for the canvas because honestly, building a graph editor from scratch would've taken forever. It handles all the dragging, zooming, and connection logic out of the box.

For state management, I went with Context API instead of Redux. It's simpler and plenty for what we need here. Each node type has its own component and editor form, which keeps things organized.

## What's Built

**Node Types:**
- Start Node - kicks off the workflow
- Task Node - assign work to someone (with due dates, descriptions, etc.)
- Approval Node - route to managers/HRBPs for sign-off
- Automated Step Node - trigger actions like sending emails or generating docs
- End Node - wrap things up

**Features:**
- Drag nodes from the sidebar onto the canvas
- Connect them by dragging between connection points
- Click any node to edit its properties in the right panel
- Delete stuff with Backspace or Delete key
- Test your workflow with the "Test Workflow" button - it'll validate everything and show you a simulation

Each node type has its own config form. For example, Task nodes let you set assignees, due dates, and custom fields. Approval nodes have dropdown for approver roles. The Automated Step node fetches available actions from a mock API and shows relevant input fields.

I added some basic validation too - it'll catch things like missing Start/End nodes, multiple Start nodes, or disconnected nodes when you try to test.

## Design Choices

**Why React Flow?**  
I didn't want to spend time building canvas interactions from scratch. React Flow gives you drag-drop, zoom, pan, and all that stuff for free. Let me focus on the actual workflow logic.

**Why Context API instead of Redux?**  
Honestly, Redux felt like overkill for this. Context API is simpler and does everything we need for a single-page app.

**Mock API**  
I built a simple in-memory mock API so you don't need to spin up a backend to test this. It simulates async calls with Promises. Easy to swap out for a real API later.

**Validation**  
I only validate when you hit "Test Workflow" instead of blocking you while designing. This way you can experiment freely and see errors when you're ready to test.

## Limitations & Assumptions

- No auth - assumes single user
- Workflows don't persist (refresh = reset). Could add localStorage pretty easily though
- Simulation is linear - just follows the first connection it finds, no branching logic yet
- Only one Start node allowed (seemed like a good practice)
- Automation actions are hardcoded - in a real app these would come from the backend
- Built for modern browsers (Chrome, Firefox, Safari, Edge)

## What's Next

If I had more time, here's what I'd add:

- **Save/Load workflows** - export as JSON, import from file
- **Undo/Redo** - because everyone makes mistakes
- **Conditional branching** - decision nodes with if/else paths
- **Better validation** - cycle detection, required field checks
- **Node templates** - pre-configured common workflows
- **Auto-layout** - automatically arrange nodes nicely
- **Mini-map** - for navigating large workflows
- **Keyboard shortcuts** - for power users
- **TypeScript** - would make refactoring safer
- **Tests** - Jest + React Testing Library
- **Accessibility** - proper ARIA labels and keyboard nav

## Tech Stack

- React 19
- React Flow 11 (for the canvas)
- Vite (dev server + build tool)
- Tailwind CSS 4
- ESLint

## Try It Out

Here's a quick example workflow to build:

1. Drag a Start Node onto the canvas, set title to "New Hire Onboarding"
2. Add a Task Node, set assignee to "hr@company.com" and title to "Collect Documents"
3. Add an Approval Node, set approver to "Manager"
4. Add an Automated Step Node, select "Send Email" action
5. Add an End Node, set message to "Onboarding Complete"
6. Connect them all in order (drag from one node's handle to the next)
7. Click "Test Workflow" to see it run

You can delete nodes or connections by selecting them and hitting Backspace/Delete.

## Project Structure

Each node type is self-contained - has its own component file and editor form. Adding a new node type is pretty straightforward, just need to create the node component, editor form, and add it to the types file.

I tried to keep the code clean - functional components with hooks, controlled inputs, proper cleanup. Used Context to avoid prop drilling everywhere.

---

Built by Mahesh Borkar | mahesh4141.mb@gmail.com
