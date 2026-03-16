function SkeletonUI() {
    
    
    return <>
        <div className="skeleton-card" style={{ border: "solid red 1px"}}> 
            <div className="book_img"><img alt="blank"/></div>
                                        <div className="book_dtl">
                                            <div className="book_name"></div>
                                            <div className="book_author"></div>
                                            <div className="book_price"></div>
                                            <div className="book_rate"><span className="material-icons-outlined">star</span></div>
                                        </div>
        </div>
    </>    
}

module.exports = SkeletonUI;