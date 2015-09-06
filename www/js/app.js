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

angular.module('rehApp', ['ionic', 'ngCordova', 'rehApp.controllers', 'rehApp.services'])

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
//                    StatusBar.styleDefault();
                }
//                navigator.splashscreen.hide();
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

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
                    
                    .state('tab.treatments-empty-list', {
                        url: '/treatments',
                        views: {
                            'tab-treatments': {
                                templateUrl: 'templates/treatments/treatments_empty_list.html',
                                controller: 'TreatmentsEmptyListController'
                            }
                        }
                    })
                    
                    .state('tab.pricelist', {
                        url: '/pricelist',
                        views: {
                            'tab-pricelist': {
                                templateUrl: 'templates/price/price_list.html',
                                controller: 'PriceListController'
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
            $urlRouterProvider.otherwise('/tab/treatments');

        });
