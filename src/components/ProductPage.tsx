import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}
const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error fetching", error);
          setLoading(false);
        });
    }
  }, []);
  if (loading) {
    return (
      <div className=" h-full w-full grid place-items-center text-3xl">
        loading...
      </div>
    );
  }
  if (!product) {
    return (
      <div className=" h-full w-full grid place-items-center text-3xl">
        loading...
      </div>
    );
  }
  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>
      <Suspense fallback={<div>Loading..</div>}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-1/2 h-auto mb-5"
        />
      </Suspense>
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
      <div className="flex">
        <p>Price: ${product.price}</p>
        <p className="ml-10">Rating: {product.rating}</p>
      </div>
    </div>
  );
};

export default ProductPage;
