import React, { useEffect,useState ,useMemo} from "react"
import axios from "axios"
import RowsTasks from "./RowsTasks";
import { useParams } from 'react-router-dom';
import url from './url'
import formatDate from './FormatDate'


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
      // console.log();
       axios.delete(url+'/api/task/destroy/'+idTask).then(res=>{
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