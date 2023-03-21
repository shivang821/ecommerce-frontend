import React from 'react'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PeopleIcon from '@mui/icons-material/People';
import { NavLink } from 'react-router-dom'
import './sidebar.css'
const SideBar = () => {
    return (
        <>
            <div className='sidebar' >
                <div className="sideBarBrandDiv">

                    <NavLink to='/' >
                        <h2 className='sideBarBrand' >Ecommerce</h2>
                    </NavLink>
                </div>
                <NavLink to='/admin/dashboard' >
                    <p><DashboardIcon /> Dashboard</p>
                </NavLink>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >

                    <TreeItem nodeId="5" sx={{ fontSize: "1.3rem !important" }} label="Product">
                        <NavLink to='/admin/products' >
                            <TreeItem nodeId="10" label="All Products" icon={<PostAddOutlinedIcon />} />
                        </NavLink>
                        <NavLink to='/admin/product/new' >
                            <TreeItem nodeId="10" label="Create" icon={<AddIcon />} />
                        </NavLink>
                    </TreeItem>
                </TreeView>
                <NavLink to='/admin/orders' >
                    <p><ListAltIcon /> Orders</p>
                </NavLink>
                <NavLink to='/admin/users' >
                    <p><PeopleIcon /> Users</p>
                </NavLink>
                <NavLink to='/admin/review' >
                    <p><RateReviewIcon /> Review</p>
                </NavLink>
            </div>
        </>
    )
}

export default SideBar