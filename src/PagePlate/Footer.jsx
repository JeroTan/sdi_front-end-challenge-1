//images
import toyotaLogo from "../images/toyotaLogo.png"

export default function(){
    return <>
    <footer className=" bg-gray-950 py-5 px-2 flex flex-col justify-center items-center">
        <div className=" relative w-24">
            <img src={toyotaLogo} />
        </div>
        <div className="mt-2">
            <small className="text-slate-400">&#169; All rights reserved (This is a drill!)</small>
        </div>
    </footer>
    </>
}