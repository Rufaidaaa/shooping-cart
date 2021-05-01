import React, { Component } from 'react'
import image from '../assests/image.png'
import imagee from '../assests/image2.jpg'
import images from '../assests/image3.webp'
import imagees from '../assests/image4.jpg'
import imageess from '../assests/image5.jpg'
import imageees from '../assests/image6.jpg'

export const DataContext = React.createContext();


export class DataProvider extends Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": "Nike Shoes 01",
                 "src": image,
                "content": "lorem",
                "price": 23,
                "colors":["red","black","crimson","teal"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Nike Shoes 02",
                "src":imagee,
                "content": "lorem",
                "price": 19,
                "colors":["red","crimson","teal"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Nike Shoes 03",
                "src": images,
                "content": "lorem",
                "price": 50,
                "colors":["lightblue","white","crimson","teal"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Nike Shoes 04",
                "src": imagees,
                "content": "lorem",
                "price": 15,
                "colors":["orange","black","crimson","teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Nike Shoes 05",
                "src": imageees,
                "content": "lorem",
                "price": 10,
                "colors":["orange","black","crimson","teal"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Nike Shoes 06",
                "src": imageess,
                "content": "lorem",
                "price": 17,
                "colors":["orange","black","crimson","teal"],
                "count": 1
            }
        ],
        cart: [], 
        total: 0
    }
    addCart= (id) =>{
        const {products, cart} =this.state
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check) {
            const data = products.filter(product =>{
                return product._id===id
            })
            this.setState({cart: [...cart,...data]})
        }
        else{
            alert("The product has been added to the cart")
        }

      
    }

    reduce = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    }
    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    }

    remove =id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            
            this.setState({cart: cart});
            this.getTotal()
        }
    }

    getTotal = () =>{
        const{cart} = this.state
        const res = cart.reduce((prev, item) =>{
            return prev + (item.price * item.count)
        }, 0)
        this.setState({total: res})
    }

    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    }

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'))
        if(dataCart !== null){
            this.setState({ cart: dataCart})
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'))
        if(dataTotal !== null){
            this.setState({ total: dataTotal})
        }
    }
    render() {
        const {products, cart , total} =this.state
        const {addCart,reduce,increase,remove, getTotal}= this
        return (
            <DataContext.Provider value={{products, addCart, cart, reduce, increase,remove, total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


