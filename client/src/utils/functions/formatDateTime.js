export default function formatDateTime(date) {
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  if(date===undefined){
    return "";
  }
  const dateTimeFormatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDateTime = dateTimeFormatter.format(date);
  
  return formattedDateTime;
}