import React from "react";

export const CommentSpinner = () => {
    return (
        <main>
            <div className="d-flex align-items-left">
                <div className="spinner-border me-2" role="status" aria-hidden="true"></div> 
                <div>posting comment...</div>
            </div>
        </main>
    )
}