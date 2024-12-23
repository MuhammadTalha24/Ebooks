import React from 'react'
import Header from '../components/Header'
import Categories from '../components/Categories'
import TrendingBooks from '../components/TrendingBooks'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <Header />
            <TrendingBooks />
            <Categories />

        </>
    )
}

export default Home