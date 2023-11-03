"use client";
import React, { useState } from "react";
import ReactStars from "react-rating-star-with-type";
import { FaRegCommentDots } from "react-icons/fa";
import { CiShoppingCart, CiCreditCard1 } from "react-icons/ci";
import { SlTag } from "react-icons/sl";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiCubeFocusThin } from "react-icons/pi";
import { AiTwotoneEdit } from "react-icons/ai";
import Size from "../components/Size";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AddCart from "../components/AddCart";

interface Props {
  id: number;
  name: string;
  size: string;
  batter: string;
  filling: string;
  top: string;
  price: number;
  description: string;
  images: string;
  userId: number;
  rating: number;
  numbercomments: number;
}

const Info: React.FC<Props> = ({
  name,
  description,
  id,
  price,
  size,
  userId,
  rating,
  numbercomments,
}) => {
  const sizes = size.split(",");
  const { data: session } = useSession();
  const currentUserId = session?.user.id;
  const [selectSizes, setSelectedSizes] = useState<string[]>([]);

  const handleSelectSize = (size: string) => {
    if (selectSizes.includes(size)) {
      setSelectedSizes((prevState: string[]) =>
        prevState.filter((item) => item !== size)
      );
    } else {
      setSelectedSizes((prevState: string[]) => [...prevState, size]);
    }
  };
  return (
    <div className="relative info">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <div className="flex items-center space-x-12 mt-4">
        <ReactStars value={rating} size={20} />
        <span className="flex items-start space-x-3">
          <FaRegCommentDots size={22} />
          <span className="opacity-70 text-sm">
            {numbercomments} comentários
          </span>
        </span>
      </div>
      <h3 className="font-medium mt-8 mb-3 text-[14px]">Selecionar Tamanho</h3>
      <ul className="flex space-x-5">
        {sizes.map((size, index) => (
          <li
            key={index}
            className={`p-1 px-2 border-[1px] rounded-lg cursor-pointer inline-block text-center
                    ${
                      selectSizes.includes(size)
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }
                `}
            onClick={() => handleSelectSize(size)}
          >
            {size}
          </li>
        ))}
      </ul>
      <div className="flex items-center mt-7 space-x-10">
        <AddCart productId={id} />
      </div>
      <hr className="w-9/12 mt-10" />

      <div className="grid grid-cols-2 gap-10 opacity-70 mt-5">
        <span className="text-sm fles items-center space-x-4">
          <span className="p-2 bg-gray-100 inline-block rounded-full">
            <CiCreditCard1 size={24} />
          </span>
          <p>Pagamento Seguro</p>
        </span>
        <span className="text-sm fles items-center space-x-4">
          <span className="p-2 bg-gray-100 inline-block rounded-full">
            <SlTag size={24} />
          </span>
          <p>Tamanho</p>
        </span>
        <span className="text-sm fles items-center space-x-4">
          <span className="p-2 bg-gray-100 inline-block rounded-full">
            <LiaShippingFastSolid size={24} />
          </span>
          <p>Entrega Grátis</p>
        </span>
        <span className="text-sm fles items-center space-x-4">
          <span className="p-2 bg-gray-100 inline-block rounded-full">
            <PiCubeFocusThin size={24} />
          </span>
          <p>Entrega Grátis e Retorno</p>
        </span>
      </div>
      {currentUserId === userId && (
        <Link href={`/edit/${id}`}>
          <span className="absolute top-0 right-0 p-2 bg-green-600 rounded-full text-white cursor-pointer">
            <AiTwotoneEdit size={24} />
          </span>
        </Link>
      )}
    </div>
  );
};

export default Info;
