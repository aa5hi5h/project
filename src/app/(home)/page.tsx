import Image from "next/image";
import { auth } from "../../../auth";
import { getActiveProducts } from "@/lib/server-action";
import { ActiveProducts } from "./Active-products";

 const  Home = async() =>  {

  const authenticatedUser = await auth()
  const activeProducts = await getActiveProducts()

  console.log("AUTH::::",authenticatedUser)
  return (
    <div className="md:w-3/5 mx-auto py-10">
      <ActiveProducts 
      activateProduct={activeProducts}
      authenticatedUser={authenticatedUser} />
    </div>
  );
}

export default Home