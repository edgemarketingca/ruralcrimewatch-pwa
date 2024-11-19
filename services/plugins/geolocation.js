// This service is for the cordova-plugin-geolocation plugin
function getLocation (timeoutMS = 50000) {
  console.log('getLocation');
  return new Promise(function (resolve, reject) {
    // Trigger plugin if available
    if (typeof (cordova) !== 'undefined') {
      console.log('iscordova');
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve(position.coords);
        },
        function (error) {
          reject(error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: timeoutMS
        });
    } else {
      // Default location
      setTimeout(() => {
        resolve({
          latitude: 51.05228,
          longitude: -113.83774
        });
      }, 2000);
    }
  });
}

function requestPermission () {
  return new Promise(function (resolve, reject) {
    getLocation(200) // Really short since we only want to trigger the approval anyway
      .then((result) => {
        resolve(true);
      })
      .catch((error) => {
        if (error === 'Illegal Access') { resolve(false); } else { resolve(true); } // Likely an issue getting the location, not actually approving access
      });
  });
}

// IMPORTANT!!! - Only use this to check if location is still allowed. If you check if location is not allowed, it will trigger a permission request
function checkPermission () {
  return new Promise(function (resolve, reject) {
    getLocation(200) // Really short since we only want to check the approval anyway
      .then((result) => {
        resolve(true);
      })
      .catch((error) => {
        console.log('error: ', error);
        // Means we have access
        if (error === 'Timeout expired') { resolve(true); } else { resolve(false); }
      });
  });
}

export default {
  getLocation: getLocation,
  requestPermission: requestPermission,
  checkPermission: checkPermission
};
