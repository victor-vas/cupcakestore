/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Link from "next/link";
import Filter from "./Filter";

type Props = {};

const Page = (props: Props) => {
  const [selectedSize, setSelectedSize] = useState<string[]>([""]);
  const [price, setPrice] = useState({
    min: 0,
    max: 10,
  });

  const [response, setResponse] = useState<any[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        console.log(selectedSize);
        await axios
          .get("/api/filterproduct", {
            params: {
              size: selectedSize,
              price: {
                min: price.min,
                max: price.max,
              },
            },
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("response", response.data);
            setResponse(response.data);
          });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchdata();
  }, [selectedSize, price]);

  return (
    <div className="px-5 max-w-[1280px] mx-auto">
      <div>
        <Navbar />
      </div>
      <hr />
      <div className="flex">
        <div>
          <Filter
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            price={price}
            setPrice={setPrice}
          />
        </div>
        <div className="px-10">
          <h1 className="py-3 text-2xl font-medium">Cupcakes Filtrados</h1>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12 mt-5">
            {response.map((product: any) => (
              <div key={product.id}>
                <Link href={`/dashboard/${product.id}`}>
                  <div className="relative rounded-lg">
                    <img
                      src={product.images.split(",")[0]}
                      className="w-[250px] h-[300px] object-cover object-top rounded-lg"
                      alt=""
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <h1 className="text-[14px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden">
                        {product.name}
                      </h1>
                    </div>
                    <span className="px-2 font-medium bg-gray-100 rounded-lg">
                      R${product.price}.00
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
