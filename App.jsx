import { useState, useEffect } from 'react'
import Navbar from './container/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

const handleAdd = () => {
  settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
  settodo("")
  saveToLS()
}
const handleChange = (e) => {
  settodo(e.target.value)
}
const handleEdit = (e, id) => {
  let t = todos.filter(i => i.id === id)
  settodo(t[0].todo)
  let newTodos = todos.filter(item => item.id !== id);
  settodos(newTodos)
  saveToLS()
}
const handleDelete = (e, id) => {
  let newTodos = todos.filter(item => item.id !== id);
  settodos(newTodos)
  saveToLS()
}
const handleCheckbox = (e) => {
  let id = e.target.name;
  let index = todos.findIndex(item => { return item.id === id })
  let newTodos = [...todos];
  newTodos[index].iscompleted = !newTodos[index].iscompleted
  settodos(newTodos)
}


return (
  <>
    <Navbar />
    <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
      <div className="addtodo"><h1 className='text-lg font-bold'>Add Todo</h1>
        <input onChange={handleChange} value={todo} type="text" className='w-80' />
        <button onClick={handleAdd} className='bg-violet-800 cursor-pointer hover:bg-violet-950 p-3 py-1 font-bold text-white rounded-md mx-6'>Save</button>
      </div>
      <h2 className="text-lg font-bold">My Todo List</h2>
      <div className="todos">
        {todos.length == 0 && <div>No Todos To Display</div>}
        {todos.map(item => {
          return <div key={item.id} className="todo flex w-1/2 justify-between my-3">
            <input name={item.id} onChange={handleCheckbox} type="checkbox" value={todo.iscompleted} id="" />

            <div className={item.iscompleted ? "line-through" : ""}> {item.todo}</div>
            <div className="buttons">
              <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-violet-800  cursor-pointer hover:bg-violet-950 p-3 py-1 font-bold text-white rounded-md mx-1">Edit</button>
              <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-800 cursor-pointer hover:bg-violet-950 p-3 py-1 font-bold text-white rounded-md mx-1">Delete</button>
            </div>
          </div>
        })}
      </div>
    </div>
  </>
)
}

export default App
