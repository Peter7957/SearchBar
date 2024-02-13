'use client';

import MyButton from "./Components/btn"
import ListItems from "./Components/list"
import Profile from "./Components/profile"
import { useState } from "react";
import Board from "./Components/tic-tac-toe";
import SearchBar from "./Components/searchbar";

export default function Home(){
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <div>
            <SearchBar />
            <h1>Hello World!!</h1><br />
            <MyButton count={count} onClick={handleClick}/><br />
            <MyButton count={count} onClick={handleClick}/>
            <Profile />
            <ListItems />
            <Board />
        </div>
    )
}