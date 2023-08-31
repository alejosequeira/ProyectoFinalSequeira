const inp= prompt()
const password=[]
function randomPass(inp){
for(let i=1;i<=inp;i++){
password.push(parseInt((i*Math.random())%9))
}
alert(password.join(""))
console.log(password.join())
}

