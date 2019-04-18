// Client ID and API key from the Developer Console
var CLIENT_ID = '496540304679-3asr7j4fnpdfe0uo6nh2qdcso1554r6r.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAx7EUh0auR7n0-_s9vIxUOgu-Ko1RQGLI';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */

function listUpcomingEvents() {
    table = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 23,
        'orderBy': 'startTime'
    }).then(function (response) {
            var events = response.result.items, i = 0, type = '';
            console.log(events);
            while (true) {
                switch (events[i].colorId) {
                    case '2':
                        type = 'ПР';
                        break;
                    case '11':
                        type = 'Л';
                        break;
                    default:
                        type = 'Л/Р';
                        document.getElementsByClassName(new Date(Date.parse(events[i].start.dateTime)).getHours() + '' + new Date(Date.parse(events[i].start.dateTime)).getMinutes())[new Date(Date.parse(events[i].start.dateTime)).getDay() - 1].rowspan = 2;
                        break;
                }
                try {
                    document.getElementsByClassName(new Date(Date.parse(events[i].start.dateTime)).getHours() + '' + new Date(Date.parse(events[i].start.dateTime)).getMinutes())[new Date(Date.parse(events[i].start.dateTime)).getDay() - 1].innerHTML = '<ul><li class="type">' + type + '</li><li class="caption">' + events[i].summary + '</li><li class="teacher">' + events[i].description + '</li><li class="cab">' + events[i].location + '</li>';
                } catch (e) {
                    console.log(new Date(Date.parse(events[i].start.dateTime)).getHours() + '' + new Date(Date.parse(events[i].start.dateTime)).getMinutes(), new Date(Date.parse(events[i].start.dateTime)).getDay() - 1);
                }

                if (i > 9 && new Date(Date.parse(events[i].start.dateTime)).getDay() < 5) {
                    break;
                } else
                    console.log(new Date(Date.parse(events[i].start.dateTime)).getHours() + ':' + new Date(Date.parse(events[i].start.dateTime)).getMinutes() + ' ' + new Date(Date.parse(events[i].start.dateTime)).getDay());
                i++;
            }

            if (events.length > 0) {
                for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    var when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }

                    appendPre(event.summary + ' (' + when + ')');
                    // table.push(events[i]);
                }
            } else {
                appendPre('No upcoming events found.');
            }
        }
    )

}