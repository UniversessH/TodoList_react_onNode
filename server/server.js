const bodyParser = require('body-parser') //引入bodyParser
const express = require("express") //引入Express
const app = express() //设置app作为Express实例
const MongoClient = require('mongodb').MongoClient //引入MongoDB服务
const { Cursor } = require("mongodb")//这是啥？
const url = "mongodb://owner:hjc030121@81.68.216.32:27017/Todolist_react"

MongoClient.connect(url, {
  useUnifiedTopology: true //必加，去除警告
}, (err, client) => {
  if (err) return console.error(err)//错误处理
  console.log('Connected to Database')

  const db = client.db('crud_exp')
  const todoCollection = db.collection('todo') //声明一个collection

  app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET.DELETE,OPTIONS");
    res.header("X-Powered-By", "3.2.1");
    res.header("Content-Type", "application/json;charset = utf-8")
  })

  app.listen(3001, function () {  //创建本地服务器并指定端口
    console.log("listening on 3001")
  })

  //app.use(express.static('public'))//通过此中间件使得public文件夹能够访问
  app.use(bodyParser.urlencoded({ extended: true })) //中间件，使Express能够从form表单中读取数据，同时在发出请求前整理请求体
  app.use(bodyParser.json())//使服务器能够读取json


  app.get('/', (req, res) => {
    res.send("getSuccess")
    /*todoCollection.find().toArray()
      .then(results => {
        console.log(results)
        res.send(results)
      })
      .catch(error => {
        console.error(error)
      })
      */
  })//配置初始页面加载时的端口

  app.post('/addTodo', (req, res) => {
    //console.log(req.body)
    todoCollection.insertOne(req.body)
      .then(result => {
        res.json("success")
        console.log("addtodo Success!")
      })
      .catch(error => {
        console.error(error)
        res.send(error)
      })
  })//配置添加todo相应的端口

  app.put('/checkboxOfTodoItem', (req, res) => {
    todoCollection.findOneAndUpdate(
      { id: req.body.id },
      {
        $set: {
          done: req.body.done
        }
      },
    )
      .then(result => {
        res.redirect('/')
        console.log("check on one success!")
      })
      .catch(error => console.error(error))
  })//配置勾选单个todo的端口

  app.put('/checkAll', (req, res) => {
    todoCollection.updateMany(
      {},
      {
        $set: {
          done: req.body.done
        }
      }
    )
      .then(result => {
        console.log('check on all Success!')
      })
      .catch(error => error(error))
  })//配置勾选全部时的端口

  app.put('/deleteTodo', (req, res) => {
    todoCollection.deleteOne(
      { id: req.body.id },
    )
      .then(result => {
        console.log('Delete Success!')
      })
      .catch(error => error(error))
  })//配置删除todo(包括单个删除和删除已做完的)的端口
})

