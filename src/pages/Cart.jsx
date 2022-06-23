import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Menubar from '../Components/Menubar'
import emailjs from '@emailjs/browser';

function Cart({ setRoute, user, cart, setCart }) {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState({})
    const productsRef = useRef()

    useEffect(() => {
        let final = []
        let uniqueProducts = cart.filter(function ({ name }) {
            return !this.has(name) && this.add(name);
        }, new Set())
        let sum = 0;
        uniqueProducts.forEach((product) => {
            let qty = cart.filter(x => x.name === product.name).length
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
            items: cart.length,
            sum
        })
    }, [cart])

    function order() {

        let orderData = {
            cart,
            total,
            user,
            date: new Date()
        }

        let orders = JSON.parse(localStorage.getItem('orders'));
        if (!orders) {
            orders = []
        }

        orders.push(orderData)

        localStorage.setItem('orders', JSON.stringify(orders));

        setCart([])

        let email = `
        <table>
            <tr>
                <th style='text-align: left;'>Ürün</th>
                <th style='text-align: left;'>Adet</th>
                <th style='text-align: left;'>Toplam Fiyat</th>
            </tr>
        `

        products.forEach((product) => {
            email = email + `
                <tr>
                    <td style='text-align: left;'>${product.brand} - ${product.name}</td>
                    <td style='text-align: left;'>${product.qty} adet</td>
                    <td style='text-align: left;'>${product.totalPrice}</td>
                </tr>
            `
        })
        email = email + `
            </table>
            <p>Toplam ${total.items} adet ürün, ${total.sum} TRY</p>
        `

        emailjs.send('service_38v6u6r', 'template_dnn42ih', {
            consumer_email: user.email,
            order: email
        }, 'jdbN3E3D8R1JQynSW')
            .then((result) => {
                console.log("Email sent");
            }, (error) => {
                alert("E-posta gönderilemedi. Hata: " + error.text);
            });

        setRoute("consumer-dashboard")

    }

    function setQuantity(product, newQty) {
        let cartC = cart.filter(x => x.name !== product.name)
        if (newQty === undefined || newQty === "") {
            return
        }
        for (let i = 0; i < newQty; i++) {
            cartC.push({
                name: product.name,
                brand: product.type,
                type: product.type,
                price: product.price,
                image: product.image
            })
        }
        setCart(cartC.slice())
    }

    return (
        <div className="flex w-full h-full flex-col">
            <Menubar setRoute={setRoute} user={user} />
            <div className="container mx-auto flex flex-col mt-10">
                <div className="flex flex-col w-full" ref={productsRef}>
                    {products.map((product, index) =>
                        <div className="p-2 bg-gray-50 rounded-sm flex flex-row select-none border-b" key={index}>
                            <img src={product.image} className="h-24 hide-in-email" alt="makine" />
                            <div className="flex flex-col">
                                <p className="font-bold text-lg text-gray-400 my-auto">{product.brand}</p>
                                <h1 className="font-bold text-xl text-gray-900 my-auto">{product.name}</h1>
                                <p className="font-bold text-md text-gray-600 my-auto">{product.price} TRY</p>
                            </div>
                            <div className="m-auto hide-in-email flex flex-row">
                                <input placeholder="Adet" type="number" className="border-2 border-gray-200 focus:outline-none px-1 focus:border-blue-600 w-16" defaultValue={product.qty} onChange={(e) => { setQuantity(product, e.target.value) }} />
                                <p className="font-bold text-xl text-gray-900 ml-2">adet</p>
                                <button className="text-white bg-red-600 focus:outline-none px-1 focus:border-blue-600 w-16 ml-2" onClick={() => { setQuantity(product, 0) }}>Sil</button>
                            </div>
                            <p className="font-bold text-xl text-gray-900 m-auto hidden">{product.qty} adet</p>
                            <p className="font-bold text-xl text-gray-600 my-auto">{product.totalPrice} TRY</p>
                        </div>
                    )}
                    <div className="flex flex-row mt-2">
                        <p className="font-bold text-xl text-gray-900 ml-auto my-auto">Toplam {total.items} adet ürün, {total.sum} TRY</p>
                    </div>
                </div>
                <button className="transition-colors ease-in-out bg-blue-600 hover:bg-blue-800 focus:ring-2 ring-blue-800 ring-offset-2 text-lg py-2 px-4 rounded-lg mt-4 text-white" onClick={order}>Siparişi Tamamla</button>
                <button className="transition-colors ease-in-out bg-blue-600 hover:bg-blue-800 focus:ring-2 ring-blue-800 ring-offset-2 text-lg py-2 px-4 rounded-lg mt-4 text-white" onClick={() => { setRoute("consumer-dashboard") }}>Geri Dön</button>
                <button className="transition-colors ease-in-out bg-red-600 hover:bg-red-800 focus:ring-2 ring-red-800 ring-offset-2 text-lg py-2 px-4 rounded-lg mt-4 text-white" onClick={() => { setCart([]) }}>Sepeti Boşalt</button>
            </div>
        </div>
    )
}

Cart.propTypes = {
    setRoute: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired
}

export default Cart
