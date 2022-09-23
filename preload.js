window.addEventListener('DOMContentLoaded',()=>{
    const os = require('os');

    const networkInterfaces = os.networkInterfaces()
    console.log(networkInterfaces)
    let ip

    for(let nc of Object.keys(networkInterfaces)){
        for(let item of networkInterfaces[nc]){
            if(item.family === 'IPv4'){
                ip = item.address
                break
            }
        }
    }
    if(ip) sessionStorage.setItem('ip',ip)
})