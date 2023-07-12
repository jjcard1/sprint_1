export class MakeHTML{

  constructor(){}

  model(obj){
    const newObj = {
      cont: obj.cont,
      elem: obj.elem,
      id: obj.id,
      class: obj.class,
      value: obj.value,
      type: obj.type,
      placeholder: obj.placeholder,
      text: obj.text,
      dataset1: obj.dataset1,
      any: obj.any,
      condition: obj.condition
    }
    return newObj
  }

  create(container, obj){
    const elem = document.createElement(obj.elem)
    if(obj.id){elem.setAttribute('id', obj.id)}
    if(obj.class){elem.setAttribute('class', obj.class)}
    if(obj.value){elem.setAttribute('value', obj.value)}
    if(obj.type){elem.setAttribute('type', obj.type)}
    if(obj.placeholder){elem.setAttribute('placeholder', obj.placeholder)}
    if(obj.text){elem.append(obj.text)}
    if(obj.dataset1){elem.setAttribute(obj.dataset1[0], obj.dataset1[1])}
    if(obj.any){elem.setAttribute(obj.any, '')}

    if(obj.cont === 'main'){container.appendChild(elem)}
    if(obj.cont.length === 2){
      let cont = ''
      if(obj.cont[0] === 'id'){cont = container.querySelector(`#${obj.cont[1]}`)}
      if(obj.cont[0] === 'class'){cont = container.querySelector(`.${obj.cont[1]}`)}
      if(cont){cont.appendChild(elem)}
    }

    return elem
  }

  build(container, data, arConditions = ['new'], specificData = undefined) {
    let arraySpecificIds = []
    if(specificData){arraySpecificIds = Object.keys(specificData)}
    this.container = container
    this.data = data
    if(this.data.length > 0){
      this.data.forEach(dat => {
        const obj = this.model(dat)
        if(!obj.condition){
          if(specificData){
            let ifId = false
            if(obj.id){ifId = arraySpecificIds.some(id => id === obj.id)}
            if(ifId){
              const elem = this.create(this.container, obj)
              elem.value = specificData[obj.id]
            } 
            else{this.create(this.container, obj)}
          }
          else{this.create(this.container, obj)}
        }

        let stateConditions = false
        if(obj.condition){stateConditions = arConditions.some(ar => ar === obj.condition)}
        if(stateConditions){
          const elem = this.create(this.container, obj)
          if(elem.id === 'btn_edit_task'){
            elem.setAttribute('data-edit', specificData['btn_edit_task'])
            elem.setAttribute('data-status', specificData['status'])
          }
        }
        
      })
    }
    return container
  }
}

export class Validation{
  container
  constructor(container){
    this.container = container
  }

  errorMessage(text){
    const background = document.createElement('div')
    background.setAttribute('class', 'background-error')
    const contText = document.createElement('div')
    contText.setAttribute('class', 'cont-error-text')
    const p = document.createElement('p')
    p.append(text)
    const buttonOK = document.createElement('button')
    buttonOK.setAttribute('class', 'button-ok')
    buttonOK.append('Ok')

    contText.appendChild(p)
    contText.appendChild(buttonOK)
    background.appendChild(contText)
    this.container.appendChild(background)

    buttonOK.addEventListener('click', (e) => {
      this.container.removeChild(background)
      e.preventDefault()
    })
  }

  inputText(elem){
    const data = {state: false, text: ''}
    const text = elem.value
    // if(!text){
    //   this.errorMessage()
    //   return new Error('Error')
    // }
    if(text === ''){
      this.errorMessage('The box is empty. Please write a name of the worker')
      return new Error('Error')
    }
    data.state = true
    data.text = text
    return data
  }
}

export class CreateList{
  container
  inputsBox
  tasksBox
  optionsStart
  optionsDetails
  table
  workersList
  arrayWorkers
  arrayListToDo

  constructor(container, db){
    this.container = container
    this.inputsBox = container.querySelector('.inputs-box')
    this.tasksBox = container.querySelector('.tasks-box')
    this.optionsStart = this.inputsBox.querySelector('.options-start')
    this.optionsDetails = this.inputsBox.querySelector('.options-details')
    this.table = ''
    this.makeHTML = new MakeHTML()
    this.validation = new Validation()
    this.db = db
    this.workersList = []
    this.arrayWorkers = []
    this.arrayListToDo = []
  }

  start(){
    this.table = this.makeHTML.build(this.tasksBox, this.db.panel.dinamics.tableTask)
    this.inputsBox.addEventListener('click', (e) => {
      if(e.target.id === 'add_worker'){
        this.addWorkerBox()
        e.preventDefault()
      }
      
      if(e.target.id === 'add_task'){
        this.addTaskBox()
        e.preventDefault()
      }
    })
  }

  addWorkerBox(){
    this.optionsStart.classList.add('oc')
    this.optionsDetails.classList.remove('oc')
    this.optionsDetails.innerHTML = ''
    const contAddWorker = this.makeHTML.build(this.optionsDetails, this.db.panel.dinamics.boxAddWorker)
    this.createWorker(contAddWorker)
  }

  addTaskBox(editData = undefined){ 
    this.optionsStart.classList.add('oc')
    this.optionsDetails.classList.remove('oc')
    this.optionsDetails.innerHTML = ''

    if(editData){this.makeHTML.build(this.optionsDetails, this.db.panel.dinamics.boxAddTask, ['edit'], editData)}
    else{this.makeHTML.build(this.optionsDetails, this.db.panel.dinamics.boxAddTask)}
    
    const select = this.optionsDetails.querySelector('#select_task')
    if(this.arrayWorkers.length === 0){
      const option = document.createElement('option')
      option.append('No worker has been created')
      select.appendChild(option)
    }
    if(this.arrayWorkers.length > 0){
      this.arrayWorkers.forEach(worker => {
        const option = document.createElement('option')
        option.setAttribute('value', worker.id)
        option.append(worker.name)
        select.appendChild(option)
      })
      if(!editData){select.selectedIndex = -1}
    }
    this.createTasks(this.optionsDetails)
  }

  createWorker(container){
    const form = container.querySelector('#form_new_worker')
    const contList = container.querySelector('.list-add-worker')
    this.makeHTML.build(contList, this.workersList)
    
    const btnAdd = container.querySelector('#btn_new_worker')
    btnAdd.addEventListener('click', (e) => {
      contList.innerHTML = ''
      const inputText = container.querySelector('#input_new_worker')
      const textValidated = this.validation.inputText(inputText)
      if(!textValidated.state){ // esta linea presenta error porque textValidated.state no esta devolviendo false
        e.preventDefault()
        return
      }
      
      const id = Math.trunc(Math.random() * Math.pow(10, 15)).toString(16)
      
      // create workers array
      this.arrayWorkers.push({id: `worker_${id}`, name: textValidated.text})
      
      // create workers list
      const contWorker = {cont: 'main', elem:'div', id: `cWorker_${id}`, class: 'cont-worker-name'}
      const worker = {cont: ['id', `cWorker_${id}`], elem:'p', text: textValidated.text}
      const contBtns = {cont: ['id', `cWorker_${id}`], elem:'div', id: `btnsEdDel_${id}`, class: 'cont-editDelete'}
      const btnEdit = {cont: ['id', `btnsEdDel_${id}`], elem:'button', id:`btnEd_${id}` , class: 'btn16 button-edit-ic'}
      const btnDelete = {cont: ['id', `btnsEdDel_${id}`], elem:'button', id: `btnDel_${id}`, class: 'btn16 button-delete-ic', any: 'delete'}
      this.workersList.push(contWorker)
      this.workersList.push(worker)
      this.workersList.push(contBtns)
      this.workersList.push(btnEdit)
      this.workersList.push(btnDelete)
      this.makeHTML.build(contList, this.workersList)
      form.reset()
      e.preventDefault()
    })

    contList.addEventListener('click', (e) => {
      if(e.target.classList.contains('button-edit-ic')){
        let idNum = e.target.id.split('_')[1]
      }
      
      if(e.target.classList.contains('button-delete-ic')){
        let idNum = e.target.id.split('_')[1]
      }
    })

    const optionsStart = this.inputsBox.querySelector('.options-start')

    const btnBack = container.querySelector('.button-back')
    btnBack.addEventListener('click', () => {
      container.classList.add('oc')
      optionsStart.classList.remove('oc')
    })

    const btnAddTask = container.querySelector('.button-a')
    btnAddTask.addEventListener('click', () => {this.addTaskBox()})
  }

  formInfoTask(form, typeCRUD = 'create', id, status){
    const nameTask = form.querySelector('#input_name_task').value
    const descriptionTask = form.querySelector('#input_description_task').value
    const workerTask = this.arrayWorkers.find(worker => worker.id === form.querySelector('#select_task').value)
    const startTask = form.querySelector('#input_start_task').value
    const finishTask = form.querySelector('#input_finish_task').value
    const idTask = Math.trunc(Math.random() * Math.pow(10, 10)).toString(16)

    if(typeCRUD === 'create'){this.arrayListToDo.push({id: idTask, name: nameTask, description: descriptionTask, worker: workerTask.name, start: startTask, finish: finishTask, status: 'pending'})}

    if(typeCRUD === 'update'){
      const obj = {id: id, name: nameTask, description: descriptionTask, worker: workerTask.name, start: startTask, finish: finishTask, status: status}
      const ed = this.arrayListToDo.find(ar => ar.id === id)
      const index = this.arrayListToDo.indexOf(ed)
      this.arrayListToDo.splice(index, 1, obj)
    }
  }

  createTasks(block){
    const btnAdd = block.querySelector('#btn_add_task')
    if(btnAdd){
      btnAdd.addEventListener('click', (e) => {
        this.formInfoTask(block.querySelector('form'))
        this.createTableTask()
        block.querySelector('#form_new_task').reset()
        block.querySelector('#select_task').selectedIndex = -1
        e.preventDefault()
      })
    }

    const btnEdit = block.querySelector('#btn_edit_task')
    if(btnEdit){
      btnEdit.addEventListener('click', (e) => {
        const id = btnEdit.dataset.edit
        const status = btnEdit.dataset.status
        this.formInfoTask(block.querySelector('form'), 'update', id, status)
        this.createTableTask()
        block.querySelector('#form_new_task').reset()
        block.querySelector('#select_task').selectedIndex = -1
        e.preventDefault()
      })
    }
    const btnCancel = block.querySelector('#btn_cancelEdit_task')
    if(btnCancel){}

    const btnBack = block.querySelector('.button-back')
    btnBack.addEventListener('click', () => {
      block.classList.add('oc')
      this.inputsBox.querySelector('.options-start').classList.remove('oc')
    })

    const btnAddWorker = block.querySelector('.button-a')
    btnAddWorker.addEventListener('click', () => {this.addWorkerBox()})
  }

  createTableTask(){
    const arrayTH = this.db.panel.dinamics.tableTask.filter(it => it.elem === 'th')
    const tbody = this.table.querySelector('.tbody-task')
    tbody.innerHTML = ''
    let n = 1
    let elemTooltip = []
    this.arrayListToDo.forEach(it => {
      const tr = document.createElement('tr')
      arrayTH.forEach(th => {
        const td = document.createElement('td')
        td.setAttribute('class', `td-${th.dataset1[1]}`)
        if(th.dataset1[1] === 'num'){td.append(n)}
        if(th.dataset1[1] === 'task'){
          td.setAttribute('id', `task_${it.id}`)
          td.classList.add(`task-${it.status}`)
          td.append(it.name)
          elemTooltip.push(td)
        }
        if(th.dataset1[1] === 'description'){
          td.append(it.description)
          elemTooltip.push(td)
        }
        if(th.dataset1[1] === 'worker'){td.append(it.worker)}
        if(th.dataset1[1] === 'start'){td.append(it.start)}
        if(th.dataset1[1] === 'finish'){td.append(it.finish)}
        if(th.dataset1[1] === 'status'){
          const select = document.createElement('select')
          select.setAttribute('id', `selectTask_${it.id}`)
          select.setAttribute('class', 'select-status')
          const list = this.db.panel.lists.optionsStatus
          list.forEach(item => {  
            const option = document.createElement('option')
            option.setAttribute('value', item.value)
            option.append(item.text)
            select.appendChild(option)
          })
          select.value = it.status
          td.append(select)
        }
        if(th.dataset1[1] === 'actions'){
          const contBtns = document.createElement('div')
          const btns = this.db.panel.lists.btnsActionsTable
          btns.forEach(item => {
            const btn = document.createElement('button')
            btn.setAttribute('id', `${item}_${it.id}`)
            btn.setAttribute('class', `btn20 button-${item}-ic`)
            contBtns.appendChild(btn)
          })
          td.append(contBtns)
        }
        tr.appendChild(td)
      })
      tbody.appendChild(tr)
      n++
    })

    if(elemTooltip.length > 0){elemTooltip.forEach(elem => this.toolTips(elem))}
    this.actionsTable()
  }

  actionsTable(){
    const selects = this.table.querySelectorAll('.select-status')
    selects.forEach(sel => sel.addEventListener('change', () => {
      const selectValue = sel.value
      const key = sel.id.split('_')[1]
      const task = this.table.querySelector(`#task_${key}`)
      const itemTask = this.arrayListToDo.find(item => item.id === key)
      itemTask.status = selectValue
      task.setAttribute('class', `td-task task-${selectValue}`)
    }))

    let objEdit = {}
    const editBtns = this.table.querySelectorAll('.button-edit-ic')
    editBtns.forEach(btn => btn.addEventListener('click', () => {
      const key = btn.id.split('_')[1]
      const elem = this.arrayListToDo.find(item => item.id === key)
      if(elem.id){objEdit['btn_edit_task'] = elem.id}
      if(elem.name){objEdit['input_name_task'] = elem.name}
      if(elem.description){objEdit['input_description_task'] = elem.description}
      if(elem.worker){objEdit['select_task'] = elem.worker}
      if(elem.start){objEdit['input_start_task'] = elem.start}
      if(elem.finish){objEdit['input_finish_task'] = elem.finish}
      if(elem.status){objEdit['status'] = elem.status}

      this.addTaskBox(objEdit)
    }))

    const deleteBtns = this.table.querySelectorAll('.button-delete-ic')
    deleteBtns.forEach(btn => btn.addEventListener('click', () => {
      const key = btn.id.split('_')[1]
      const elem = this.arrayListToDo.find(item => item.id === key)
      const index = this.arrayListToDo.indexOf(elem)
      if(index > -1){
        this.arrayListToDo.splice(index, 1)
        this.createTableTask()
      }
    }))
  }

  toolTips(elem){
    if(elem.textContent !== ''){
      const coordinates = elem.getBoundingClientRect()
      const p = document.createElement('p')
      p.setAttribute('class', 'tooltip-task')
      p.append(elem.textContent)
      p.style.top = `${coordinates.y + coordinates.height + 4}px`
      p.style.left = `${coordinates.x + 4}px`
      this.container.appendChild(p)
  
      elem.addEventListener('mouseover', () => p.style.display = 'inline')
      elem.addEventListener('mouseout', () => p.style.display = 'none')
    }
  }
}