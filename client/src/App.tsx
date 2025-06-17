
import { useState, useEffect, FC, Dispatch, SetStateAction } from 'react'
import logo from '../img/logo.png'
import Items from "./items"
import Search from "./search"
// import { format } from 'date-fns';
import { Tag as ReactTag } from 'react-tag-input';
import DarkModeToggle from './DarkModeToggle'

import './App.css'

/* define the type of items and tags, either using interface or type is fine */
export interface Item {
  item_name: string;
  item_name_toLowerCase: string;
  item_id: number;
  price: number;
  SupermercadoId: number;
}

const App: FC = () => {
  const getInitalDarkMode = () : boolean => {
    const saved = localStorage.getItem('theme') // Check localStorage for saved preference
    if (saved === 'dark') return true
    if (saved === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches // If not found, use system preference via media query, matches is a boolean property
  }

  const [isDark, setIsDark] = useState<boolean>(getInitalDarkMode)

  useEffect(() => {
    document.body.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])



  const [items, setItems] = useState<Item[]>([]);
  const [tags, setTags] = useState<ReactTag[]>([]);

    console.log('this is items', items);


  const getItems = async (): Promise<void> => {
    try {
      const response = await fetch('http://192.168.31.133:3000/itemTags', { // Other than localhost, this one is for mobile access
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // send tags as response body
        body: JSON.stringify(tags),
      });
      const data: Item[] = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // call getItems again when the tags changes
  useEffect(() => {
    getItems();
  }, [tags]);


  return (
    <>
    <div className='dashboard'>
      <div className='navbar'>
        <img src={logo} className='logo'></img>
        <DarkModeToggle
          isDark={isDark}
          toggleTheme={() => setIsDark(prev => !prev)}
        />
      </div>
      <div className='bodyBlock'>
        <div className='search'>
          <Search tags={tags} setTags={setTags} items={items} ></Search>
        </div>
        <div className='greenblock'>
          {items.length ?
          <div className='itemBlock' >
            {items.map((element) => (
              <Items itemsOO={element} itemsOg={items}  ></Items>
              ))}
          </div>
          :
          <div className='escriba'><p>Escriba el producto que está buscando en el buscador. Puede agregar tantos filtros desee.</p> <p>Para enviar presione la tecla "Enter" (o "Intro" si estás desde el celular) en su teclado</p><br/> <p>Ejemplo:</p>  <p>Primer filtro: "Cloro".</p><p>Segundo filtro: "Ajax"</p></div>
          }
        </div>
      </div>

    </div>
    </>
  )
}

export default App