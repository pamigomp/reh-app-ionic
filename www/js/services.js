/* 
 * Copyright 2015 Michal Pietrzak.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

angular.module('rehApp.services', [])

//        .service('LoginService', function ($q) {
//            return {
//                loginUser: function (name, pw) {
//                    var deferred = $q.defer();
//                    var promise = deferred.promise;
//
//                    if (name === '12345678901' && pw === 'secret') {
//                        deferred.resolve('Welcome ' + name + '!');
//                    } else {
//                        deferred.reject('Wrong credentials.');
//                    }
//                    promise.success = function (fn) {
//                        promise.then(fn);
//                        return promise;
//                    };
//                    promise.error = function (fn) {
//                        promise.then(null, fn);
//                        return promise;
//                    };
//                    return promise;
//                }
//            };
//        })

        .service('AuthService', function ($q, $http, USER_ROLES) {
            var LOCAL_TOKEN_KEY = 'yourTokenKey';
            var username = '';
            var isAuthenticated = false;
            var role = '';
            var authToken;

            function loadUserCredentials() {
                var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
                if (token) {
                    useCredentials(token);
                }
            }

            function storeUserCredentials(token) {
                window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
                useCredentials(token);
            }

            function useCredentials(token) {
                username = token.split('.')[0];
                isAuthenticated = true;
                authToken = token;

                if (username === 'admin') {
                    role = USER_ROLES.admin;
                }
                if (username === 'user') {
                    role = USER_ROLES.public;
                }

                // Set the token as header for your requests!
                $http.defaults.headers.common['X-Auth-Token'] = token;
            }

            function destroyUserCredentials() {
                authToken = undefined;
                username = '';
                isAuthenticated = false;
                $http.defaults.headers.common['X-Auth-Token'] = undefined;
                window.localStorage.removeItem(LOCAL_TOKEN_KEY);
            }

            var login = function (name, pw) {
                return $q(function (resolve, reject) {
                    if ((name === 'admin' && pw === '1') || (name === 'user' && pw === '1')) {
                        // Make a request and receive your auth token from your server
                        storeUserCredentials(name + '.yourServerToken');
                        resolve('Login success.');
                    } else {
                        reject('Login Failed.');
                    }
                });
            };

            var logout = function () {
                destroyUserCredentials();
            };

            var isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
            };

            loadUserCredentials();

            return {
                login: login,
                logout: logout,
                isAuthorized: isAuthorized,
                isAuthenticated: function () {
                    return isAuthenticated;
                },
                username: function () {
                    return username;
                },
                role: function () {
                    return role;
                }
            };
        })

        .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
            return {
                responseError: function (response) {
                    $rootScope.$broadcast({
                        401: AUTH_EVENTS.notAuthenticated,
                        403: AUTH_EVENTS.notAuthorized
                    }[response.status], response);
                    return $q.reject(response);
                }
            };
        })

        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        });