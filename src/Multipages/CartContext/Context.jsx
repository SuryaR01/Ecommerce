
import { createContext , useEffect ,useState , useContext } from "react";


const Context =  createContext();
// local store fun 
export const Contentprovider = ({children}) => {

  const username = localStorage.getItem("username");

  const getStorage = (key) => {
    if(!username)return[]
    const stored = localStorage.getItem(`${username}_${key}`);
    return stored ? JSON.parse(stored) : [] ;
;  };

    const [cortitem , setCortitem ] = useState(() => getStorage("cart"))

// Add TO CART 
    useEffect(() =>{
        localStorage.setItem( `${username}_cart` , JSON.stringify(cortitem))
    },[cortitem, username])

    const Addtocart = ( product , Quantity = 1 ) => {
        const finditem  = cortitem.find((data) => data.id === product.id)

        if(finditem) {
            const updateitem = cortitem.map((item) => item.id === product.id ? {...item , Quantity : item.Quantity + Quantity} : item );
            setCortitem(updateitem)
        }else{
            setCortitem([...cortitem , {...product , Quantity}])
        }
    }

    // remove Product 
    const RemoveOrdercart = (productid) => {
        setCortitem(cortitem.filter((item) => item.id !== productid))
    }

    // incerament Quantity 
    const Incrementqty = (productid) => {
         setCortitem((prev) =>
            prev.map((item) =>
                item.id === productid ? { ...item , Quantity:item.Quantity + 1} : item
            )
        )  
    }

    // Decreament Quantity 
       const Decrementqty = (productid) => {
         setCortitem((prev) =>
            prev.map((item) =>
                item.id === productid ? { ...item , Quantity:Math.max(1,item.Quantity - 1)} : item
            )
        )  
    }

    // FAVERITE 
    const [favitem , setFavitem ] = useState(() =>getStorage("favorite"))

// Add TO CART 
    useEffect(() =>{
        localStorage.setItem(`${username}_favorite`, JSON.stringify(favitem))
    },[favitem , username])

    const addToFavorites = (product) => {
    if (!favitem.some((item) => item.id === product.id)) {
      setFavitem([...favitem, product]);
    }
  };

const removeFromFavorites = (productId) => {
    setFavitem(favitem.filter((item) => item.id !== productId));
   };

  

   return (
    <Context.Provider value={{ cortitem , Addtocart , setCortitem , RemoveOrdercart , Incrementqty , Decrementqty , favitem , addToFavorites , removeFromFavorites }}>{children}</Context.Provider>
   )
}

export const useStore = () => useContext(Context) 

