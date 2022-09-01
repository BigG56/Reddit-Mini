import './Header.css';
import { Link, createSearchParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SiReddit } from 'react-icons/si';
import { useSelector, useDispatch } from 'react-redux';
import { setTerm, clearTerm } from './SearchSlice';
import { useNavigate } from 'react-router';

export function Header() {
    let term = useSelector(state => state.search.term);
    let dispatch = useDispatch();
    let location = useLocation();
    let navigate = useNavigate();
    let handleTermChange = e => dispatch(setTerm(e.target.value));
    let goToResults = (e) => {
        e.preventDefault();
        navigate({
            pathname: 'search',
            search: `?${createSearchParams({
                q: term
            })}`
        });
    }
    useEffect(() => {
        if (location.pathname !== '/search') {
            dispatch(clearTerm());
        }
    }, [location, dispatch]);
    return (
        <header>
            <div className='header-bar'>
                <Link to='/'>
                    <p className="title"><SiReddit className="logo" />Reddit-Mini</p>
                </Link>
                <div className="search-box">
                <form className='search-bar' onSubmit={goToResults}>
                    <input id='search-input' value={term} type='search' placeholder='Search Posts...' onChange={handleTermChange} />
                </form>
                </div>
            </div>
        </header>
    );
}