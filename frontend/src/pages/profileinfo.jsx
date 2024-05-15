import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
      const userId = accessToken.id;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.user.name);
          setEmail(data.user.email);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after data fetching
      }
    };

    fetchUserData();
  }, []);
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
      const userId = accessToken.id;

      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken.token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setUpdateMessage('Profile updated successfully');
      } else {
        setUpdateMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
      setUpdateMessage('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-transform: uppercase justify-center text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Update your profile
            </h1>
            {updateMessage && (
              <div
                className={`${
                  updateMessage === 'Profile updated successfully'
                    ? 'text-green-500 dark:text-green-400'
                    : 'text-red-500 dark:text-red-400'
                }`}
              >
                {updateMessage}
              </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
              <div>
                  <label htmlFor="name">Name:</label>
                  {/* <span id="name" className='bg-blue-100'>{name}</span> */}
                  </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="New Name"
                  required
                />
              </div>
              <div>
              <div>
                <label htmlFor="email">Email:</label>
                {/* <span id="email" className='bg-blue-100'>{email}</span> */}
                 </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="New Email"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mx-2" size={20} />
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Update</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
