import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Menubar from '../Components/Menubar'
import moment from 'moment'
import 'moment/locale/tr'
function Seller({ setRoute, user, order, setOrder, users }) {

    const [ordersList, setOrdersList] = useState([])

    useEffect(() => {
        let orders = JSON.parse(localStorage.getItem('orders'));
        if (!orders) {
            orders = []
        }

        setOrdersList(orders)
    }, [setOrdersList])

    const [searchQuery, setSearchQuery] = useState("");
    const [customersList, setCustomersList] = useState(users);

    useEffect(() => {

        setCustomersList(users.filter(x => x.role === "consumer").filter((x) => { return x.name.toLowerCase().trim().includes(searchQuery.trim().toLowerCase()) }).slice());

    }, [searchQuery, users])

    return (
        <div className="flex w-full h-full flex-col">
            <Menubar setRoute={setRoute} user={user} />
            <input type="text" className="w-96 mx-auto transition-colors ease-in-out my-5 bg-white border-2 border-gray-300 focus:border-blue-600 rounded-xl py-1 px-2 focus:outline-none" onKeyUp={(e) => { setSearchQuery(e.target.value) }} placeholder={"Müşteri arayın..."} />
            <h1 className="text-3xl my-10 mx-auto font-bold">Müşteriler</h1>
            <div className="container mx-auto">
                {customersList.map((customer, index) =>
                    <div className="p-2 bg-gray-50 rounded-sm flex flex-row select-none border-b" key={index}>
                        <div className="flex flex-col mr-auto">
                            <p className="font-bold text-lg text-gray-400 my-auto">{customer.email}</p>
                            <h1 className="font-bold text-xl text-gray-900 my-auto">{customer.name}</h1>
                        </div>
                    </div>
                )}
            </div>
            <h1 className="text-3xl mt-10 mx-auto font-bold">Siparişler</h1>
            <div className="container mx-auto flex flex-col mt-10">
                {ordersList.filter(x => { return customersList.map(({ email }) => email).includes(x.user.email) }).map((order, index) =>
                    <div className="p-2 bg-gray-50 rounded-sm flex flex-row select-none border-b cursor-pointer" onClick={() => { setOrder(order); setRoute("order") }} key={index}>
                        <div className="flex flex-col">
                            <p className="font-bold text-lg text-gray-400 my-auto">{order.user.email}</p>
                            <h1 className="font-bold text-xl text-gray-900 my-auto">{order.total.items} Ürün</h1>
                        </div>
                        <p className="font-bold text-xl text-gray-900 m-auto">{moment(order.date).locale('tr').fromNow()}</p>
                        <p className="font-bold text-xl text-gray-600 my-auto">{order.total.sum} TRY</p>
                    </div>
                )}
            </div>
        </div>
    )
}

Seller.propTypes = {
    setRoute: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    setOrder: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
}

export default Seller
