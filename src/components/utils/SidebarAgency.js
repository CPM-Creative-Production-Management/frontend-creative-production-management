import React from "react";
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {Link} from 'react-router-dom';
import {RxDashboard} from "react-icons/rx";
import {BsArchive, BsPersonAdd, BsPersonWorkspace, BsCashStack} from "react-icons/bs";

import {LuCalculator} from "react-icons/lu";
import {AiOutlineInfoCircle, AiOutlineSearch} from "react-icons/ai";
import {HiOutlineMail} from "react-icons/hi";
import {Divider} from "semantic-ui-react";
import {RiTeamLine} from "react-icons/ri";
import {SiAntdesign} from "react-icons/si";
import {BiGitPullRequest} from "react-icons/bi";
import {mobile} from "../../App";


export const SidebarAgency = () => {

    return (
        <div style={{display: 'flex', position:"fixed", bottom:'0px', height: '100vh'}}>

            <Sidebar collapsed={mobile}>
                <Menu
                    menuItemStyles={{
                        button: {
                            // the active class will be added automatically by react router
                            // so we can use it to style the active menu item
                            [`&.active`]: {
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                        },
                    }}

                >
                    <br/>

                    <MenuItem component={<Link to="/"/>} icon={<SiAntdesign/>} disabled> CommuniCreate </MenuItem>
                    <MenuItem component={<Link to="/search"/>} icon={<AiOutlineSearch/>}> Search </MenuItem>
                    <MenuItem component={<Link to="/"/>} icon={<RxDashboard/>}> Dashboard </MenuItem>

                    <MenuItem component={<Link to="/requests"/>} icon={<BiGitPullRequest/>}> My Requests </MenuItem>

                    <SubMenu label="Employees" icon={<BsPersonWorkspace/>}>
                        <MenuItem icon={<RiTeamLine/>} component={<Link to="/my-employees"/>}> All Employees </MenuItem>
                        <MenuItem icon={<BsPersonAdd/>} component={<Link to="/add-employee"/>}> Add Employee </MenuItem>
                    </SubMenu>
                    <MenuItem component={<Link to="/archive"/>} icon={<BsArchive/>}> Archive </MenuItem>
                    <MenuItem component={<Link to="/estimations"/>} icon={<LuCalculator/>}>Ongoing Projects </MenuItem>
                    <MenuItem component={<Link to="/dues"/>} icon={<BsCashStack/>}> Dues </MenuItem>

                    <Divider/>

                    <MenuItem icon={<AiOutlineInfoCircle/>}> About Us </MenuItem>
                    <MenuItem icon={<HiOutlineMail/>}> Contact Us </MenuItem>


                </Menu>
            </Sidebar>

        </div>
    );

}