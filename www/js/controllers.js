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

        .controller('AboutController', function ($scope, $state, $ionicPopover, $timeout, $ionicHistory, $ionicLoading, AuthService) {
            $ionicPopover.fromTemplateUrl('templates/about/popover.html', {
                scope: $scope
            }).then(function (popover) {
                $scope.popover = popover;
            });

            $scope.logout = function () {
                $scope.popover.hide();
                AuthService.logout();
                $ionicLoading.show({template: 'Wylogowywanie...'});
                $timeout(function () {
                    $ionicLoading.hide();
                    $ionicHistory.clearCache();
                    $ionicHistory.clearHistory();
                    $state.go('signin');
                }, 1000);
            };
        })

        .controller('ContactController', function ($scope, $ionicPopup, EmployeesDataService) {
            $scope.loadEmployeesList = function () {
                EmployeesDataService.getEmployeesList($scope).then(function (employeesList) {
                    $scope.employees = employeesList;
                });
            };

            $scope.showAlert = function () {
                $ionicPopup.alert({
                    title: 'Uwaga',
                    template: 'Twoja wiadomość została wysłana!'
                });
            };
        })

        .controller('EmployeesController', function ($scope, $ionicLoading, $ionicPopup, EmployeesDataService) {
            $scope.query = {};

            $scope.loadEmployeesList = function () {
                $ionicLoading.show({
                    template: 'Ładowanie...'
                });
                EmployeesDataService.getEmployeesList().then(function (employeesList) {
                    $scope.employees = employeesList;
                    $ionicLoading.hide();
                }, function () {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Uwaga!',
                        template: 'Wystąpił błąd podczas pobierania listy pracowników. Spróbuj ponownie później.'
                    });
                });
            };

            $scope.clearSearch = function () {
                $scope.query.searchQuery = '';
            };
        })

        .controller('EmployeeDetailsController', function ($scope, $state, $stateParams, $ionicLoading, $ionicPopup, EmployeesDataService) {
            $scope.loadEmployeeDetails = function () {
                $ionicLoading.show({
                    template: 'Ładowanie...'
                });
                if (angular.isDefined($stateParams.employeeId)) {
                    EmployeesDataService.getEmployeeDetails($stateParams.employeeId).then(function (employeeDetails) {
                        $scope.employeeDetails = employeeDetails;
                        $ionicLoading.hide();
                    }, function () {
                        $ionicLoading.hide();
                        $state.go('tab.employees');
                        $ionicPopup.alert({
                            title: 'Uwaga!',
                            template: 'Wystąpił błąd podczas pobierania szczegółów pracownika. Spróbuj ponownie później.'
                        });
                    });
                }
            };
            
            $scope.redirectContact = function(email) {
              $state.go('tab.contact');  
            };
        })

        .controller('LoginController', function ($rootScope, $scope, $state, $ionicPopup, AUTH_EVENTS, AuthService) {
            $scope.data = {
                username: '',
                password: ''
            };

            $scope.login = function (state, data) {
                AuthService.login(data.username, data.password).then(function (authenticated) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    if (data.username === data.password) {
                        $state.go('change', {}, {reload: true});
                    }
                    else
                        $state.go('tab.treatments', {}, {reload: true});
                    $scope.setCurrentUsername(data.username);
                }, function (err) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Logowanie nie powiodło się!',
                        template: 'Sprawdź swoje dane dostępu!'
                    });
                });
            };

            $scope.showAlert = function () {
                $ionicPopup.alert({
                    title: 'Informacja',
                    template: 'W celu przypomnienia hasła udaj się do gabinetu rehabilitacyjnego.'
                });
            };
        })

        .controller('ChangePasswordController', function ($scope, $state) {
            $scope.changePassword = function () {
                $state.go('tab.treatments');
            };
        })

        .controller('PricesController', function ($scope, $ionicLoading, $ionicPopup, PricesDataService) {
            $scope.query = {};

            $scope.loadPricesList = function () {
                $ionicLoading.show({
                    template: 'Ładowanie...'
                });
                PricesDataService.getPricesList().then(function (pricesList) {
                    $scope.prices = pricesList;
                    $ionicLoading.hide();
                }, function () {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Uwaga!',
                        template: 'Wystąpił błąd podczas pobierania listy zabiegów. Spróbuj ponownie później.'
                    });
                });
            };
            $scope.clearSearch = function () {
                $scope.query.searchQuery = '';
            };
        })

        .controller('TreatmentsController', function ($scope, $ionicLoading, $ionicPopup, TreatmentsDataService) {
            $scope.empty = false;

            $scope.doRefresh = function () {
                $scope.loadTreatmentsList();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$apply();
            };

            $scope.loadTreatmentsList = function () {
                $ionicLoading.show({
                    template: 'Ładowanie...'
                });
                TreatmentsDataService.getTreatmentsList().then(function (treatmentsList) {
                    if (treatmentsList.length === 0) {
                        $scope.empty = true;
                    } else {
                        $scope.treatments = treatmentsList;
                    }
                    $ionicLoading.hide();
                }, function () {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Uwaga!',
                        template: 'Wystąpił błąd podczas pobierania listy zabiegów. Spróbuj ponownie później.'
                    });
                });
            };

        })

        .controller('TreatmentDetailsController', function ($scope, $state, $stateParams, $ionicLoading, $ionicPopup, TreatmentsDataService) {
            $scope.loadTreatmentDetails = function () {
                $ionicLoading.show({
                    template: 'Ładowanie...'
                });
                if (angular.isDefined($stateParams.treatmentId)) {
                    TreatmentsDataService.getTreatmentDetails($stateParams.treatmentId).then(function (treatmentDetails) {
                        $scope.treatmentDetails = treatmentDetails;
                        $ionicLoading.hide();
                    }, function () {
                        $ionicLoading.hide();
                        $state.go('tab.treatments');
                        $ionicPopup.alert({
                            title: 'Uwaga!',
                            template: 'Wystąpił błąd podczas pobierania szczegółów zabiegu. Spróbuj ponownie później.'
                        });
                    });
                }
            };

            $scope.showConfirm = function (treatment) {
                $ionicPopup.confirm({
                    title: 'Uwaga',
                    template: 'Czy na pewno chcesz odwołać wizytę z dnia ' + treatment.date + ' o godzinie ' + treatment.hour + '?',
                    cancelText: 'Anuluj'
                }).then(function (result) {
                    if (result) {
                        $state.go('tab.treatments');
                    }
                });
            };
        })

        .controller('AppController', function ($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
            $scope.username = AuthService.username();

            $scope.$on(AUTH_EVENTS.sessionTimeout, function (event) {
                $ionicPopup.alert({
                    title: 'Sesja wygasła!',
                    template: 'Twoja sesja wygasła. Zaloguj się ponownie.'
                });
            });

            $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
                $ionicPopup.alert({
                    title: 'Nieuprawniony!',
                    template: 'Nie masz uprawnień, aby zobaczyć ten zasób.'
                });
            });

            $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
                AuthService.logout();
                $state.go('signin');
                $ionicPopup.alert({
                    title: 'Sesja wygasła!',
                    template: 'Przepraszamy. Musisz zalogować się ponownie.'
                });
            });

            $scope.setCurrentUsername = function (name) {
                $scope.username = name;
            };
        });