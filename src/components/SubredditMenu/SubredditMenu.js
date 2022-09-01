import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SubredditMenu.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubreddits } from './SubredditSlice';
import { FaRedditSquare } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai'

export function SubredditMenu() {
    const subreddits = useSelector(state => state.subreddits.subreddits);
    const isLoading = useSelector(state => state.subreddits.isLoading);
    const error = useSelector(state => state.subreddits.error);
    const dispatch = useDispatch();
    const [openedMenu, setOpenedMenu] = useState(false);
    const toggleMenu = () => {
        setOpenedMenu(!openedMenu);
    }
    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    return (
        isLoading || error ||
        <div data-testid='subreddit-menu' className={`subreddit-menu ${openedMenu ? 'opened' : ''}`}>
            <div onClick={toggleMenu} className='toggler'>
                <div className='open'>
                    <FaRedditSquare className="icon" />
                    <p>Sub-Menu</p>
                </div>
                <div className='close'>
                    <AiOutlineCloseCircle />
                </div>
            </div>
            <nav className='subreddit-links'>
                {subreddits.map(subreddit => {
                    return <NavLink onClick={toggleMenu} to={`/${subreddit.display_name}`} key={subreddit.id}>
                        {subreddit.icon_img ?
                            <img className='subreddit-icon' src={subreddit.icon_img} alt='icon of the subreddit' /> :
                            <div className='subreddit-icon'></div>}
                        <span data-testid='subreddit-name'>{subreddit.display_name}</span>
                    </NavLink>
                })}
            </nav>
        </div>
    )
}