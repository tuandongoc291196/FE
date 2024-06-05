import React from 'react'
import "./Photographer.css"
import SearchIcon from '@mui/icons-material/Search';
import { Button, Checkbox } from '@mui/material';

const Photographer = () => {
    return (
        <div id='Photographer'>
            <div className="row">
                <div className="col-haft cover-search">
                    <div className="landing-search">
                        <h1 className="header-search">
                            Chụp ảnh cưới
                        </h1>
                        <span className="description-search">
                        </span>
                        <div className="search-container">
                            <div className="search" style={{ borderRadius: '1rem 0 0 1rem' }}>
                                <SearchIcon style={{ fontSize: '2rem', color: 'var(--primary-color)' }} />
                                <input type="text" className="input" placeholder="Search for vendors" />
                            </div>
                            <div className="search">
                                <div>in</div>
                                <input type="text" className="input" placeholder="Location" />
                            </div>
                            <Button className="btn-search" variant="contained">Search</Button>
                        </div>
                    </div>
                </div>
                <div className="col-haft">
                    <img src="https://cdn1.weddingwire.com/assets/img/home/bg_hero1.jpg" alt="" />
                </div>
            </div>
            <div className="content">
                <aside className='aside-bar'>
                    <div className="filter-component">
                        <legend className="filter-name">Chi phí</legend>
                        <ul className="filter-list">
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> Under $1,000</li>
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> $1,000 - $1,999</li>
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> $2,000 - $3,999</li>
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> $3,000 - $4,999</li>
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> $4,000+</li>
                        </ul>
                    </div>
                    <div className="filter-component">
                        <legend className="filter-name">Chi phí</legend>
                        <ul className="filter-list">
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> Under $1,000</li>
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> $1,000 - $1,999</li>
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> $2,000 - $3,999</li>
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> $3,000 - $4,999</li>
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> $4,000+</li>
                        </ul>
                    </div>
                    <div className="filter-component">
                        <legend className="filter-name">Chi phí</legend>
                        <ul className="filter-list">
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> Under $1,000</li>
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> $1,000 - $1,999</li>
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> $2,000 - $3,999</li>
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> $3,000 - $4,999</li>
                            <li className="filter-item"><Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 18}}}/> $4,000+</li>
                        </ul>
                    </div>
                </aside>
                <div className="filter-content">Main layout</div>
            </div>
        </div>
    )
}

export default Photographer