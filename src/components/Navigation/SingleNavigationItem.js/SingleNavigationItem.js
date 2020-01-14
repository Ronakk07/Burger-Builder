import React from 'react';
import classes from './SingleNavigationItem.css';


const singleNavigationItem = (props) => (
    <li className={classes.SingleNavigationItem}>
        <a 
            className={props.active ? classes.active : null }
            href={props.link}>
            {props.children}
        </a>
    </li>
);

export default singleNavigationItem;