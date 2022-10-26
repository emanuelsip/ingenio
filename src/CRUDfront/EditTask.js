import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';

function EditTask(){
  const params = useParams()
  const[nametask, setNametask] = useState('')
  const[dateovertask, setDateovertask] = useState('')
  const[priortask, setPriortask] = useState('')

    useEffect(()=>{
      axios.post('/api/task/edit',{id:params.id})
      .then(res=>{
        let taskG = res.data[0]
        setNametask(taskG.nameTask);
        setDateovertask(formatDate(taskG.dateTask));
        setPriortask(taskG.priorityTask);
      })
      .catch(err=>{
        console.log('Error al obtener el usuario',err)
      })
    },[])

    function formatDate(dateIn){
      let date = new Date(dateIn)
      let year = date.getFullYear()
      let month = date.getMonth()+1
      let dd = date.getDate()

      if (dd < 10) {
        dd = '0' + dd
      }
      if (month < 10) {
        month = '0' + month
      }
      return year +'-' +month+ '-'+ dd
    }
    function editTask(){
      let task = {
        nameTask : nametask,
        dateTask : dateovertask,
        priorityTask : priortask,
        idTask:params.id
      }
      axios.put('/api/task/update',task)
      .then(res=>{
        console.log(res.data)
      }).catch(err =>{
        
        console.log('Hubo un error',err)
      });
    }

    return ( 
        <div>
          
                <div className="card">
                  <div className="card-body">
                    
                      <div className="row">
                        <div className="col-12">
                          <div className='mb-3'>
                            <label htmlFor="nameTask" className="form-label">Name task</label>
                            <input type="text" className="form-control" id="nameTask" value={nametask}
                              onChange={(e)=>{setNametask(e.target.value)}}></input>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className='mb-3'>
                            <label htmlFor="dueDate" className="form-label">Due date</label>
                            <input type="date" className="form-control" id="dueDate" value={dateovertask}
                            onChange={(e)=>{setDateovertask(e.target.value)}}></input>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className='mb-3'>
                            <label className="form-check-label" htmlFor="priority">Priority</label>
                            <select className="form-select" aria-label="priority"
                            onChange={(e)=>{setPriortask(e.target.value)}} value={priortask}>
                              {['Select priority',1,2,3,4,5].map((option, index) => {
                                    return <option key={index} >
                                        {option}
                                    </option>
                                })}
                            </select>
                          </div>
                        </div>
                        <button type="button" onClick={editTask} className="btn btn-primary">Update</button>
                      </div>
                      </div>
                    
                  </div>
              </div>
            
    );
}
export default EditTask;