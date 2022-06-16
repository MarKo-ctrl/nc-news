import React from "react";

export const LoadingSpinner = () => {
    return (
        <div className="d-flex align-items-left">
            <div className="spinner-border mx-auto" role="status" aria-hidden="true"></div>
            <div className="spinner-border mx-auto" role="status" aria-hidden="true"></div>
            <div className="spinner-border mx-auto" role="status" aria-hidden="true"></div>
        </div>
    )
}