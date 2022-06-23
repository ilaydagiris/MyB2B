import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Menubar from '../Components/Menubar'

function Order({ setRoute, user, order }) {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState({})

    useEffect(() => {
        let final = []
        let uniqueProducts = order.cart.filter(function ({ name }) {
            return !this.has(name) && this.add(name);
        }, new Set())
        console.log(uniqueProducts)
        let sum = 0;
        uniqueProducts.forEach((product) => {
            let qty = order.cart.filter(x => x.name === product.name).length
            let totalPrice = product.price * qty
            final.push({
                qty,
                totalPrice,
                ...product
            })
            sum = sum + totalPrice
        })
        setProducts(final)
        setTotal({
            items: order.cart.length,
            sum
        })
    }, [order])

    return (
        <div className="flex w-full h-full flex-col">
            <Menubar setRoute={setRoute} user={user} />
            <div className="container mx-auto flex flex-col mt-10">
                {products.map((product, index) =>
                    <div className="p-2 bg-gray-50 rounded-sm flex flex-row select-none border-b" key={index}>
                        <img src={product.image} className="h-24" alt="makine" />
                        <div className="flex flex-col">
                            <p className="font-bold text-lg text-gray-400 my-auto">{product.brand}</p>
                            <h1 className="font-bold text-xl text-gray-900 my-auto">{product.name}</h1>
                            <p className="font-bold text-md text-gray-600 my-auto">{product.price} TRY</p>
                        </div>
                        <p className="font-bold text-xl text-gray-900 m-auto">{product.qty} adet</p>
                        <p className="font-bold text-xl text-gray-600 my-auto">{product.totalPrice} TRY</p>
                    </div>
                )}
                <div className="flex flex-row mt-2">
                    <p className="font-bold text-xl text-gray-900 ml-auto my-auto">Toplam {total.items} adet ürün, {total.sum} TRY</p>
                </div>
                <button className="transition-colors ease-in-out bg-blue-600 hover:bg-blue-800 focus:ring-2 ring-blue-800 ring-offset-2 text-lg py-2 px-4 rounded-lg mt-4 text-white" onClick={() => { setRoute("seller-dashboard") }}>Geri Dön</button>
            </div>
        </div>
    )
}

Order.propTypes = {
    setRoute: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
}

export default Order
