require('./src/styles/styles.css')
import {MakeHTML, Validation, CreateList} from './src/script/resources'
import {db} from './src/DB/panel'

const makeHTML = new MakeHTML()
const mainContainer = makeHTML.build(document.querySelector('.main-container'), db.panel.statics)
const createList = new CreateList(mainContainer, db)
createList.start()