import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import routes from './route';
import {ipcRenderer} from 'electron'

function App() {
  const openRender = ()=>{
    ipcRenderer.send('openRender',{
      width: 400,
      height: 400
    })
  }
  return (
    <BrowserRouter >

      <button onClick={openRender}>打开footer</button>
      <div className='app'>
        <Link to='/home'>Home</Link>
        <Link to='/menu'>Menu</Link>
        <Routes>
          {
            routes.map((item, key) => {
              return (
                <Route key={key} path={item.path} element={<item.component />} />
              )
            })
          }
        </Routes>
      </div>


    </BrowserRouter>
  );
}

export default App;
