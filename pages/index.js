import React from 'react'
import {Product, FooterBanner, HeroBanner} from '../components'
import {client} from '../sanity/lib/client'
import {image} from '../sanity/lib/image'
const Home = ({products, bannerData}) => {
  return (
    <>
    <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
    <div className='products-heading'>
    <h1 className='text-2xl font-extrabold'>Best Selling Products</h1>
    <p>Speakers of many Variations passages</p>
    </div>
    <div className="products-container">
    {products?.map((product)=><Product key={product._id} product={product}/>)}
    </div>
    <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </div>
    </>
  )
}

export const getServerSideProps = async ()=> {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products, // Pass the fetched data as a prop to the Home component
      bannerData,
    },
  };
}


export default Home;