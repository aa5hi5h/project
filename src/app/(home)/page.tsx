import Image from "next/image";
import { auth } from "../../../auth";

 const  Home = async() =>  {

  const authenticatedUser = await auth()

  console.log("AUTH::::",authenticatedUser)
  return (
    <div className="">
      hello this is from aashidh
    </div>
  );
}

export default Home