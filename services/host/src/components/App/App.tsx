import { useState } from "react";
import { Outlet } from "react-router-dom";

import classes from './App.module.scss';
import Menu from "../Menu";

export function App() {
    const [counter, setCounter] = useState(0);

    return (
        <div className={classes.app}>
            <h1 className={classes.title}>Welcome to <span>my</span> app</h1>
            <h2>{counter}</h2>
            <button className={classes.button} onClick={() => setCounter(prev => ++prev)}>increase</button>
            <section>
                <Menu />
                <Outlet />
            </section>
        </div>
    )
}