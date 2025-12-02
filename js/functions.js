const isStringShort = (str, length) => str.length <= length;

const isPalindrome = (str) => {
  const normalizedString = str.replaceAll(' ', '').toLowerCase();
  return normalizedString === normalizedString.split('').reverse().join('');
};

const getCounts = (input) => {
  const result = [];
  input.toString().split('').forEach((char) => {
    if (parseInt(char, 10)) {
      result.push(char);
    }
  });
  return parseInt(result.join(''), 10);
};

const translateTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

const isWorkTime = (beginDayTime, endDayTime, startMeetTime, duration) => {
  const [beginDayTimeMinutes, endDayTimeMinutes, startMeetTimeMinutes] = [beginDayTime, endDayTime, startMeetTime].map(translateTimeToMinutes);
  const endMeetTimeMinutes = startMeetTimeMinutes + duration;
  return beginDayTimeMinutes <= startMeetTimeMinutes && endMeetTimeMinutes <= endDayTimeMinutes;
};

export {
  isStringShort,
  isPalindrome,
  getCounts,
  isWorkTime
};
