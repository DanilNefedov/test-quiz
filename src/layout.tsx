import { NavLink, Outlet } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';



export function Layout() {
    
    return (
        <div className="container mx-auto py-5 mainContainer">
            <header className="flex justify-around pb-5">
                <NavLink to={'/'} className='border-b border-solid border-transparent hover:border-black '>Home</NavLink>
                <NavLink  to={`/new-quiz`} className='border-b border-solid border-transparent hover:border-black'>New Quiz</NavLink>
            </header>
            <Outlet></Outlet>
        </div>
        
    )
}