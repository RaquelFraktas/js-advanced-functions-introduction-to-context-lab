// Your code here
function createEmployeeRecord(eRecord){
  return {
      firstName : eRecord[0],
          familyName : eRecord[1],
          title : eRecord[2],
          payPerHour: eRecord[3],
          timeInEvents: [],
          timeOutEvents: []
        }

}

function createEmployeeRecords(records){
  return records.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(eObj, dateStamp){

      eObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]

    });
    return eObj
        
}

function createTimeOutEvent(eObj, dateStamp){
    let [date, hour] = dateStamp.split(" ")
    eObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return eObj
}

function hoursWorkedOnDate(eObj, dateArg){
    let timeIn= eObj.timeInEvents.find(function(e){
       return dateArg === e.date
    })
let timeOut= eObj.timeOutEvents.find(function(e){
    return dateArg === e.date
 })
   return (timeOut.hour- timeIn.hour)/100;
}

function wagesEarnedOnDate(emp, dateArg){
   let hours= hoursWorkedOnDate(emp, dateArg);
   return emp.payPerHour * hours
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(d => d.date)
    let payable = dates.reduce((acc, d) => acc + wagesEarnedOnDate(employee, d), 0)
    return payable
}

function calculatePayroll(empRecords){
  let sum = empRecords.reduce((acc, employee)=> acc + allWagesFor(employee), 0)
  return sum;
}

function findEmployeeByFirstName(srcArray, fName){
   return srcArray.find(record => record.firstName === fName)

}