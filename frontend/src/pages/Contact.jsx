import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import log from 'loglevel';

// Set the log level to "error" to suppress warnings and non-error messages
log.setLevel('error');

export default function Contact() {
  const form = useRef();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Add a state for submission status

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_pe9r33o', 'template_kzsx1iq', form.current, {
        publicKey: '6bc94PL9s64YN54YZ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setIsSubmitted(true); // Set the submission status to true on success
          // Reset form fields if needed
          setFullName('');
          setEmail('');
          setMessage('');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="flex flex-col items-center">
      <div className="py-4">
        <h1 className="text-gray-700 poppins text-3xl">
          Contact <span className="text-green-500 font-semibold select-none">Us</span>
        </h1>
        <div className="bg-green-500 flex items-center justify-center w-16 h-1 mt-2 rounded-full"></div>
      </div>
      <div className="p-6 flex flex-col justify-center w-full lg:w-2/4 mx-auto">
        {isSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p>Your message has been sent successfully!</p>
          </div>
        )}
        <div className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg ring-blue-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg ring-blue-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300"
          />
        </div>
        <div className="mt-6">
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-3 h-36 rounded-lg ring-blue-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg w-36 mt-6">
          Submit
        </button>
      </div>
    </form>
  );
}