import React, {useState, useEffect} from "react";

import './Nav.css';




    ;
function Nav() {
    const [show, handleShow] = useState(false);
     
    const transitionNavBar =() =>{
    if (window. scrolly > 100) {
     handleShow (true);
    }else {
     handleShow( false);
    }
};

 useEffect(() =>{
   window.addEventListenert("scroll", transitionNavBar);
    return () => window. renoveEventListenert("scroll", transitionNavBar);
 }, []);
 

    return(
        <div className={' nav ${ show && "nav__black"}'}>
            <div className="nav_contents">
                <img className="nav__logo"
                    scr="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                    alt="" />


                <img className="nav__avatar"
                    scr="https://www.freepnglogos.com/uploads/netflix-logo-app-png-16.png"
                    alt="" />
            </div>

        </div>
    );
}

export default Nav;

