import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notifications({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/notifications?user_id=${userId}`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`http://localhost:8000/api/user/notifications/${notificationId}/read`);
      fetchNotifications(); // Refresh notifications list
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put('http://localhost:8000/api/user/notifications/read-all');
      fetchNotifications(); // Refresh notifications list
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <button onClick={markAllAsRead}>Mark all as read</button>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.data.status === 'accepted' && (
              <span className="text-green-500">Your reservation was accepted.</span>
            )}
            {notification.data.status === 'rejected' && (
              <span className="text-red-400">Your reservation was rejected.</span>
            )}
            {notification.data.status !== 'accepted' && notification.data.status !== 'rejected' && (
              <span className="text-gray-500">You have a new notification.</span>
            )}
            <button onClick={() => markAsRead(notification.id)}>Mark as read</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
