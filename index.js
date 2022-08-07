/* Your Code Here */

function createEmployeeRecord(info) {
    let newEmployee = {};
    newEmployee.firstName = info[0];
    newEmployee.familyName = info[1];
    newEmployee.title = info[2];
    newEmployee.payPerHour = info[3];
    newEmployee.timeInEvents = [];
    newEmployee.timeOutEvents = [];
    return newEmployee;
}

function createEmployeeRecords(employees) {
    let records = employees.map(employee => createEmployeeRecord(employee));
    return records;
}

function createTimeInEvent(dateTime) {
    let timeIn = {};
    timeIn.type = "TimeIn";
    [timeIn.date, timeIn.hour] = dateTime.split(' ');
    timeIn.hour = parseInt(timeIn.hour,10);
    this.timeInEvents.push(timeIn);
    return this;
}

function createTimeOutEvent(dateTime) {
    let timeOut = {};
    timeOut.type = "TimeOut";
    [timeOut.date, timeOut.hour] = dateTime.split(' ');
    timeOut.hour = parseInt(timeOut.hour,10);
    this.timeOutEvents.push(timeOut);
    return this;
}

function hoursWorkedOnDate(date) {
    let inTime = 0;
    let outTime = 0;
    this.timeInEvents.forEach(event => {
        if(event.date === date) {
            inTime = event.hour;
        }
    })
    this.timeOutEvents.forEach(event => {
        if(event.date === date) {
            outTime = event.hour;
        }
    })
    return (outTime - inTime)/100;
}

function wagesEarnedOnDate(date) {
    let hoursCalc = hoursWorkedOnDate.bind(this);
    return hoursCalc(date) * this.payPerHour;
}

function findEmployeeByFirstName(srcArray,firstName) {
    let foundEmp = undefined;
    srcArray.forEach(employee => {
        if(employee.firstName == firstName) {
            foundEmp = employee;
        }
    })
    return foundEmp;
}
function calculatePayroll(employees) {
     let payRoll = 0;
     employees.forEach(employee => {
         let wages = allWagesFor.bind(employee)
         payRoll = payRoll + wages();
     })
     return payRoll;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

