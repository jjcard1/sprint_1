export const db = {
  panel:{
    statics:[
      // INPUTS BOX
      {cont:'main', elem:'div', class: 'inputs-box'},

      // options start
      {cont:['class', 'inputs-box'], elem: 'div', class: 'options-start'},
      {cont:['class', 'options-start'], elem: 'button', id: 'add_worker',class: 'button-a', text: 'Add worker'},
      {cont:['class', 'options-start'], elem: 'button', id: 'add_task', class: 'button-a', text: 'Add task'},

      // options details
      {cont:['class', 'inputs-box'], elem: 'div', class: 'options-details oc'},

      // TASKS BOX
      {cont:'main', elem:'div', class: 'tasks-box'}
    ],
    dinamics:{
      boxAddWorker:[
        {cont: 'main', elem:'div', class: 'box-add-worker'},
        {cont: ['class', 'box-add-worker'], elem:'div', class: 'head-add-worker'},
        {cont: ['class', 'head-add-worker'], elem:'p', text: 'Create a new Worker'},

        {cont: ['class', 'box-add-worker'], elem:'div', class: 'body-add-worker'},
        {cont: ['class', 'body-add-worker'], elem:'form', id: 'form_new_worker', class: 'form-new-worker'},
        {cont: ['class', 'form-new-worker'], elem:'input', id: 'input_new_worker', type: 'text', placeholder: 'New Worker'},
        {cont: ['class', 'form-new-worker'], elem:'button', id: 'btn_new_worker', class: 'button-add', text: 'Add'},

        {cont: ['class', 'box-add-worker'], elem:'div', class: 'list-add-worker'},

        {cont: ['class', 'box-add-worker'], elem:'div', class: 'btns-add-worker'},
        {cont: ['class', 'btns-add-worker'], elem: 'button', class: 'button-back', text:'Back'},
        {cont: ['class', 'btns-add-worker'], elem: 'button', class: 'button-a', text:'Add Task'}
      ],
      boxAddTask:[
        {cont: 'main', elem: 'div', class: 'box-add-task'},
        {cont: ['class', 'box-add-task'], elem: 'div', class: 'head-add-task'},
        {cont: ['class', 'head-add-task'], elem:'p', text: 'Add a new Task'},

        {cont: ['class', 'box-add-task'], elem: 'div', class: 'body-add-task'},
        {cont: ['class', 'body-add-task'], elem: 'form', id: 'form_new_task', class: 'form-new-task'},
        {cont: ['class', 'form-new-task'], elem:'input', id: 'input_name_task', type: 'text', placeholder: 'Name Task'},
        {cont: ['class', 'form-new-task'], elem:'textarea', id: 'input_description_task', type: 'text', placeholder: 'Task description'},

        {cont: ['class', 'form-new-task'], elem:'div', class: 'cont-select-task'},
        {cont: ['class', 'cont-select-task'], elem:'p', text: 'Worker'},
        {cont: ['class', 'cont-select-task'], elem:'select', id: 'select_task', class: 'select-task'},

        {cont: ['class', 'form-new-task'], elem:'div', id: 'cont_date_start', class: 'cont-input-date'},
        {cont: ['id', 'cont_date_start'], elem:'p', text: 'Start'},
        {cont: ['id', 'cont_date_start'], elem:'input', id: 'input_start_task', type: 'date'},

        {cont: ['class', 'form-new-task'], elem:'div', id: 'cont_date_finish', class: 'cont-input-date'},
        {cont: ['id', 'cont_date_finish'], elem:'p', text:'Finish'},
        {cont: ['id', 'cont_date_finish'], elem:'input', id: 'input_finish_task', type: 'date'},


        {cont: ['class', 'form-new-task'], elem:'div', class: 'cont-btn-addTask'},
        {cont: ['class', 'cont-btn-addTask'], elem:'button', id: 'btn_add_task', class: 'button-add', text: 'Add', condition: 'new'},
        {cont: ['class', 'cont-btn-addTask'], elem:'button', id: 'btn_edit_task', class: 'button-edit', text: 'Edit', condition: 'edit'},
        {cont: ['class', 'cont-btn-addTask'], elem:'button', id: 'btn_cancelEdit_task', class: 'button-delete', text: 'Cancel', condition: 'edit'},
        
        {cont: ['class', 'box-add-task'], elem: 'div', class: 'btns-add-task'},
        {cont: ['class', 'btns-add-task'], elem: 'button', class: 'button-back', text:'Back'},
        {cont: ['class', 'btns-add-task'], elem: 'button', class: 'button-a', text:'Add Worker'}
      ],
      tableTask:[
        {cont: 'main', elem: 'div', class: 'cont-search-table'},
        {cont: ['class', 'cont-search-table'], elem: 'div', class: 'cont-search'},
        {cont: ['class', 'cont-search'], elem: 'h4', text: 'To Do List'},
        {cont: ['class', 'cont-search'], elem: 'input', type: 'text', id: 'input_search', class: 'input-search', placeholder: 'Search Task'},

        {cont: ['class', 'cont-search-table'], elem: 'div', class: 'cont-table-task'},
        {cont: ['class', 'cont-table-task'], elem: 'table', class: 'table-task'},
        {cont: ['class', 'table-task'], elem: 'thead', class: 'thead-task'},
        {cont: ['class', 'thead-task'], elem: 'tr', class: 'trH'},
        {cont: ['class', 'trH'], elem: 'th', class: 't-header th-num', text: 'N°', dataset1: ['data-key', 'num']},
        {cont: ['class', 'trH'], elem: 'th', class: 't-header th-task', text: 'Task', dataset1: ['data-key', 'task']},
        {cont: ['class', 'trH'], elem: 'th', class: 't-header th-description', text: 'Description', dataset1: ['data-key', 'description']},
        {cont: ['class', 'trH'], elem: 'th', class: 't-header th-worker', text: 'Worker in charge', dataset1: ['data-key', 'worker']},
        {cont: ['class', 'trH'], elem: 'th', class: 't-header th-start', text: 'Start', dataset1: ['data-key', 'start']},
        {cont: ['class', 'trH'], elem: 'th', class: 't-header th-finish', text: 'Finish', dataset1: ['data-key', 'finish']},
        {cont: ['class', 'trH'], elem: 'th', class: 't-header th-status', text: 'Status', dataset1: ['data-key', 'status']},
        {cont: ['class', 'trH'], elem: 'th', class: 't-header th-actions', text: 'Actions', dataset1: ['data-key', 'actions']},

        {cont: ['class', 'table-task'], elem: 'tbody', class: 'tbody-task'}
      ]
    },
    lists:{
      optionsStatus: [{value: 'pending', text: 'Pending'}, {value: 'progress', text: 'in Progress'}, {value: 'review', text: 'in Review'}, {value: 'finalized', text: 'Finalized'}],
      btnsActionsTable: ['edit', 'delete']
    }
  }
}