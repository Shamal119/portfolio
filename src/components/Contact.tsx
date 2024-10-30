import React from 'react';
import './styles/Contact.css';

interface ContactProps {
    // Add props here
}

const Contact: React.FC<ContactProps> = () => {
    return (
        <div className="contact">
            
            <div className="contact-section">
                <h2>Get in Touch</h2>
                <form className="contact-form">
                    {/* Contact form fields */}
                </form>
            </div>
        
        </div>
    );
};

export default Contact;
