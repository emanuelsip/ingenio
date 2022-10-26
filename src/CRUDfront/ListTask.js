import React, { useEffect,useState ,useMemo} from "react"
import axios from "axios"
import RowsTasks from "./RowsTasks";
import { useParams } from 'react-router-dom';
import url from './url'
import formatDate from './FormatDate'
import Swal from 'sweetalert2'



const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);
  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    // console.log(sortableItems)
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  return { items: sortedItems, requestSort, sortConfig };
};

function ListTask(){
    const params = useParams()
    let counter = 0;
    const [tasks,setTasks] = useState([]);
    useEffect(()=>{
      axios.get(url+'/api/task').then(res=>{
        let copyTask = [...res.data]
        let newTask = copyTask.filter(
          function (item,index){
            if(params.duet=='duet'){
              return formatDate(item.dateTask,'check')
            }else{
              return formatDate(item.dateTask,'pending')
            }
          }
          
        )
         setTasks(newTask)
      }).catch(err=>{
        console.log('Error al crear el usuario',err);
      })
    },[])

    const { items, requestSort, sortConfig } = useSortableData(tasks);
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    

    

    const deleteTask = (number,idTask)=>{
      // MySwal.fire({
      //   // title: <p>Hello World</p>,
      //   text: 'Are you sure to delete?',
      //   icon: 'warning',
      // }).then(() => {
        
      // })
      // console.log();


        Swal.fire({
          title: 'Warning!',
          text: 'Are you sure to delete?',
          icon: 'warning',
          showDenyButton: true,
       }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(url+'/api/task/destroy/'+idTask).then(res=>{
              let copyTask = [...tasks]
              copyTask = copyTask.filter(
                (item,index) => 
                  number !=index
              )
              setTasks(copyTask)
              Swal.fire('Deleted!', '', 'success')
            }).catch(err=>{
              console.log('Error al borrar el usuario',err);
            })
          
        } else if (result.isDenied) {
          
        }
      })
      
      
      
    }
    const allTasks = items.map((task,index)=>{
      counter++
      return (
        <RowsTasks 
            task={task} 
            deleteTask={deleteTask}
            index={index}
            counter={counter}
            />
            
      )
      
    })
    return ( 
      
        <div className="container-fluid">
          <template id="my-template">
                <swal-title>
                  Save changes to "Untitled 1" before closing?
                </swal-title>
                <swal-icon type="warning" color="red"></swal-icon>
                <swal-button type="confirm">
                  Save As
                </swal-button>
                <swal-button type="cancel">
                  Cancel
                </swal-button>
                <swal-button type="deny">
                  Close without Saving
                </swal-button>
                <swal-param name="allowEscapeKey" value="false" />
                <swal-param
                  name="customClass"
                  value='{ "popup": "my-popup" }' />
                <swal-function-param
                  name="didOpen"
                  value="popup => console.log(popup)" />
              </template>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name 
                          <button
                            type="button"
                            onClick={() => requestSort('nameTask')}
                            className={getClassNamesFor('nameTask')}
                          ></button>
                        </th>
                        <th>Due date
                        <button
                            type="button"
                            onClick={() => requestSort('dateTask')}
                            className={getClassNamesFor('dateTask')}
                          ></button>
                        </th>
                        <th>Priority
                        <button
                            type="button"
                            onClick={() => requestSort('priorityTask')}
                            className={getClassNamesFor('priorityTask')}
                          ></button>
                        </th>
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