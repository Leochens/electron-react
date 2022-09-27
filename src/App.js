// import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
// import routes from './route';
// import {ipcRenderer} from 'electron'
import { Button, Col, Input, message, Row, Space } from 'antd'
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProxyUrlList from './components/proxy-url-list';
// const REMOTE_HOST = 'http://10.96.89.102:8080'
const REMOTE_HOST = 'http://127.0.0.1:8080'

function App() {

  const [config, setConfig] = useState(null)
  const [id, setId] = useState('')
  const [ip, setIp] = useState(sessionStorage.getItem('ip'))
  const [port, setPort] = useState(8888)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [proxyList, setProxyList] = useState([])
  const [pac, setPac] = useState(null)
  const [loading,setLoading] = useState(false)



  useEffect(() => {
    let _config = localStorage.getItem('config')

    if (_config) {
      _config = JSON.parse(_config)
      setConfig(_config)
      setPac(`${REMOTE_HOST}/pac?id=${_config.id}`)
    }
  }, [])


  const configProxy = () => {
    if (!id || !ip || !port) return message.error("请输入完整参数！")
    setLoading(true)
    axios.post(`${REMOTE_HOST}/set`, {
      id: id,
      ip,
      port,
      urls: proxyList,
    }, {
      headers: {
        "content-type": 'application/json'
      }
    }).then(r => {
      if (r.status === 200) {
        if (r.data.err) {
          message.error(r.data.err)
        } else {
          message.success('代理配置上传成功，请按照提示操作！')
          const config = { id, ip, port };
          localStorage.setItem('config', JSON.stringify(config))
          setPac(r.data.data)
          setConfig(config)
        }
      } else {
        message.error(r.statusText)
      }
    }).catch(e => {
      message.error(e)
    }).finally(()=>{
      setLoading(false)

    })
  }

  const updateProxy = () => {
    if (!config || !config.id) {
      return message.error("config不存在！")
    }

    setLoading(true)
    axios.post(`${REMOTE_HOST}/set`, {
      id: config.id,
      urls: proxyList,
    }, {
      headers: {
        "content-type": 'application/json'
      }
    }).then(r => {
      console.log(r)
      if (r.status === 200) {
        if (r.data.err) {
          message.error(r.data.err)
        } else {
          message.success('更新成功，请在手机上重启wifi！')
          const config = { id, ip: r.data.ip, port: r.data.port };
          localStorage.setItem('config', JSON.stringify(config))
          setPac(r.data.data)
          setConfig(config)
        }
      } else {
        message.error(r.statusText)
      }
    }).catch(e => {
      message.error(e)
    }).finally(()=>{
      setLoading(false)
    })
  }

  return (
    <div className='main-wrap'>
      <Row className='title' align='center'>
        滴滴代理助手
      </Row>
      <Row className='main' align='center'>

        {config && config.id
          ? <>
            <div className='cur-proxy'>
              <div>当前代理id：{config.id}</div>
              <div>当前代理地址：{config.ip}:{config.port}</div>
            </div>
            <Button loading={loading} onClick={updateProxy} type='primary' shape='round' className='submit-btn' style={{ height: 40, width: 130 }}>一键更新代理</Button>

          </>
          : <div>
            <h4 style={{ textAlign: 'left', color: "#666" }}>你的唯一标识id:</h4>
            <Input value={id} onInput={(e) => setId(e.target.value)} className='input' placeholder='请输入您的id' />
            <h4 style={{ textAlign: 'left', color: "#666" }}>你的ip(默认本机ip):</h4>
            <Input value={ip} onInput={(e) => setIp(e.target.value)} className='input' placeholder='请输入您的ip' />
            <h4 style={{ textAlign: 'left', color: "#666" }}>你的代理端口port:</h4>
            <Input value={port} onInput={(e) => setPort(e.target.value)} className='input' placeholder='请输入您的代理端口port' />

            <Button loading={loading} onClick={configProxy} type='primary' shape='round' className='submit-btn'>设置代理</Button>
          </div>}

      </Row>
      {config && <div style={{ textAlign: 'center' }}>
        <Button onClick={() => {
          setConfig(null)
          localStorage.removeItem('config')
        }} >重置代理</Button>
      </div>}


      <div style={{ textAlign: 'center' }}>

        <Button onClick={() => setShowAdvanced(!showAdvanced)} type='link'>代理白名单设置</Button>
        {showAdvanced && <ProxyUrlList onChangeProxyList={setProxyList} />}
      </div>
      {pac && <div className='bottom-tip'>
        <p className='pac-tip' style={{ color: '#999' }}>请复制以下url到手机端配置自动代理</p>
        <p className='pac-tip'>{pac}</p>
      </div>}
    </div>
  );
}

export default App;
