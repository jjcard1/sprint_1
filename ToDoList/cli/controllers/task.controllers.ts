const modelTaskSchema = require("../models/taskModel");
const connections = require("../db");

const tasksList = async () => {
   const list = await modelTaskSchema.find().lean()
   const filteredList = list.map((item:any) => ({
      name: item.name,
      description: item.description,
      manager: item.manager
   }))
   console.table(filteredList)
   await connections.connectionDB.close()
   process.exit(0)
}

const addTask = async ( task: any ) => {
   await modelTaskSchema.create(task)
   console.log('the new task was created successfully')
   tasksList()
};

const deleteTask = async (n:number) => {
   const list = await modelTaskSchema.find().lean()
   const id = list[n]._id.toString()
   await modelTaskSchema.findByIdAndDelete(id)
   console.log(`Task: ${id}, was deleted successfully`)
   tasksList()
}

const updateTask = async (n:number, taskToUpdate:any) => {
   const list = await modelTaskSchema.find().lean()
   const id = list[n]._id.toString()
   await modelTaskSchema.updateOne({_id: id}, taskToUpdate)
   console.log(`The task was updated`)
   tasksList()
}

const findTask = async (text:string) => {
   const textReg = new RegExp(text, 'i')
   const result = await modelTaskSchema.find({
      $or: [{name: textReg}, {description: textReg}, {manager: textReg}]
   })

   if(result.length === 0){
      console.log('Result: There is no task that contains the typed text')
      await connections.connectionDB.close()
      process.exit(0)
   }
   if(result.length > 0){
      console.table([{
         id: result[0]._id.toString(),
         name: result[0].name,
         description: result[0].description,
         manager: result[0].manager
      }])
      await connections.connectionDB.close()
      process.exit(0)
   }
}

module.exports = {tasksList, addTask, deleteTask, updateTask, findTask}
