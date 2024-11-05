import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const AppointmentScheduler = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'
  ];

  // Calendar helper functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const appointmentData = {
      description,
      date: date.toISOString(),
      time,
      meetLink,
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        alert('Appointment scheduled successfully!');
        setDescription('');
        setDate(new Date());
        setTime('');
        setMeetLink('');
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('Failed to schedule appointment');
    }
  };

  const isToday = (day: Date | null) => {
    const today = new Date();
    return day?.toDateString() === today.toDateString();
  };

  const isSelected = (day: Date | null) => {
    return day?.toDateString() === date?.toDateString();
  };

  const isPastDate = (day: Date | null) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day ? day < today : false;
  };

  const changeMonth = (increment:number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Schedule Appointment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="Enter appointment details..."
            required
          />
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <button 
                  type="button"
                  onClick={() => changeMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ←
                </button>
                <h3 className="text-lg font-semibold">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button 
                  type="button"
                  onClick={() => changeMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  →
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                    {day}
                  </div>
                ))}
                
                {generateCalendarDays().map((day, index) => (
                  <button
                    key={index}
                    type="button"
                    disabled={day === null || isPastDate(day)}
                    onClick={() => day && setDate(day)}
                    className={`
                      p-2 text-center text-sm rounded-full
                      ${day === null ? 'invisible' : ''}
                      ${isToday(day) ? 'bg-blue-100' : ''}
                      ${isSelected(day) ? 'bg-blue-500 text-white' : ''}
                      ${isPastDate(day) ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}
                    `}
                  >
                    {day?.getDate()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`
                    p-2 rounded-md border flex items-center justify-center gap-2
                    ${time === slot 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <Clock className="h-4 w-4" />
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Meeting Link Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meeting Link (Optional)
          </label>
          <input
            type="url"
            value={meetLink}
            onChange={(e) => setMeetLink(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter meeting link..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentScheduler;