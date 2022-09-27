import { Input, List, Modal, message, Button } from 'antd';
import { PlusOutlined,CloseOutlined } from '@ant-design/icons'
import { useEffect } from 'react';
import { useState } from 'react';
import './index.less'


export default function ProxyUrlList({onChangeProxyList}) {

    const [list, setList] = useState([])
    const [modalOpen, setModelOpen] = useState(false);
    const [isAddNewItem, setIsAddNewItem] = useState(false);
    const [curEditIndex, setCurEditIndex] = useState(-1);
    const [newItem, setNewItem] = useState('');

    useEffect(()=>{
        onChangeProxyList(list)
    },[list,onChangeProxyList])


    useEffect(() => {
        let i = localStorage.getItem('list')
        if (i) {
            i = JSON.parse(i)
            setList(i)
        }
    }, [])
    const handleOk = () => {
        const _list = list.slice();
        // 判断是否是新增项
        if (isAddNewItem) {
            _list.push(newItem)
            message.success("新增成功")
        } else {
            if (curEditIndex === -1) return message.error("请重新选择后再试！");
            _list.splice(curEditIndex, 1, newItem);
            message.success("修改成功")
        }
        // 更新
        setList(_list)
        localStorage.setItem('list',JSON.stringify(_list))
        handleCancel()

    }
    const handleCancel = () => {
        setCurEditIndex(-1)
        setModelOpen(false)
        setNewItem('')
        setIsAddNewItem(false)
    }
    const onItemClick = (index) => {
        setCurEditIndex(index)
        setNewItem(list[index])
        setModelOpen(true)
    }
    const deleteItem = (index)=>{
        const _list = list.slice();
        _list.splice(index,1);
        setList(_list)
        localStorage.setItem('list',JSON.stringify(_list))
    }

    return <>

        <Modal centered keyboard okText="确认"  width={300} cancelText="取消" title="代理配置"  open={modalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h4>输入要代理的地址:</h4>
            <Input placeholder='支持通配符，如*.xiaojukeji.com/*' value={newItem} onInput={(e) => setNewItem(e.target.value)} />
        </Modal>
        {list && <List
            style={{ 
                minHeight:40,
                overflow:'auto',
                width: 250, margin: 'auto' }}
            locale={{
                emptyText: "当前无白名单配置"
            }}
            dataSource={list}
            renderItem={(item, index) => (
                <List.Item className='list-item'>
                    <Button  type="link"  onClick={() => onItemClick(index)}> {item} </Button> <span>走代理 <Button onClick={()=>deleteItem(index)} shape='round' type='link' size='small'><CloseOutlined /></Button></span> 
                </List.Item>
            )}
        />
        }
        <Button size='small' onClick={() => {
            setModelOpen(true)
            setIsAddNewItem(true)
        }}><PlusOutlined /></Button>

    </>

}