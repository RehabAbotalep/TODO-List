
let myForm = document.querySelector('#myForm')
let readData = () => JSON.parse(localStorage.getItem('tasks')) || []
let setData = (data) => localStorage.setItem('tasks', JSON.stringify(data))

let tBody = document.querySelector('#tBody')

let createMyOwnElement = (parent, element, txt, classes) =>{
    let myElement = document.createElement(element)
    parent.appendChild(myElement)
    if(txt!="") myElement.innerText = txt
    if(classes!="") myElement.classList = classes
    return myElement
}

let drawTable = (tasks) => {
    tBody.innerText = " "
    tasks.forEach((task, index) => {
        let tr = createMyOwnElement(tBody, 'tr', '', '')
        createMyOwnElement(tr,'td', index+1, "")
        createMyOwnElement(tr,'td', task.title, "")
        createMyOwnElement(tr,'td', task.content, "")
        let td = createMyOwnElement(tr, 'td','','')
        let btnDelete= createMyOwnElement(td, 'button', 'delete', 'btn btn-danger')

        btnDelete.addEventListener('click', function(e){
            tasks.splice(index, 1)
            setData(tasks)
            drawTable(tasks)
        })
    });
}


if(myForm){
    myForm.addEventListener('submit', function(e){
        e.preventDefault()
        let tasks = readData()
        let task = {
            title : this.elements.title.value,
            content : this.elements.content.value,
        }
    
        tasks.push(task)
        setData(tasks)
        this.reset()
        window.location.href="index.html"
    
    })
}

if(tBody){
    
    tasks = readData()
    drawTable(tasks)
    
}



