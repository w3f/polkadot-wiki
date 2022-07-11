import React from 'react';

const SampleComponent= ({children, color}) => (
    <span
        style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#ffffff',
        padding: '0.5rem',
        }}
    >
        {children}
    </span>
)

export default SampleComponent;