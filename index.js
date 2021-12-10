const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const Task = require('./models/task')

const app = express()
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './task-list.db' })
const tasks = Task(sequelize, DataTypes)

app.set('view engine', 'ejs')

// Criando um middleware para chamar JSON com sucesso
app.use(express.json())

// Listando as tarefas
app.get('/tasks', async(req, res) => {
  const allTasks = await tasks.findAll()
  res.json({ allTasks })
})

// Inserindo tarefas
app.post('/tasks', async(req, res) => {
  try {
    const body = req.body  
    const taskCreate = await tasks.create({
      description: body.description  
    })
    res.json(taskCreate)
  } catch (error) {
    console.log(error);
  }  
})

// Buscando um determinado id
app.get('/tasks/:id', async(req, res) => {
  const taskId = req.params.id
  const task = await tasks.findByPk(taskId)
  res.send({ id: task.id, name: task.description })
})

// Atualizando tarefas
app.put('/tasks/:id', async(req, res) => {  
  try {
    const taskId = req.params.id
    const body = req.body
    const taskUpdate = await tasks.findByPk(taskId)
    taskUpdate.update({
      description: body.description,
      done: body.done
    })    
    res.send("Atualizado com sucesso!")
  } catch (error) {
    console.log(error);
  } 
})

// Deletando tarefas
app.delete('/tasks/:id', async(req, res) => {
  try {
    const taskId = req.params.id
    const taskRemove = await tasks.destroy({ where: {id: taskId}})
    res.send({ action: 'Tarefa deletado!!!', taskRemove: taskRemove })
  } catch (error) {
    console.log(error);
  } 
})

app.listen(9090, () => {
  console.log('Iniciando o ExpressJS na porta 9090')
})