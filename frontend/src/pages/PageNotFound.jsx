import React from 'react'

const PageNotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center">
                <h1 className="display-1 fw-bold text-primary">404</h1>
                <p className="lead">Oops! We can't seem to find the page you're looking for.</p>
                <p className="text-muted">It might have been removed, renamed, or did not exist in the first place.</p>
                <div className="mt-4">
                    <a href="/" className="btn btn-primary me-2">Go Home</a>
                    <a href="/contact" className="btn btn-outline-secondary">Contact Support</a>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound