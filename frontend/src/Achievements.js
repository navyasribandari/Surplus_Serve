// Achievements.js
import React from 'react';
import './Achievements.css'; // Add styles for achievements

const Achievements = () => {
  const donorRewards = [
    { title: 'Top Contributor', criteria: '100 Meals Donated' },
    { title: 'Community Hero', criteria: '50 Meals Donated' },
  ];

  const volunteerRewards = [
    { title: 'Star Volunteer', criteria: '10 Deliveries Completed' },
    { title: 'Helping Hand', criteria: '5 Deliveries Completed' },
  ];

  return (
    <div className="achievements">
      <h2>Achievements and Rewards</h2>
      <div className="rewards-section">
        <h3>For Donors</h3>
        <ul>
          {donorRewards.map((reward, index) => (
            <li key={index}>
              {reward.title} - {reward.criteria}
            </li>
          ))}
        </ul>
      </div>
      <div className="rewards-section">
        <h3>For Volunteers</h3>
        <ul>
          {volunteerRewards.map((reward, index) => (
            <li key={index}>
              {reward.title} - {reward.criteria}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Achievements;
