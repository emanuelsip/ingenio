import React, { useState } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import url from './url'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateTask(){
  const[nametask, setNametask] = useState('');
  const[dateovertask, setDateovertask] = useState('');
  const[priortask, setPriortask] = useState('');
   const notify = () => toast;

   function create(){
       let task = {
         nameTask : nametask,
         dateTask : dateovertask,
         priorityTask : priortask,
         idTask:uuid()
       }

       axios.post(url+'/api/task/create',task)
       .then(res=>{
         console.log(res.data);
       }).catch(err =>{ 
        notify.success("Wow so easy!")
         console.log('Hubo un error',err);
       });
    }

    return ( 
        <div>
              <ToastContainer />
         
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
                            onChange={(e)=>{setPriortask(e.target.value)}} defaultValue={priortask}>
                              {['Select priority',1,2,3,4,5].map((option, index) => {
                                    return <option key={index} >
                                        {option}
                                    </option>
                                })}
                            </select>
                          </div>
                        </div>
                        <button type="button" onClick={create} className="btn btn-primary">Submit</button>
                      </div>
                      </div>
                    
                  </div>
              </div>
            
    );
}
export default CreateTask;