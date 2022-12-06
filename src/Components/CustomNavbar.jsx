import React, { useEffect, useState } from 'react'
import { isLoggedIn,getCurrentUserDetail,doLogout } from '../Auth/indix';

import { Navbar, 
    NavbarBrand, NavbarToggler,
    Collapse, Nav, 
    NavItem, NavLink,
    UncontrolledDropdown,
    DropdownToggle, DropdownMenu,
    DropdownItem,
    NavbarText } from "reactstrap";


import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { useContext } from 'react'

import userContext from '../Context/userContext';




const CustomNavbar=()=> {

    const userContextData = useContext(userContext)

    // const userContextData = userContext(userContext)

    let  navigate = useNavigate();


    const[isOpen,setIsOpen]=useState(false)

    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        

        setLogin(isLoggedIn())
        setUser(getCurrentUserDetail())

    }, [login])


    const logout = () => {
        doLogout(() => {
            //logged out
            setLogin(false)
            userContextData.setUser({
                data: null,
                login: false
            })

            navigate("/")
        })
    }










  return (
    
        <div>
            <Navbar
             color="success"
                dark
                expand="md"
                fixed=""
                className="px-5">
            
            <NavbarBrand >
                    StoryBoard
            </NavbarBrand>

            <NavbarToggler onClick={()=>setIsOpen(!isOpen)}/>

            <Collapse isOpen={isOpen} navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >

                        <NavItem>
                            <NavLink tag={ReactLink} to="/" >
                                New Feed
                            </NavLink>
                        </NavItem>
                       
                    </Nav>
                    
                    <Nav navbar>

                    {
                            login && (

                                <>


                                    <NavItem>
                                    <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`} >
                                            Profile Info
                                        </NavLink>
                                    </NavItem>



                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/dashboard" >
                                            {user.email}
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink onClick={logout} >
                                            Logout
                                        </NavLink>
                                    </NavItem>
                                </>



                            )
                        }

                        {
                            !login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/login" >
                                            Login
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/signup" >
                                            Signup
                                        </NavLink>
                                    </NavItem>


                                </>
                            )
                        }









                    </Nav>





                </Collapse>




            </Navbar>
        </div>  
  )
}

export default CustomNavbar