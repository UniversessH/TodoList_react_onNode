# TodoList_react_onNode

本项目基于原来的todolist_react修改而来，目前Node服务出现了些莫名其妙的问题（应该是和数据库有关），等之后有时间了再来修一下...

1. 技术栈:React + Axios + Node.js + Express + MongoDB

### 目前存在的问题

1. CORS报错

   可使用express中间件http://expressjs.com/en/resources/middleware/cors.html解决

2. 请求和server目前写法存在问题

3. **目前测试到的** : 可能是数据库的问题，postman向Crud那个项目的node服务器发请求是没问题的，但是向此项目的node服务器发请求完全不能正常，后续需要对此进行修复，也可能是服务哪个地方出现了问题