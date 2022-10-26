import React, { useEffect,useState } from "react"
import axios from "axios"
import RowsTasks from "./RowsTasks";
import { useParams } from 'react-router-dom';
function ListTask(){
    const params = useParams()
    
    const [tasks,setTasks] = useState([]);
    useEffect(()=>{
      
      axios.get('https://backendingenio.herokuapp.com/api/task'+(params.duet?'/duet':'')).then(res=>{
        setTasks(res.data)
      }).catch(err=>{
        console.log('Error al crear el usuario',err);
      })
    },[])

    
    const deleteTask = (number,idTask)=>{
      // console.log();
       axios.delete('https://backendingenio.herokuapp.com/api/task/destroy/'+idTask).then(res=>{
          let copyTask = [...tasks]
          copyTask = copyTask.filter(
            (item,index) => 
              number !=index
          )
          setTasks(copyTask)
       }).catch(err=>{
         console.log('Error al borrar el usuario',err);
       })
      
      
    }
    const allTasks = tasks.map((task,index)=>{
      return (
        <RowsTasks 
            task={task} 
            deleteTask={deleteTask}
            index={index}
            />
      )
    })
    return ( 
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Due date</th>
                        <th>Priority</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTasks}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default ListTask;