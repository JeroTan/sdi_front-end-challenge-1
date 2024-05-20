//images
import Icon from "../Utilities/Icon"
import toyotaLogo from "../images/toyotaLogo.png"


export default function(){
    return <>
    <header className="py-3 sm:px-5 px-2 bg-gray-950 flex flex-wrap items-center gap-4">
        <div className=" relative w-8 cursor-pointer hover:scale-110">
            <img className=" my-img" src={toyotaLogo} />
        </div>
        <NavLink name="Home" />
        <NavLink name="About" />
        <NavLink name="Showcase" />
        <NavLink name="Join" />
        <Icon name="hamburgerMenu" inClass="fill-slate-300" outClass=" ml-auto w-7 h-7 sm:hidden block" />
    </header>
    </>
}

function NavLink({name}){
    return <nav className=" sm:block hidden" aria-label={`Go to ${name}`}>
        <a className=" tracking-tight text-lg hover:border-b-2 hover:border-blue-600 font-semibold cursor-pointer" href="#">{name} </a>
    </nav>
}