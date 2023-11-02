"use client";
import React, { useState } from "react";
import { BsSliders2Vertical, BsChevronUp } from "react-icons/bs";

type Props = {
  selectedSize: string[];
  setSelectedSize: React.Dispatch<React.SetStateAction<string[]>>;
  price: { min: number; max: number };
  setPrice: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
};

const Filter = (props: Props) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handelMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "min" ? parseInt(e.target.value) : e.target.value;
    props.setPrice({
      ...props.price,
      [e.target.name]: value,
    });
  };

  const handlMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "max" ? parseInt(e.target.value) : e.target.value;
    props.setPrice({
      ...props.price,
      [e.target.name]: value,
    });
  };

  const togglesize = (size: string) => {
    props.setSelectedSize((prevSize) =>
      prevSize.includes(size)
        ? prevSize.filter((c) => c !== size)
        : [...prevSize, size]
    );
  };

  return (
    <div className="relative">
      <div
        className={`md:w-[250px] border-l-[0.5px] border-r-[0.5px] ${
          showFilter ? "max-md:w-[250px]" : "w-0 max-md:invisible"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px]">
          <h1 className="text-neutral-800">Filtros</h1>
          <BsSliders2Vertical size={20} className="text-neutral-600" />
        </div>
        <div className="border-b-[0.5px] pb-10">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-neutral-800">Preços</h1>
            <BsChevronUp size={18} className="text-neutral-600" />
          </div>
          <div className="grid grid-cols-2 gap-5 px-5 overflow-hidden">
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="" className="text-[15px] opacity-75">
                Min
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1">$</span>
                <input
                  className="w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
                  type="number"
                  name="min"
                  min={0}
                  onChange={handelMinChange}
                  value={props.price.min}
                  id=""
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="" className="text-[15px] opacity-75">
                Max
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1">R$</span>
                <input
                  className="w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
                  type="number"
                  name="max"
                  onChange={handlMaxChange}
                  value={props.price.max}
                  id=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sizes">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-neutral-800">Tamanhos</h1>
          </div>
          <ul className="grid grid-cols-4 px-5 gap-5">
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                props.selectedSize.includes("P")
                  ? "bg-neutral-900 text-white"
                  : ""
              }`}
              onClick={() => togglesize("P")}
            >
              P
            </li>
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                props.selectedSize.includes("M")
                  ? "bg-neutral-900 text-white"
                  : ""
              }`}
              onClick={() => togglesize("M")}
            >
              M
            </li>
            <li
              className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${
                props.selectedSize.includes("G")
                  ? "bg-neutral-900 text-white"
                  : ""
              }`}
              onClick={() => togglesize("G")}
            >
              G
            </li>
          </ul>
        </div>
      </div>
      <div
        onClick={() => setShowFilter(!showFilter)}
        className="absolute md:hidden top-[20px] right-[-42px] rotate-90 bg-gray-100 px-2 rounded-t-sm cursor-pointer"
      >
        Filtros
      </div>
    </div>
  );
};

export default Filter;
