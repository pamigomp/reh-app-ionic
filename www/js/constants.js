angular.module('rehApp.constants', [])

        .constant('AUTH_EVENTS', {
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })

        .constant('USER_ROLES', {
            user: 'user_role'
        });