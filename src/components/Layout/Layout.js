import React, { useState } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Aux>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
};

export default layout;