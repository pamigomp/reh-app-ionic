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

angular.module('rehApp')
        .service('TreatmentsDataService', function ($q, DataStorageService) {
            var TreatmentsDataService = {};

            TreatmentsDataService.getTreatmentsList = function ($scope) {
                $scope.loading = true;
                var deferred = $q.defer();

                DataStorageService.getTreatments($scope).then(
                        function (treatmentsData) {
                            var list = [];
                            angular.forEach(treatmentsData.data, function (treatmentData) {
                                list.push(treatmentData);
                            });
                            deferred.resolve(list);
                        },
                        function () {
                            deferred.reject();
                        })
                        .finally(function () {
                            $scope.loading = false;
                        });
                return deferred.promise;
            };

            return TreatmentsDataService;
        })

        .service('PricesDataService', function ($q, DataStorageService) {
            var PricesDataService = {};

            PricesDataService.getPricesList = function ($scope) {
                $scope.loading = true;
                var deferred = $q.defer();

                DataStorageService.getPrices($scope).then(
                        function (pricesData) {
                            var list = [];
                            angular.forEach(pricesData.data, function (priceData) {
                                list.push(priceData);
                            });
                            deferred.resolve(list);
                        },
                        function () {
                            deferred.reject();
                        })
                        .finally(function () {
                            $scope.loading = false;
                        });
                return deferred.promise;
            };

            return PricesDataService;
        })

        .service('EmployeesDataService', function ($q, DataStorageService) {
            var EmployeesDataService = {};

            EmployeesDataService.getEmployeesList = function ($scope) {
                $scope.loading = true;
                var deferred = $q.defer();

                DataStorageService.getEmployees($scope).then(
                        function (employeesData) {
                            var list = [];
                            angular.forEach(employeesData.data, function (employeeData) {
                                list.push(employeeData);
                            });
                            deferred.resolve(list);
                        },
                        function () {
                            deferred.reject();
                        })
                        .finally(function () {
                            $scope.loading = false;
                        });
                return deferred.promise;
            };

            return EmployeesDataService;
        })

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
                role = USER_ROLES.user;

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

            var login = function (username, password) {
                return $q(function (resolve, reject) {
                    if ((username.length === 11 && password === 'admin') || (username === password)) {
                        // Make a request and receive your auth token from your server
                        storeUserCredentials(username + '.yourServerToken');
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
                        403: AUTH_EVENTS.notAuthorized,
                        419: AUTH_EVENTS.sessionTimeout,
                        440: AUTH_EVENTS.sessionTimeout
                    }[response.status], response);
                    return $q.reject(response);
                }
            };
        })

        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        });