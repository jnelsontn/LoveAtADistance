'use strict';

app.controller('CalendarCtrl', function($scope, $http, 
    apiUrl, calendar, RootFactory, ProfileFactory) {

    // Events for current user & partner
    $scope.user_events = calendar;
    $scope.partner_calendar = $scope.partner.calendar;

    // Load the calendar data into the widget
    $scope.events = calendar;
    $scope.events = $scope.events.concat($scope.partner_calendar);

    // Keep the events list open by default
    $scope.status = { isFirstOpen: true };

    // Calendar options for ui.bootStrap
    $scope.options = {
        customClass: viewCalendarEvents,
        type: 'month',
        datepickerMode: 'day',
        showWeeks: false,
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // ui.bootstrap method to add events to the calendar.
    function viewCalendarEvents(data) {
        let dayToCheck = new Date(data.date).setHours(0,0,0,0);
        
        for (let i = 0; i < $scope.events.length; i++) {
            let currentDay = new Date($scope.events[i].date
                ).setHours(0,0,0,0);
            
            if (dayToCheck === currentDay)
                return $scope.events[i].status;
        }
    }

    // When a date on the widget is clicked, check for an event
    // and if so, give the client the possibility to display
    $scope.$watch('event.date', (date) => {
        let dayToCheck = new Date(date
            ).setHours(0,0,0,0);

        for (let i = 0; i < $scope.events.length; i++) {
            let currentDay = new Date($scope.events[i].date
                ).setHours(0,0,0,0);

            if (currentDay === dayToCheck) {
                $scope.todays_event = $scope.events[i].message;
            }
        }
    });

    // Remove an event from the list of user's events
    $scope.removeUserEvent = (id) => {
        $http({
            url: `${apiUrl}/calendar/` + id + '/',
            method: 'DELETE',
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then(() => {

            $http({
                url: `${apiUrl}/calendar/`,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            })
            .then((updated_events) => {
                updated_events = updated_events.data.results;
                $scope.user_events = updated_events;
                $scope.events = updated_events;
                $scope.events = $scope.events.concat($scope.partner_calendar);
            });
        });
    };

    // Add an event (requires a date and description of event)
    $scope.addUserEvent = () => {
        $http({
            url: `${apiUrl}/calendar/`,
            method: 'POST',
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            data: { 
                'message': $scope.event.message,
                'date': $scope.event.date
            }
        }).then(() => {
            $scope.event.message = '';

            $http({
                 url: `${apiUrl}/calendar/`,
                 headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            })
            .then((updated_events) => {
                updated_events = updated_events.data.results;
                $scope.user_events = updated_events;
                $scope.events = updated_events;
                $scope.events = $scope.events.concat($scope.partner_calendar);
            });
        }, function(data) {
            console.log('all fields must be filled out');
        });
    };

}); // end controller