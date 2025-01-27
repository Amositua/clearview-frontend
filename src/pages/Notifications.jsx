// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// const NotificationPage = () => {
//    const [notifications, setNotifications] = useState([]);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       fetchNotifications();
//       // Poll for new notifications every 30 seconds
//       const interval = setInterval(fetchNotifications, 30000);
//       return () => clearInterval(interval);
//     }, []);
  
//     const fetchNotifications = async () => {
//       try {
//         const token = localStorage.getItem("userInfo");
//         const parsedToken = JSON.parse(token);
  
//         // Use your API endpoint to fetch notifications
//         const response = await fetch('https://contract-image-latest.onrender.com/api/v1/notifications', {
//           headers: {
//             'Authorization': `Bearer ${parsedToken.accessToken}`
//           }
//         });
        
//         if (!response.ok) throw new Error('Failed to fetch notifications');
        
//         const data = await response.json();
//         setNotifications(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//         setLoading(false);
//       }
//     };
  
//     if (loading) return <div>Loading notifications...</div>;
  
//     return (
//       <div>
//         <h2>Document Signing Notifications</h2>
//         <div className="notifications-list">
//           {notifications.length === 0 ? (
//             <div>No notifications available</div>
//           ) : (
//             notifications.map((notification) => (
//               <div key={notification.id} className="notification-card">
//                 <h3>{notification.status}</h3>
//                 <p>Envelope ID: {notification.envelopeId}</p>
//                 <p>Time: {new Date(notification.timestamp).toLocaleString()}</p>
//                 {notification.signerEmail && (
//                   <p>Signer: {notification.signerEmail}</p>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     );
//   };
  
//   // Add some basic styling
//   const StyledNotification = styled.div`
//     .notifications-list {
//       max-width: 600px;
//       margin: 20px auto;
//     }
  
//     .notification-card {
//       background: white;
//       border-radius: 8px;
//       padding: 15px;
//       margin-bottom: 10px;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//     }
  
//     h2 {
//       text-align: center;
//       margin-bottom: 20px;
//     }
  
//     h3 {
//       margin: 0 0 10px 0;
//       color: #333;
//     }
  
//     p {
//       margin: 5px 0;
//       color: #666;
//     }
//   `;
  
// //   export default StyledNotification(NotificationPage);