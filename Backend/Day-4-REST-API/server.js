/* 
    - Server ko start karna
*/

const app = require("./src/app")

app.listen(3000,()=>{
    console.log("server has started at port 3000")
})