import React from 'react'
import Wallet from "../assets/Images/Wallet.gif"
import './Homes.css';

const Home = () => {
    return (
        <>
            <div className='Old'>
                <div className='start'>
                    <img src={Wallet} alt="" />
                    <div>
                        <h1>Let's Get Started</h1>
                        <p>it is a long established fact that a be distracted by the readable a page when looking at its</p>
                    </div>
                </div>

                <div className='create'>
                    <button>Create account</button>
                    <button>Sign in to Continue</button>
                </div>
            </div>
        </>
    )
}

export default Home