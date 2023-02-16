import React from 'react';
import Link from 'next/link';

// import {client} from '../lib/client';

// in react after this statement we will immediately
// will just create an use affect just right here(int the home component)
// but it is different in javascript

// we will use get server side props function

import { Product,FooterBanner, HeroBanner } from '../components';
import { client } from '../lib/client';



const Home = ({products,bannerData}) => (
    <div>
      <HeroBanner heroBanner = {bannerData.length & bannerData[0]} />
      {/* here we will create our hero banner component */}

      {/* lets first check in what form we are getting the data from sanity */}
      {/* {console.log(bannerData)} */}


      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      {/* we have created our banner now
      no we will create our products  */}
      <div className='products-container'>
        {products?.map((product) => <Product key = {product._id} product = {product} />)}
        {/* // we will need products argument that we will fetch from sanity 
        from which we will create our product component */}

      </div>


      {/* finally we will have a footer at the bottom */}

      <FooterBanner FooterBanner= {bannerData && bannerData[0]}/>

    </div>
);





export const getServerSideProps = async() => {
    const query = `*[_type =="product"]`;
    const products = await client.fetch(query);

    const bannerQuery = `*[_type =="banner"]`;
    const bannerData = await client.fetch(bannerQuery);

    return {
      props: {products,bannerData}
    }
}


export default Home;