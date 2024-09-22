import { Link } from "react-router-dom";
import classes from './Menu.module.scss';

export function Menu() {

    return (
        <nav className={classes.menu}>
            <Link to={'/'}>Home</Link>
            <Link to={'/shop'}>Shop</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/gallery'}>Gallery</Link>
        </nav>
    );
}