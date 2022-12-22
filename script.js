const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault() 
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    // console.log(afterElement)
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
    // const draggable = document.querySelector('.dragging')
    // container.appendChild(draggable)
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
   // need to first find out what elements are in the container, and drag the elements were NOT dragging

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2 // if offset positve, then cursor is above ; if negative, cursor is below
    console.log(offset)
    if (offset < 0 && offset > closest.offset) { // we want to target the offset that is NOT less than zero, but as close to zero as possible
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element // sets this so every other number is lower than that
}

// var x = new Date().toLocaleDateString(new Intl.DateTimeFormat("en", { dateStyle: "full", timeStyle: "full" }));
// const date = new Date();            // THIS IS PART OF ATTEMPT 1 ; UNCOMMENT IF NEED TO REVERT
// console.log(new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(date));
// console.log(x)

// var today = new Date();
// var date = today.getDay()


async function getCentralTime() {

  let quickTime = new Promise(function(resolve,reject) {

    var start_date = new Date();
    var utc_offset = start_date.setUTCHours(28); // time coming in 24 hours behind - gonna add 24 to offset and see what happens
    var utc_time = new Date(utc_offset).toLocaleString();

    resolve("US Central Time " + utc_time);
  })
  document.getElementById("central_time").innerHTML = await quickTime
}

getCentralTime();
setInterval(getCentralTime, 1000);

async function getUtcTime() {

  let quickTime = new Promise(function(resolve,reject) {

    var start_date = new Date();
    var utc_offset = start_date.setUTCHours(9);
    var utc_time = new Date(utc_offset).toLocaleString();

    resolve("UTC Standard Time " + utc_time);
  })
  document.getElementById("utc_time").innerHTML = await quickTime
}

getUtcTime();
setInterval(getUtcTime, 1000);

async function getNewRelicTime() {

  let quickTime = new Promise(function(resolve,reject) {

    var start_date = new Date();
    var utc_offset = start_date.setUTCHours(28); // this has been off 1 day behind, adding 24 hours to fix offset
    var utc_time = new Date(utc_offset).toLocaleString();

    resolve("New Relic App Time " + utc_time);
  })
  document.getElementById("newrelic_time").innerHTML = await quickTime
}

getNewRelicTime();
setInterval(getNewRelicTime, 1000);

async function getSplunkTime() {

  let quickTime = new Promise(function(resolve,reject) {

    var start_date = new Date();
    var utc_offset = start_date.setUTCHours(11);
    var utc_time = new Date(utc_offset).toLocaleString();

    resolve("Splunk App Time " + utc_time);
  })
  document.getElementById("splunk_time").innerHTML = await quickTime
}

getSplunkTime();
setInterval(getSplunkTime, 1000);

async function getColoradoTime() {

  let quickTime = new Promise(function(resolve,reject) {

    var start_date = new Date();
    var utc_offset = start_date.setUTCHours(27); // time has been behind by 1 day, adding 24 hours to offset
    var utc_time = new Date(utc_offset).toLocaleString();

    resolve("Denver Mountain Daylight Time " + utc_time);
  })
  document.getElementById("colorado_time").innerHTML = await quickTime
}

getColoradoTime();
setInterval(getColoradoTime, 1000);

async function getFloridaTime() {

  let quickTime = new Promise(function(resolve,reject) {

    var start_date = new Date();
    var utc_offset = start_date.setUTCHours(22); // florida time 12/22 4pm - coming in as 12/21 11 pm - adjust offset from 5 (+17) to 22
    var utc_time = new Date(utc_offset).toLocaleString();

    resolve("Florida Eastern Daylight Time " + utc_time);
  })
  document.getElementById("florida_time").innerHTML = await quickTime
}

getFloridaTime();
setInterval(getFloridaTime, 1000);
