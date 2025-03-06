import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import PagePlate from "../PagePlate/PagePlate";
import { ApiGetAuthors, ApiGetNews, authorFallbackData, newsFallbackData, storageEndPoint } from "../Utilities/Api";
import { monthName } from "../../helpers/Math";
import Icon from "../Utilities/Icon";

export function MainPage(){
    return <>
    <PagePlate>
        <EntryPoint />
    </PagePlate>
    </>
}

const GlobalStateContext = createContext();

export function EntryPoint(){
    
    //GlobalState
    const gState = {
        view:{
            current: 0, //must start at 0
            max: 0, //fetch the data to reveal the max
            news: undefined, //When not yet loaded but when loaded it should be an array
            authors: undefined, //There should be a separate container for this one but since this is just a drill then this will suffice
        }
    };

    //GlobalCaster
    function gCast(state, action){
        const refState = structuredClone(state);

        if(action?.view){
            const view = refState.view;
            switch(action.view){
                case "next":
                    view.current = (view.current+1) % view.max;
                    break;
                case "prev":
                    view.current = ((view.current-1) < 0 ? view.max-1: (view.current-1)) % view.max;
                    break;
                case "updateMax":
                    view.max = action.val;
                    break;
                case "updatenews":
                    view.news = action.val;
                    view.max = action.val.length;
                    break;
                case "updateAuthors":
                    view.authors = action.val;
                    break;
            }
            refState.view = view;
        }
            

        return refState;
    }

    //Reducer
    const reducerData = useReducer(gCast, gState);


    return <>
        <GlobalStateContext.Provider value={reducerData} >
            <FetchData />
            <Container/>
        </GlobalStateContext.Provider>
    </>
}

function FetchData(){
    //Global
    const [gState, gCast] = useContext(GlobalStateContext);

    useEffect(()=>{
        ApiGetNews().s200(data=>{
            gCast({view:"updatenews", val:data});
        }).sOthers(x=>{
            gCast({view:"updatenews", val:newsFallbackData});
        })
        ApiGetAuthors().s200(data=>{
            gCast({view:"updateAuthors", val:data})
        }).sOthers(x=>{
            gCast({view:"updateAuthors", val:authorFallbackData});
        })
        
    }, []);
}


function Container(){
    //Global
    const [gState, gCast] = useContext(GlobalStateContext);
    const view = gState.view;
    
    return <div className=" flex justify-center px-2">
        <main className="my-5 rounded overflow-hidden" style={{flexBasis: "70rem"}}>
            {view.news == undefined ? <>
                <PlaceHolderNews />
            </>:<>
                <ViewNews data={view.news[view.current]} />
                <Pagination />
            </>}
        </main>
    </div>
}

function Pagination(props){
    //Global
    const [gState, gCast] = useContext(GlobalStateContext);

    return <>
        <nav className="w-full flex gap-1 my-4">
            <PaginationItem onClick={()=>gCast({view:"prev"})}><Icon name="prev" inClass="fill-slate-300" outClass="w-4 h-4" /></PaginationItem>
            <PaginationItem>1</PaginationItem>
            <PaginationItem>2</PaginationItem>
            <PaginationItem>...</PaginationItem>
            <PaginationItem>8</PaginationItem>
            <PaginationItem>9</PaginationItem>
            <PaginationItem>10</PaginationItem>
            <PaginationItem active="true">11</PaginationItem>
            <PaginationItem>12</PaginationItem>
            <PaginationItem>13</PaginationItem>
            <PaginationItem>14</PaginationItem>
            <PaginationItem>...</PaginationItem>
            <PaginationItem>56</PaginationItem>
            <PaginationItem>57</PaginationItem>
            <PaginationItem onClick={()=>gCast({view:"next"})} ><Icon name="next" inClass="fill-slate-300" outClass="w-4 h-4" /></PaginationItem>
        </nav>
    </>
}

function PaginationItem(props){
    const {children, onClick} = props;
    const active = props.active ?? false;
    return <>
        <div className={` rounded overflow-hidden md:w-10 sm:w-9 w-8 aspect-square cursor-pointer  hover:scale-105 flex justify-center items-center ${active?"bg-blue-500/50":"bg-gray-900/50"}`} onClick={onClick}>
            <div className=" font-semibold">{children}</div>
        </div>
    </>
}

function  ViewNews(props){
    //Global
    const [gState, gCast] = useContext(GlobalStateContext);
    //Structure
    const { author_id, title, body, image_url, created_at } = props.data;
    const dateData = new Date(created_at);
    const authorList = useMemo(()=>{
        return gState?.view?.authors;
    }, [gState.view.authors]);
    const author = useMemo(()=>{
        if(authorList === undefined)
            return false;
        
        const authorIndex  = authorList.findIndex(author=>author.id == author_id);
        if(authorIndex == -1)
            return false;
        return authorList[authorIndex].name;
    }, [authorList, author_id]);

    return <>
        <article className=" bg-gray-900/25">
             {/*Image and Date*/}
            <div className="relative w-full sm:aspect-video aspect-square over">
                <div className="absolute rounded w-full h-full overflow-hidden">
                    <img alt="News Image" className=" my-img" src={storageEndPoint+image_url} />
                </div>
                <div className=" absolute w-full h-full bg-gradient-to-t from-white/25 to-black/25 hover:opacity-100 opacity-50"></div>
                <div className=" absolute bottom-0 sm:left-16 left-8">
                    <div className="absolute translate-y-[-50%] sm:w-32 w-28 aspect-square rounded bg-blue-800 -skew-x-6 flex justify-end items-end">
                        <div className=" rounded border-transparent border-b-slate-300 m-1" style={{
                            borderStyle: "solid",
                            borderWidth: "0 0 15px 15px",
                            transform: "rotate(0deg)",
                        }}></div>
                    </div>
                    <div className="absolute translate-y-[-50%] sm:w-32 w-28 aspect-square flex justify-center items-center">
                        <div className="text-center">
                            <h3 className=" font-semibold tracking-tighter text-5xl">
                                {dateData.getDate()}
                            </h3>
                            <p className=" tracking-wider text-lg">
                                { monthName(dateData.getMonth()+1).toUpperCase() }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/*Navigation*/}
            <div className=" mt-[4.3rem] flex flex-wrap justify-end gap-2 sm:px-4 px-2">
                <button type="button" className="my-btn px-2 py-1 flex items-center gap-1" onClick={()=>gCast({view:"prev"})}> 
                    <Icon name="prev" inClass=" fill-gray-700" outClass=" w-6 h-6" />
                </button>
                <button type="button" className="my-btn px-2 py-1 flex items-center gap-1" onClick={()=>gCast({view:"next"})}> 
                    <Icon name="next" inClass=" fill-gray-700" outClass=" w-6 h-6" />
                </button>
                <button type="button" className="my-btn px-2 py-1 flex items-center gap-1"> 
                    <Icon name="share" inClass=" fill-gray-700" outClass=" w-6 h-6" />
                    <span>Share</span> 
                </button>
            </div>

            {/*Description*/}
            <div className="mt-5 sm:px-4 px-2">
                
                {author ? <>
                    <h6 className="text-blue-500 tracking-wide font-semibold">{author}</h6>
                </> : <>
                    <div className="w-36 h-4 rounded animate-pulse bg-gray-400"></div>
                </>}
                
                <h1 className=" text-2xl font-bold " dangerouslySetInnerHTML={{__html:title}}></h1>

                <p className="my-6" dangerouslySetInnerHTML={{ __html: body }}></p>

                <div>
                    <a aria-label="link to article" className=" underline text-blue-400 uppercase font-bold underline-offset-4 cursor-pointer hover:text-blue-600">
                        Read Article
                    </a>
                </div>
            </div>

            <div className=" py-5"></div>
        </article>
    </>
}

function  PlaceHolderNews(props){

    return <>
        <article className=" bg-gray-900/25">
             {/*Image and Date*/}
            <div className="relative w-full sm:aspect-video aspect-square over">
                <div className="rounded w-full h-full bg-gray-500 animate-pulse"></div>
            </div>
            
            {/*Navigation*/}
            <div className=" mt-[4.3rem] flex flex-wrap justify-end gap-2 sm:px-4 px-2">
                <button type="button" className="my-btn h-8 w-16 flex items-center gap-1 animate-pulse" > </button>
            </div>

            {/*Description*/}
            <div className="mt-5 sm:px-4 px-2">
                <div className="w-36 h-4 mb-2 rounded animate-pulse bg-gray-400"></div>
                
                <div className="w-full h-7 rounded animate-pulse bg-gray-400"></div>
  
                <div className=" my-6 flex flex-col gap-1">
                    <div className="w-3/4 h-5 animate-pulse bg-gray-400 rounded"> </div>
                    <div className="w-full h-5 animate-pulse bg-gray-400 rounded"> </div>
                    <div className="w-1/2 h-5 animate-pulse bg-gray-400 rounded"> </div>
                </div>
                
                <div className="w-36 h-4 rounded animate-pulse bg-gray-400"></div>
            </div>

            <div className=" py-5"></div>
        </article>
    </>
}