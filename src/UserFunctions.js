import db from './firebase';

export default function suspendUser(user) {
  const daysToSuspendUser = 7;
  const date = new Date();
  date.setDate(date.getDate() + daysToSuspendUser);
  const suspensionEndDate = date.getTime();
  const object = {
    suspensionEnds: suspensionEndDate,
    suspended: true,
  };
  db.collection('users').doc(user).update(object).then(() => {
    return true;
  });
}

export function removeSuspension(user, suspensionEnds) {
  const suspensionEndDate = new Date(suspensionEnds);
  const currentDate = new Date();
  if (currentDate > suspensionEndDate) {
    //  Suspensiondate is passed, remove suspension
    const object = {
      suspensionEnds: 0,
      suspended: false,
    };
    db.collection('users').doc(user).update(object).then(() => {
      return true;
    });
  }
  else {
    return false;
  }
}
