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

angular.module('rehApp', ['ionic', 'ngCordova', 'ngMockE2E'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleLightContent();
                }
                //Uncomment this to hide a splashscreen right after application is ready for use
//                navigator.splashscreen.hide();
            });
        })

        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
            $ionicConfigProvider.backButton.text('Wróć');
    
            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

                    .state('signin', {
                        url: '/sign-in',
                        templateUrl: 'templates/login/login.html',
                        controller: 'LoginController'
                    })

                    .state('change', {
                        url: '/change',
                        templateUrl: 'templates/login/change_password.html',
                        controller: 'ChangePasswordController'
                    })

                    // setup an abstract state for the tabs directive
                    .state('tab', {
                        url: '/tab',
                        abstract: true,
                        templateUrl: 'templates/tabs.html'
                    })

                    // Each tab has its own nav history stack:

                    .state('tab.treatments', {
                        url: '/treatments',
                        views: {
                            'tab-treatments': {
                                templateUrl: 'templates/treatments/treatments.html',
                                controller: 'TreatmentsController'
                            }
                        }
                    })
                    
                    .state('tab.treatment-detail', {
                        url: '/treatments/:treatmentId',
                        views: {
                            'tab-treatments': {
                                templateUrl: 'templates/treatments/treatment_details.html',
                                controller: 'TreatmentDetailsController'
                            }
                        }
                    })

                    .state('tab.prices', {
                        url: '/prices',
                        views: {
                            'tab-prices': {
                                templateUrl: 'templates/prices/prices.html',
                                controller: 'PricesController'
                            }
                        }
                    })

                    .state('tab.employees', {
                        url: '/employees',
                        views: {
                            'tab-employees': {
                                templateUrl: 'templates/employees/employees.html',
                                controller: 'EmployeesController'
                            }
                        }
                    })

                    .state('tab.employee-detail', {
                        url: '/employees/:employeeId',
                        views: {
                            'tab-employees': {
                                templateUrl: 'templates/employees/employee_details.html',
                                controller: 'EmployeeDetailsController'
                            }
                        }
                    })

                    .state('tab.contact', {
                        url: '/contact',
                        views: {
                            'tab-contact': {
                                templateUrl: 'templates/contact/contact.html',
                                controller: 'ContactController'
                            }
                        }
                    })

                    .state('tab.about', {
                        url: '/about',
                        views: {
                            'tab-about': {
                                templateUrl: 'templates/about/about.html',
                                controller: 'AboutController'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise(function ($injector, $location) {
                var $state = $injector.get("$state");
                $state.go("tab.treatments");
            });
        })
        .run(function ($httpBackend) {
            $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
            $httpBackend.whenGET(/data\/fake\/\w+.*/).passThrough();
        })
        .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
            $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

                if ('data' in next && 'authorizedRoles' in next.data) {
                    var authorizedRoles = next.data.authorizedRoles;
                    if (!AuthService.isAuthorized(authorizedRoles)) {
                        event.preventDefault();
                        $state.go($state.current, {}, {reload: true});
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    }
                }

                if (!AuthService.isAuthenticated()) {
                    if (next.name !== 'signin') {
                        event.preventDefault();
                        $state.go('signin');
                    }
                }
            });
        });
