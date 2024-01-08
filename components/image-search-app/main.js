import NavBar from "./navbar/NavBar";
import { ModeToggle } from "./navbar/toogle";
import ImagesCollection from "./search/imagesCollection";



export default function MainImageSearchApp() {
  return (
   <div className="flex flex-col items-center justify-center">
    <div className="self-end mr-10">
      <ModeToggle/>
    </div>
    <div className="text-center">
      <NavBar/>
    </div>
    <div className="text-center mt-10">
      <ImagesCollection />
    </div>
   </div>
  )
}
