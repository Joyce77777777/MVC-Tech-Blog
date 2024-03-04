module.exports = {
  format_date: (date) => {
    const d = new Date(date);
    
    // Format the date as MM/DD/YYYY
    const formattedDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    
    // Convert 24-hour time to 12-hour time and determine AM or PM
    let hours = d.getHours();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Format minutes to ensure two digits
    const minutes = d.getMinutes().toString().padStart(2, '0');
    
    // Combine the formatted date and time with AM/PM
    const formattedTime = `${hours}:${minutes} ${amPm}`;
    
    return `${formattedDate} at ${formattedTime}`;
  },
};
