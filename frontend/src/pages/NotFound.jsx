import React from 'react';

export default function NotFound() {
    return (
        <div style={styles.container}>
            <div style={styles.errorContainer}>
                <h1 style={styles.errorHeading}>404</h1>
                <p style={styles.errorText}>Oops! Page not found.</p>
                <p style={styles.errorDescription}>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <a href="/" style={styles.homeLink}>Go back to homepage</a>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    errorContainer: {
        textAlign: 'center',
    },
    errorHeading: {
        fontSize: '6rem',
        marginBottom: '20px',
        color: '#31363F', // Red color
    },
    errorText: {
        fontSize: '2rem',
        marginBottom: '10px',
    },
    errorDescription: {
        fontSize: '1.2rem',
        marginBottom: '20px',
    },
    homeLink: {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#31363F', // Green color
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
};
