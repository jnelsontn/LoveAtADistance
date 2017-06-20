'use strict';

app.controller('CalendarCtrl', function($scope, $http, 
    apiUrl, calendar, RootFactory, ProfileFactory) {
    
    console.log('CalendarCtrl Here');

    // Events for only current user & partner
    $scope.user_events = calendar;
    $scope.partner_calendar = $scope.partner.calendar;

    // The calendar uses $scope.events to build the calendar
    $scope.events = calendar;
    $scope.events = $scope.events.concat($scope.partner_calendar);

    // for event list
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

    // When a date on the calendar is clicked, we watch to see if an
    // event is scheduled for the day.
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

    $scope.removeUserEvent = (id) => {
        $http({
            url: `${apiUrl}/calendar/` + id,
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

    // we'll use 'user_event' for a specific user event
    // post the event to our Api, then put it again
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
        });
    };

}); // end controller