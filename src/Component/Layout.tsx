import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {

    return <>
        <header><NavBar /></header>
        <main><Outlet /></main>
        <footer></footer>
    </>

}