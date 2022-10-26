import Badge from 'react-bootstrap/Badge';

function FormatDate(dateIn,format,pen){
    

    let formatter = (dateIn)=>{
      let date = new Date(dateIn)
      let year = date.getFullYear()
      let month = date.getMonth()+1
      let dd = date.getDate()+1

      if (dd < 10) {
        dd = '0' + dd
      } 
      if (month < 10) {
        month = '0' + month
      }
      return year +'-' +month+ '-'+ dd
    }
    const given = formatter(dateIn)
    const today = formatter(new Date())

    const dateCome = new Date(given)
    const dateToday = new Date(today)

    const overdue = dateToday.getTime() > dateCome.getTime()
    const pending = dateToday.getTime() < dateCome.getTime()

    const bgbadge = (overdue?'danger':pending? 'success':'warning')
    // console.log(format)
    if(format==true){
      return (
        <Badge bg={bgbadge} >{given}</Badge>
      )
    }else if(format==false){
      return given
    }else if(format =='check'){
      // console.log(overdue,format)
      return overdue
    }else if (format=='pending'){
      return pending || dateToday.getTime() == dateCome.getTime()
    }
    
  }

  export default FormatDate;