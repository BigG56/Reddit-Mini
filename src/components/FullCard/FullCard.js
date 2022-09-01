import { Link } from 'react-router-dom';
import moment from 'moment';
import '../Card/Card.css';
import './FullCard.css';
import { MarkdownText } from '../Comment/MarkdownText';
import {
    TiArrowUpOutline,
    TiArrowUpThick,
    TiArrowDownOutline,
    TiArrowDownThick,
    TiMessage,
  } from 'react-icons/ti';
import React, { useState } from 'react'; 
import shortenNumb from '../../Tools/shortenNumb';

export function FullCard ({ post }) {
    let content;
    const [voteValue, setVoteValue] = useState(0);

    if (post.post_hint === 'image') {
        content = <div className='post-image full-card-image'>
            <img src={post.url} alt='media preview' />
        </div>
    } else {
        content = post.thumbnail && post.thumbnail !== 'default' ?
        <a href={post.url} target='_blank' rel='noreferrer'><img src={post.thumbnail} alt='media preview' /></a> :
        <a className='post-link' href={post.url} target='_blank' rel='noreferrer'>{post.url}</a>
    }
    let thumbnailClass = post.post_hint !== 'image' && post.thumbnail && post.thumbnail !== 'default' && !post.is_self ?
        'thumbnail-post' :
        '';

        const onHandleVote = (newValue) => {
            if (newValue === voteValue) {
              setVoteValue(0);
            } else if (newValue === 1) {
              setVoteValue(1);
            } else {
              setVoteValue(-1);
            }
          };
        
          const renderUpVote = () => {
            if (voteValue === 1) {
              return <TiArrowUpThick className="icon-action" />;
            }
            return <TiArrowUpOutline className="icon-action" />;
          };
        
          const renderDownVote = () => {
            if (voteValue === -1) {
              return <TiArrowDownThick className="icon-action" />;
            }
            return <TiArrowDownOutline className="icon-action" />;
          };
        
          const getVoteType = () => {
            if (voteValue === 1) {
              return 'up-vote';
            }
            if (voteValue === -1) {
              return 'down-vote';
            }
        
            return '';
          };
    return (
        <div className='full-card'>
            <Link className='subreddit-link' to={`/${post.subreddit}`}>{post.subreddit}</Link>
            <span className='post-time'>{moment.unix(post.created_utc).fromNow()}</span>
            <div className={`post-content ${thumbnailClass}`}>
                <h1 className='post-title'>{post.title}</h1>
                {post.is_self ? <MarkdownText body={post.selftext} /> : content}
            </div>
            <div className='post-panel' id='comments'>
            <div className="post-votes-container">
            <button
              type="button"
              className={`icon-action-button up-vote ${
                voteValue === 1 && 'active'
              }`}
              onClick={() => onHandleVote(1)}
              aria-label="Up vote"
            >
              {renderUpVote()}
            </button>
            <p className={`post-votes-value ${getVoteType()}`}>
              {shortenNumb(post.ups, 1)}
            </p>
            <button
              type="button"
              className={`icon-action-button down-vote ${
                voteValue === -1 && 'active'
              }`}
              onClick={() => onHandleVote(-1)}
              aria-label="Down vote"
            >
              {renderDownVote()}
            </button>
          </div>
                <div className='comments-link'>
                    <TiMessage />
                    <span>{post.num_comments} {post.num_comments === 1 ? 'comment' : 'comments'}</span>
                </div>
            </div>
        </div>
    )
}