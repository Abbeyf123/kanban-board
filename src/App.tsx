

import KanbanBoard from './Components/KanbanBoard'

const App = () => {
  return (
    <div>
      <h2 className='text-center font-bold '>This Website is best Viewed on Desktop </h2>
      <h3 className='text-center font-bold text-sm text-blue-500 mt-2'>Drag to move and delete tasks</h3>
      <KanbanBoard/>
    </div>
  )
}

export default App