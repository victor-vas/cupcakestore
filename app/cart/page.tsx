import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "../components/Navbar";
import AllCartProduct from "../components/AllCartProduct";

type Props = {};

const Cart = async (props: Props) => {
  const session = await getServerSession(options);
  return (
    <>
      <div className="max-w-[1280px] mx-auto px-5">
        <Navbar />
        <hr className="mb-10" />
        <AllCartProduct userId={session?.user?.id} />
      </div>
    </>
  );
};

export default Cart;
