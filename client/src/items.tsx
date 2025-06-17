import './items.css'
import logoExcelsiorGama from '../img/logo-excelsior-gama-nuevo.png'
import logoAutomercadoElPlazas from '../img/logo-automercado-el-plazas.png'
import logoCentralMadeirense from '../img/logo-central-madeirense.png'
import React from 'react';

/* define the type of Items */
interface Items {
  SupermercadoId: number;
  item_name: string;
  price: number;
}

/* define the ItemsProps interface to specify the type of props */
interface ItemsProps {
  itemsOO: Items;
  itemsOg?: Items[];
}

const Items: React.FC<ItemsProps> = ({ itemsOO }) => {
  const logoSelection = (): string => { /* the URL of files are presented as string type */
    //console.log('props', props);
  if (itemsOO.SupermercadoId === 1) {
    return logoAutomercadoElPlazas
  } else if (itemsOO.SupermercadoId === 2) {
    return logoExcelsiorGama
  } else {
    return logoCentralMadeirense
  }
}


return (
<>


  <div className='cuadradoItem'>
    <img src={logoSelection()} className='logoSupermercado'></img>
    <div className='nombreYprecio'>
    <div className='nombreItem'>{itemsOO.item_name}</div>
    <div className='itemPrice'>Bs. {itemsOO.price}</div>
    </div>
  </div>

</>
)

}

export default Items