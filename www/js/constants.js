angular.module('rehApp')

        .constant('AUTH_EVENTS', {
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })

        .constant('USER_ROLES', {
            user: 'user_role'
        });