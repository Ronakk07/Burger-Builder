import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from '../SingleNavigationItem.js/SingleNavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active >Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;