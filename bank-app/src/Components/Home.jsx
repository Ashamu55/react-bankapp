import React from 'react'
import Wallet from "../assets/Images/Wallet.gif"
import './Homes.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className='Old'>
                <div className='start'>
                    <img src={Wallet} alt="" />
                    <div className='Get'>
                        <h1>Let's Get Started</h1>
                        <p>it is a long established fact that a be <br /> distracted by the readable a page when looking at its</p>
                    </div>
                </div>

                <div className='account'>
                    <button  className='create'><Link to="/signup">Create account</Link></button><br />
                    <button className='sign'><Link to="/sigin">Sign in to Continue</Link></button>
                </div>
            </div>
        </>
    )
}

export default Home