const {metersToMiles, millisecondsToHours} = require('./utils');

module.exports = class MeasurementQueue {

  measure = (item) => {
    super.push(item);

    if (this.length === 3) {
      const {distance: distance1, time: time1, strength: strength1} = this[1];
      const {distance: distance2, time: time2, strength: strength2} = this[2];

      const meters = distance1 - distance2;

      const timeDiff = time2 - time1;

      const miles = metersToMiles(meters);

      const hours = millisecondsToHours(timeDiff);

      const mph = (miles / hours).toFixed(2);

      this.shift();

      return {
        mph,
        distance: miles,
        signalStrength: strength2,
      }

    }

    return 0;

  }

}
