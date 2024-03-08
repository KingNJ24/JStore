import React, {useState} from "react";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const {incQty, decQty, qty, onAdd} = useStateContext();
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlForImage(image && image[index])} className="product-detail-image" />
          </div>
          <div className='small-images-container'>
        {image?.map((item, i) =>(
          <img 
            key= {i}
            src= {urlForImage(item)}
            className={i === index ? 'small-image selected-image': 'small-image'}
            onMouseEnter={()=>{
              setIndex(i)
            }}
          />
        ))}
        </div>
        </div>

        <div className="product-detail-desc">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="reviews">
            <div className="flex">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart hover:mr-2" onClick={()=> onAdd(product, qty)}>
              Add to Cart
            </button>
            <button type="button" className="buy-now hover:ml-2" onClick="">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// export const getStaticPaths = async ()=>{
//   const query = `*[_type == "product"]{
//     slug{
//       current
//     }
//   }
//   `
//   const products = await client.fetch(query)

//   const paths = products.map((product)=>({
//     params: {
//       slug: product.slug.current
//     }
//   }))

//   return {
//     paths,
//     fallback: 'blocking'
//   }
// }

export const getServerSideProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: {
      products,
      product,
    },
  };
};

export default ProductDetails;
