// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCyXGMZ-4BsVwoz2CHkC7OsBFJMj80dJm0",
    authDomain: "guestphoto-e6cff.firebaseapp.com",
    databaseURL: "https://guestphoto-e6cff.firebaseio.com",
    projectId: "guestphoto-e6cff",
    storageBucket: "guestphoto-e6cff.appspot.com",
    messagingSenderId: "182232213070"
  },
  apiURL: 'https://us-central1-guestphoto-e6cff.cloudfunctions.net'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
