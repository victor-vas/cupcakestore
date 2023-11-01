"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Size from "../components/Size";
import Para from "../components/Para";
import ImageUpload from "../components/ImageUpload";

type Props = {};

const Productform = (props: Props) => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    batter: "",
    filling: "",
    top: "",
    description: `<div>
        <p>
        Seu texto aqui...
        </p>
      </div>`,
    price: 0,
    images: "",
    userId: id,
  });

  const [Description, setDescription] = useState<string>("");
  const [info, updateinfo] = useState<any>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "price"
        ? parseInt(e.target.value)
        : parseInt(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleImageChange = () => {
    const stringimages = JSON.stringify(imageUrls);
    setFormData({
      ...formData,
      images: stringimages,
      description: Description,
      userId: id,
    });
  };

  useEffect(() => {
    console.log(formData.images);
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: Description,
      images: imageUrls.toString(),
      userId: id,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrls]);

  const postData = async () => {
    handleImageChange();
    try {
      const response = await axios.post("/api/addproduct", formData);
      router.push("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-5 max-w-[1280px] mx-auto mb-10">
      <div>
        <Navbar />
      </div>
      <h1 className="text-3xl font-semibold py-6">
        Adicionar produto na Cupcake Store
      </h1>
      <div className="text-black mt-4">
        <div>
          <label htmlFor="name" className="font-medium">
            Nome
          </label>
          <input
            type="text"
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mt-10">
          <label htmlFor="size" className="font-medium">
            Tamanho
          </label>
          <input
            type="text"
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
          <Size setFormData={setFormData} />
        </div>
        <div className="mt-10 grid md:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <label htmlFor="batter" className="font-medium">
              Massa
            </label>
            <input
              type="text"
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
              name="batter"
              value={formData.batter}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="filling" className="font-medium">
              Recheio
            </label>
            <input
              type="text"
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
              name="filling"
              value={formData.filling}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="top" className="font-medium">
              Cobertura
            </label>
            <input
              type="text"
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
              name="top"
              value={formData.top}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-10">
          <label htmlFor="price" className="font-medium">
            Preço
          </label>
          <input
            type="number"
            className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
            name="price"
            min={0}
            value={formData.price}
            onChange={handlePriceChange}
          />
        </div>
        <label htmlFor="" className="mt-10 inline-block font-medium">
          Descrição sobre o produto
        </label>
        <Para
          setDescription={setDescription}
          description={formData.description}
        />
        <label htmlFor="" className="mt-10 inline-block font-medium">
          Carregar Imagem
        </label>
        <ImageUpload
          info={info}
          updateInfo={updateinfo}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          handleImageChange={handleImageChange}
        />
        <button
          onClick={postData}
          className="text-white mt-10 border-[1px] bg-purple-500 rounded-lg px-5 p-2"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Productform;
