import React from 'react';

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source, id } = props;

    return (
        <div className='my-3'>
            <div className="card">
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                }}>
                    <span className='badge rounded-pill bg-danger'>
                        {source}
                    </span>
                </div>

                <img
                    src={
                        !imageUrl
                            ? "https:images.hindustantimes.com/tech/img/2023/07/11/1600x900/SpaceX-0_1689066191917_1689066218880.jpg"
                            : imageUrl
                    }
                    className="card-img-top"
                    id={id}
                    alt="news"
                />

                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>

                    {/* FIXED HERE — removed invalid "p" attribute */}
                    <p className='card-text'>
                        <small className='text-danger'>
                            By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
                        </small>
                    </p>

                    <a
                        rel='noreferrer'
                        href={newsUrl}
                        target='_blank'
                        className="btn btn-sm btn-dark"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
