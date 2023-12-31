import React from "react";
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {Link} from 'react-router-dom';
import {RxDashboard} from "react-icons/rx";
import {BsArchive, BsPersonAdd, BsPersonWorkspace, BsFillFileRuledFill, BsFillPatchPlusFill, BsCardList, BsFillBuildingFill, BsBuildingFill, BsCashStack, BsProjectorFill} from "react-icons/bs";

import {LuCalculator} from "react-icons/lu";
import {AiOutlineCloseCircle, AiOutlineFolderAdd, AiOutlineInfoCircle, AiOutlinePlayCircle} from "react-icons/ai";
import {HiOutlineMail} from "react-icons/hi";
import {Divider} from "semantic-ui-react";
import {RiTeamLine} from "react-icons/ri";
import {SiAntdesign} from "react-icons/si";
import Navbar from "react-bootstrap/Navbar";
import {useDispatch} from "react-redux";
import { updateRequest, resetRequest, resetRequests } from "../../actions";
import { mobile } from "../../App";
import { GrAddCircle } from "react-icons/gr";
import { IoIosCloudDone } from "react-icons/io";



export const SidebarClient = () => {

    const [collapsed, setCollapsed] = React.useState(false);
    const dispatch = useDispatch()

    return (
        <div style={{display: 'flex', position:"fixed", bottom:'0px', height: '100vh'}}>
            <Sidebar collapsed={mobile}>
                <Menu
                    menuItemStyles={{
                        button: {
                            [`&.active`]: {
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                        },
                    }}
                >

                    <br/>

                    <MenuItem component={<Link to="/"/>} icon={<SiAntdesign/>} disabled> CommuniCreate </MenuItem>
                    <MenuItem component={<Link to="/"/>} icon={<RxDashboard/>}> Dashboard </MenuItem>
                    <SubMenu label="Requests" icon={<BsFillFileRuledFill/>}>
                        <MenuItem icon={<BsCardList/>} component={<Link to="/my-requests"/>}> All Requests </MenuItem>
                        <MenuItem icon={<GrAddCircle/>} component={<Link to="/new-request"/>} onClick={() => {
                            dispatch(resetRequest())
                        }}> Create New Request </MenuItem>
                    </SubMenu>
                    {/* <MenuItem component={<Link to="/archive"/>} icon={<BsArchive/>}> RequestPage </MenuItem> */}
                    <MenuItem component={<Link to="/agencies"/>} icon={<BsBuildingFill/>}> Agencies </MenuItem>
                    <MenuItem component={<Link to="/dues"/>} icon={<BsCashStack/>}> Dues </MenuItem>
                    <MenuItem component={<Link to="/completed-projects"/>} icon={<IoIosCloudDone/>}> Completed Projects </MenuItem>
                    <MenuItem component={<Link to="/rejected-projects"/>} icon={<AiOutlineCloseCircle/>}> Rejected Projects </MenuItem>
                    <MenuItem component={<Link to="/ongoing-projects"/>} icon={<AiOutlinePlayCircle/>}> Ongoing Projects </MenuItem>
                    <Divider/>

                    <MenuItem icon={<AiOutlineInfoCircle/>}> About Us </MenuItem>
                    <MenuItem icon={<HiOutlineMail/>}> Contact Us </MenuItem>


                </Menu>
            </Sidebar>
        </div>
    );

}