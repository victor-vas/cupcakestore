"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Size from "../components/Size";
import Para from "../components/Para";
import ImageUpload from "../components/ImageUpload";

interface Props {
  id: number;
  name: string;
  description: string;
  batter: string;
  filling: string;
  top: string;
  size: string;
  price: number;
  images: string;
  userId: number;
}

const Edit = ({
  id,
  name,
  description,
  batter,
  filling,
  top,
  size,
  price,
  images,
  userId,
}: Props) => {
  const Id = userId;
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: id,
    name: name,
    description: description,
    batter: batter,
    filling: filling,
    top: top,
    size: size,
    price: price,
    images: images,
    userId: Id,
  });
  const [Description, setDescription] = useState<string>("");
  const [info, updateinfo] = useState<any>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (formData.images) {
      const imageUrlArray = formData.images.split(",");
      setImageUrls(imageUrlArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: Description,
      images: imageUrls.toString(),
      userId: id,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrls]);

  const updateData = async () => {
    handleImageChange();
    try {
      const response = await axios.patch("/api/updateproduct", formData);
      console.log(response.data);
      router.push("/");
      router.refresh();
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
        Adicionar seu produto na Cupcake Store
      </h1>
      <div className="text-black mt-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
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
          <div>
            <label htmlFor="size" className="font-medium">
              Size
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
          <div>
            <label htmlFor="price" className="font-medium">
              Price
            </label>
            <input
              type="number"
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
              name="price"
              value={formData.price}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <label htmlFor="" className="mt-10 inline-block font-medium">
          Descrição sobre o produto
        </label>
        <Para
          setDescription={setDescription}
          description={formData.description}
        />
        <label htmlFor="" className="mt-10 inline-block font-medium">
          Carregar Imagens
        </label>
        <ImageUpload
          info={info}
          updateInfo={updateinfo}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          handleImageChange={handleImageChange}
        />
        <button
          onClick={updateData}
          className="text-white mt-10 border-[1px] bg-purple-500 rounded-lg px-5 p-2"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Edit;
