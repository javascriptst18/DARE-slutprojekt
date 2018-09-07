
export const matchDares = () => {
  const myDare = this.state;
  const matched = {};
  const tempArr = [];
  db.collection('queue').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const newData = doc.data();
      newData.id = doc.id;
      tempArr.push(newData);
      this.compareDares(myDare, tempArr, matched);
    });
  });
  // compares myDare with fetched queue
}
// Johannes funktion för att hämta kö
export const getTheQueue = () => {
  const tempArr = [];
  db.collection('queue').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const newData = doc.data();
      newData.id = doc.id;
      tempArr.push(newData);
    });
    this.setState({ testQueue: tempArr }); // använda för mappa igenom och skriva ut?
    console.log(this.state.testQueue);
  });
}

export const compareDares = (myDare, dare, matched) => {
  console.log('meeeeeeeeeeeeeeeeeeeeeeeeeee');
  dare.timeStart = this.stringsToDate(dare.date, dare.timeStart);
  dare.timeEnd = this.stringsToDate(dare.date, dare.timeEnd);
  if (dare.date === myDare.date
  /* && dare.location === myDare.location
            && dare.level == myDare.level //don't care about format for now
            && dare.timeStart < myDare.timeEnd
            && myDare.timeStart < dare.timeEnd */
  ) {
 console.log('muuuuuuuuuuuuuuuuuuuuuuuuuuu');
    const budget = Math.min(dare.budget, myDare.budget);
    const timeStart = Math.max(dare.timeStart, myDare.timeStart);
    const timeEnd = Math.min(dare.timeEnd, myDare.timeEnd);
    // returns user match, not connected to activity yet
    return matched = {
      date: dare.date,
      id1: dare.id,
      id2: myDare.id,
      cost: budget,
      starts: timeStart,
      ends: timeEnd,
    };
  }

  console.log(`${matched  } wooohooooooooooooo`);
  return matched;
};

const stringsToDate = (date, time) => {
  const fullstring = `${date}T${time}:00+01:00`;
  return date = new Date(fullstring).getTime();
};

const postUnmatched = (unmatched) => {
  const dare = postDare(unmatched, this.props.user);
  this.props.dispatch(dare);
};

const matchDareActivity = (userDareMatch) => {
  const finalVersion = {};
  db.collection('activity').get()
    .then((activitySnapshot) => {
      activitySnapshot.forEach((activity) => {
        this.compareDareActivity(userDareMatch, activity, finalVersion);
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
