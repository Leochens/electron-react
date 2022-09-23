import './App.css';
// import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
// import routes from './route';
// import {ipcRenderer} from 'electron'
import { Button,Col,Input,Row,Space } from 'antd'
import { useEffect, useState } from 'react';
// import axios from 'axios'

function App() {

  const [ config,setConfig ] =  useState(null)
  const [ip,setIp] = useState(sessionStorage.getItem('ip'))
  const [port,setPort] = useState(8888)


  useEffect(()=>{
    const config = localStorage.getItem('config')
    if(config){
      setConfig(config)
    }
  },[])

  // function setConfig(){
  //   localStorage.setItem('config',JSON.stringify({ip: '172.25.156.141',port: 8080}))
  // }
  
  return (
    <div>
      <Row className='title' align='center'>
        滴滴代理助手
      </Row>
      <Row className='main' align='center'>

        { config
        ? <>
          <Button className='submit-btn'>更新代理</Button>
        </>
        :<div>
          <h3 style={{textAlign:'left'}}>你的电脑ip:</h3>
          <Input value={ip} onInput={(e)=>setIp(e.target.value)} className='input' placeholder='请输入您的ip' />
          <h3 style={{textAlign:'left'}}>你的代理端口port:</h3>
          <Input value={port} onInput={(e)=>setPort(e.target.value)} className='input' placeholder='请输入您的代理端口port' />
          
          <Button className='submit-btn'>设置代理</Button>

        </div>}

      </Row>
      <Row align='center'>
          <Button type='link'>高级设置</Button> 
      </Row>
    </div>
  );
}

export default App;
