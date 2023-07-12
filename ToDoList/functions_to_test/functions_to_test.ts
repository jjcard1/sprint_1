const models = require("../cli/models/taskModel");
const db = require("../cli/db");

const data = [
   {
      _id: '123456',
      name: 'task',
      description: 'description',
      manager: 'somebody'
   }
]

const list = () => {
   const list = data
   const filteredList = list.map((item:any) => ({
      name: item.name,
      description: item.description,
      manager: item.manager
   }))
   // console.table(filteredList)
   return filteredList[0].name
}

const add = ( task: any ) => {
   const data = task
   console.log('the new task was created successfully')
   return data[0].name
};

const del = (n:number) => {
   const list = data
   const id = list[n]._id.toString()
   const deleted = list[n]
   console.log(`Task: ${id}, was deleted successfully`)
   return deleted.name
}

const update = (n:number, taskToUpdate:any) => {
   const list = data
   const id = list[n]._id.toString()
   const dataUpdated = list.find(obj => obj._id === id)
   console.log(`The task was updated`)
   return dataUpdated?.name
}

const find = (text:string) => {
   //const textReg = new RegExp(text, 'i')
   const result = data.filter(obj => obj.manager === text)

   if(result.length === 0){
      console.log('Result: There is no task that contains the typed text')
      return 'no task finded'
   }
   if(result.length > 0){
      // console.table([{
      //    id: result[0]._id.toString(),
      //    name: result[0].name,
      //    description: result[0].description,
      //    manager: result[0].manager
      // }])
      // await db.connectionDB.close()
      // process.exit(0)
      return result[0]._id
   }
}

module.exports = {list, add, del, update, find}
