import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Menubar from '../Components/Menubar'

const products = [
    {
        brand: "BEKO",
        name: "Çamaşır Makinesi 429IVM",
        price: 1500,
        image: "/makine.webp",
        type: "Çamaşır Makinesi",
    },
    {
        brand: "BEKO",
        name: "Çamaşır Makinesi 1KNV93",
        price: 1750,
        image: "/makine.webp",
        type: "Çamaşır Makinesi",
    },
    {
        brand: "BEKO",
        name: "Çamaşır Makinesi HK2N45",
        price: 3000,
        image: "/makine.webp",
        type: "Çamaşır Makinesi",
    },
    {
        brand: "ARÇELİK",
        name: "Çamaşır Makinesi MKLMVT",
        price: 1350,
        image: "/makine.webp",
        type: "Çamaşır Makinesi",
    },
    {
        brand: "ARÇELİK",
        name: "Çamaşır Makinesi MTDEWI",
        price: 2240,
        image: "/makine.webp",
        type: "Çamaşır Makinesi",
    },
    {
        brand: "ARÇELİK",
        name: "Çamaşır Makinesi VSLWK3",
        price: 2100,
        image: "/makine.webp",
        type: "Çamaşır Makinesi",
    },
    {
        brand: "BEKO",
        name: "Ütü 429IVM",
        price: 1500,
        image: "/utu.webp",
        type: "Ütü",
    },
    {
        brand: "BEKO",
        name: "Ütü 1KNV93",
        price: 1750,
        image: "/utu.webp",
        type: "Ütü",
    },
    {
        brand: "BEKO",
        name: "Ütü HK2N45",
        price: 3000,
        image: "/utu.webp",
        type: "Ütü",
    },
    {
        brand: "ARÇELİK",
        name: "Ütü MKLMVT",
        price: 1350,
        image: "/utu.webp",
        type: "Ütü",
    },
    {
        brand: "ARÇELİK",
        name: "Ütü MTDEWI",
        price: 2240,
        image: "/utu.webp",
        type: "Ütü",
    },
    {
        brand: "ARÇELİK",
        name: "Ütü VSLWK3",
        price: 2100,
        image: "/utu.webp",
        type: "Ütü",
    },
    {
        brand: "BEKO",
        name: "Fırın 429IVM",
        price: 1500,
        image: "/firin.webp",
        type: "Fırın",
    },
    {
        brand: "BEKO",
        name: "Fırın 1KNV93",
        price: 1750,
        image: "/firin.webp",
        type: "Fırın",
    },
    {
        brand: "BEKO",
        name: "Fırın HK2N45",
        price: 3000,
        image: "/firin.webp",
        type: "Fırın",
    },
    {
        brand: "ARÇELİK",
        name: "Fırın MKLMVT",
        price: 1350,
        image: "/firin.webp",
        type: "Fırın",
    },
    {
        brand: "ARÇELİK",
        name: "Fırın MTDEWI",
        price: 2240,
        image: "/firin.webp",
        type: "Fırın",
    },
    {
        brand: "ARÇELİK",
        name: "Fırın VSLWK3",
        price: 2100,
        image: "/firin.webp",
        type: "Fırın",
    }
]

function Consumer({ setRoute, user, cart, setCart }) {
    
    function addOrRemove(array, item) {
        const exists = array.includes(item)

        if (exists) {
            return array.filter((c) => { return c !== item }).slice()
        } else {
            const result = array
            result.push(item)
            return result.slice()
        }
    }

    const [selectedBrands, setSelectedBrands] = useState(["BEKO", "ARÇELİK"]);
    const [selectedTypes, setSelectedTypes] = useState(["Ütü", "Çamaşır Makinesi", "Fırın"]);
    const [productsList, setProductsList] = useState(products);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    function addToCart(item, qty) {
        if (qty === undefined) {
            qty = 1
        }
        let cartC = cart
        for (let i = 0; i < qty; i++) {
            cartC.push(item)
        }
        setCart(cartC.slice())
    }

    const [qtys, setQtys] = useState({})

    useEffect(() => {

        setProductsList(products.filter((x) => { return selectedBrands.includes(x.brand) }).slice());
        setProductsList(productsList => productsList.filter((x) => { return selectedTypes.includes(x.type) }).slice());

        if(minPrice !== ""){
            setProductsList(productsList => productsList.filter(x => x.price >= minPrice).slice())
        }

        if(maxPrice !== ""){
            setProductsList(productsList => productsList.filter(x => x.price <= maxPrice).slice())
        }

        if(searchQuery !== ""){
            setProductsList(productsList => productsList.filter(x => { return x.name.trim().toLowerCase().includes(searchQuery.toLowerCase().trim()) }).slice())
        }

    }, [selectedBrands, selectedTypes, minPrice, maxPrice, searchQuery])

    return (
        <div className="flex w-full h-full flex-col">
            <Menubar setRoute={setRoute} user={user} />
            <div className="flex flex-row container mx-auto mt-4">
                <div className="w-1/4 flex flex-col">
                <p className="text-lg font-semibold">Marka</p>
                    <div className="flex flex-row">
                        <input type="checkbox" id="beko" className="my-auto" defaultChecked={true} onChange={() => { setSelectedBrands(addOrRemove(selectedBrands, "BEKO")) }} />
                        <label htmlFor="beko" className="ml-2 my-auto">BEKO</label>
                    </div>
                    <div className="flex flex-row">
                        <input type="checkbox" id="arcelik" className="my-auto" defaultChecked={true} onChange={() => { setSelectedBrands(addOrRemove(selectedBrands, "ARÇELİK")) }} />
                        <label htmlFor="arcelik" className="ml-2 my-auto">ARÇELİK</label>
                    </div>
                    <p className="text-lg font-semibold">Tür</p>
                    <div className="flex flex-row">
                        <input type="checkbox" id="utu" className="my-auto" defaultChecked={true} onChange={() => { setSelectedTypes(addOrRemove(selectedTypes, "Ütü")) }} />
                        <label htmlFor="utu" className="ml-2 my-auto">Ütü</label>
                    </div>
                    <div className="flex flex-row">
                        <input type="checkbox" id="firin" className="my-auto" defaultChecked={true} onChange={() => { setSelectedTypes(addOrRemove(selectedTypes, "Fırın")) }} />
                        <label htmlFor="firin" className="ml-2 my-auto">Fırın</label>
                    </div>
                    <div className="flex flex-row">
                        <input type="checkbox" id="camasir-makinesi" className="my-auto" defaultChecked={true} onChange={() => { setSelectedTypes(addOrRemove(selectedTypes, "Çamaşır Makinesi")) }} />
                        <label htmlFor="camasir-makinesi" className="ml-2 my-auto">Çamaşır Makinesi</label>
                    </div>
                    <p className="text-lg font-semibold">Fiyat</p>
                    <div className="flex flex-row">
                        <input placeholder="Min" type="number" className="border-2 border-gray-200 focus:outline-none px-1 focus:border-blue-600 w-16" onKeyUp={(e) => { setMinPrice(e.target.value) }} />
                        <span>-</span>
                        <input placeholder="Max" type="number" className="border-2 border-gray-200 focus:outline-none px-1 focus:border-blue-600 w-16" onKeyUp={(e) => { setMaxPrice(e.target.value) }} />
                    </div>
                </div>
                <div className="w-3/4 flex flex-col">
                    <input type="text" className="border-2 border-gray-300 rounded-xl py-1 px-2 focus:outline-none focus:border-blue-600 w-full my-5 bg-white" placeholder="Ürün arayın..." onKeyUp={(e) => { setSearchQuery(e.target.value) }} />
                    <div className="grid grid-cols-3">
                        {productsList.map((product, index) =>
                            <div className="w-64 p-2 bg-gray-50 rounded-sm flex flex-col select-none mt-5" key={index}>
                                <img src={product.image} className="w-64" alt="makine" />
                                <p className="font-bold text-lg text-gray-400">{product.brand}</p>
                                <h1 className="font-bold text-xl text-gray-900">{product.name}</h1>
                                <p className="font-bold text-md text-gray-600">{product.price} TRY</p>
                                <div className="flex flex-row">
                                    <input onChange={(e) => { let qtysc = qtys; qtysc[product.name] = e.target.value; setQtys(qtysc); }} placeholder="Adet" type="number" defaultValue={1} className="border-2 border-gray-200 focus:outline-none px-1 focus:border-blue-600 w-16" />
                                    <button className="bg-gray-200 px-1 focus:bg-blue-600 focus:text-white ml-auto border-2 border-gray-200 focus:border-blue-900" onClick={() => { addToCart(product, qtys[product.name]) }}>Sepete Ekle</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="fixed w-64 bottom-20 right-20 flex flex-col rounded-lg bg-gray-800 text-white px-4 py-2">
                <p className="text-xl font-bold">{cart.length} Ürün Sepette</p>
                <button className="transition-colors ease-in-out bg-blue-600 hover:bg-blue-800 focus:ring-2 ring-blue-800 ring-offset-2 text-lg py-2 px-4 rounded-lg mt-4 text-white" onClick={() => { setRoute("cart") }}>Siparişi Tamamla</button>
            </div>
        </div>
    )
}

Consumer.propTypes = {
    setRoute: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired
}

export default Consumer
