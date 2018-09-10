import { postDare } from '../actionCreators/dareActions';
import db from '../../firebase';

export const matchDares = (myDare) => {
  const matched = {};
  const tempArr = [];
  db.collection('queue')
    .where('date', '==', myDare.date)
    .where('location', '==', myDare.location)
    .where('level', '==', myDare.level)
    .where('start', '<', myDare.end)
    .onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let newData = doc.data();
      newData.id = doc.id;
      tempArr.push(newData);
      compareDares(myDare, tempArr, matched);
    });
    console.log(tempArr);
  });
  // compares myDare with fetched queue
}


















export const compareDares = (myDare, dare, matched) => {
  console.log('meeeeeeeeeeeeeeeeeeeeeeeeeee');
  dare.timeStart = stringsToDate(dare.date, dare.timeStart);
  dare.timeEnd = stringsToDate(dare.date, dare.timeEnd);
  if (myDare.id != dare.id
      && myDare.start < dare.end 
  ) {
 console.log('muuuuuuuuuuuuuuuuuuuuuuuuuuu');
    const budget = Math.min(dare.budget, myDare.budget);
    const timeStart = Math.max(dare.start, myDare.start);
    const timeEnd = Math.min(dare.end, myDare.end);
    // returns user match, not connected to activity yet
    matched = {
      date: dare.date,
      id1: dare.id,
      id2: myDare.id,
      cost: budget,
      starts: timeStart,
      ends: timeEnd,
    };
    return matched;
  }

  console.log(`${matched.id1, matched.id2  } wooohooooooooooooo`);
  return matched;
};

export const stringsToDate = (date, time) => {
  const fullstring = `${date}T${time}:00+01:00`;
  return date = new Date(fullstring).getTime();
};

const matchDareActivity = (userDareMatch) => {
  const finalVersion = {};
  db.collection('activity').get()
    .then((activitySnapshot) => {
      activitySnapshot.forEach((activity) => {
        compareDareActivity(userDareMatch, activity, finalVersion);
      });
    });
};

const compareDareActivity = (userDareMatch, activity, finalVersion) => {
  if (finalVersion === {}
        && userDareMatch.cost < activity.cost
        && userDareMatch.location === activity.location
        && activity.open < userDareMatch.starts
        && userDareMatch.ends < activity.close
        // && rätt veckodag öppet
  ) {
    return finalVersion = {
      accepted: false,
      declined: false,
      activity: activity.id,
      starts: userDareMatch.starts,
      ends: userDareMatch.ends,
    };
  } return finalVersion;
};
