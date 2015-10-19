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

            TreatmentsDataService.getTreatmentsList = function () {
                var deferred = $q.defer();

                DataStorageService.getTreatments().then(
                        function (treatmentsData) {
                            var list = [];
                            angular.forEach(treatmentsData.data.items, function (treatmentData) {
                                list.push(treatmentData);
                            });
                            deferred.resolve(list);
                        },
                        function () {
                            deferred.reject();
                        });
                return deferred.promise;
            };

            TreatmentsDataService.getTreatmentDetails = function (treatmentId) {
                var deferred = $q.defer();

                DataStorageService.getTreatment(treatmentId).then(
                        function (treatmentData) {
                            deferred.resolve(treatmentData.data.items);
                        },
                        function () {
                            deferred.reject();
                        });
                return deferred.promise;
            };

            TreatmentsDataService.editTreatmentDetails = function (treatmentId) {
                var deferred = $q.defer();

                DataStorageService.editTreatment(treatmentId).then(
                        function () {
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        });
                return deferred.promise;
            };

            return TreatmentsDataService;
        })

        .service('PricesDataService', function ($q, DataStorageService) {
            var PricesDataService = {};

            PricesDataService.getPricesList = function () {
                var deferred = $q.defer();

                DataStorageService.getPrices().then(
                        function (pricesData) {
                            var list = [];
                            angular.forEach(pricesData.data.items, function (priceData) {
                                list.push(priceData);
                            });
                            deferred.resolve(list);
                        },
                        function () {
                            deferred.reject();
                        });
                return deferred.promise;
            };

            PricesDataService.getPriceDetails = function (priceId) {
                var deferred = $q.defer();

                DataStorageService.getPrice(priceId).then(
                        function (priceData) {
                            deferred.resolve(priceData.data.items);
                        },
                        function () {
                            deferred.reject();
                        });
                return deferred.promise;
            };

            return PricesDataService;
        })

        .service('EmployeesDataService', function ($q, DataStorageService) {
            var EmployeesDataService = {};

            EmployeesDataService.getEmployeesList = function () {
                var deferred = $q.defer();

                DataStorageService.getEmployees().then(
                        function (employeesData) {
                            var list = [];
                            angular.forEach(employeesData.data.items, function (employeeData) {
                                list.push(employeeData);
                            });
                            deferred.resolve(list);
                        },
                        function () {
                            deferred.reject();
                        });
                return deferred.promise;
            };

            EmployeesDataService.getEmployeeDetails = function (employeeId) {
                var deferred = $q.defer();

                DataStorageService.getEmployee(employeeId).then(
                        function (employeeData) {
                            deferred.resolve(employeeData.data.items);
                        },
                        function () {
                            deferred.reject();
                        });
                return deferred.promise;
            };

            return EmployeesDataService;
        })

        .service('LoginDataService', function ($q, DataStorageService) {
            var LoginDataService = {};

            LoginDataService.verifyPatientCredentials = function (username) {
                var deferred = $q.defer();

                DataStorageService.verifyCredentials(username).then(
                        function (patientCredentials) {
                            deferred.resolve(patientCredentials.data.items);
                        },
                        function () {
                            deferred.reject();
                        });
                return deferred.promise;
            };

            LoginDataService.editPatientPassword = function (username, password) {
                var deferred = $q.defer();

                DataStorageService.editPassword(username, password).then(
                        function () {
                            deferred.resolve();
                        },
                        function () {
                            deferred.reject();
                        });
                return deferred.promise;
            };

            return LoginDataService;
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
                    if ((username.length === 11) || (username === password)) {
                        // Make a request and receive your auth token from your server
                        storeUserCredentials(username + '.yourServerToken');
                        resolve('Login success.');
                    } else {
                        reject('Login failed.');
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