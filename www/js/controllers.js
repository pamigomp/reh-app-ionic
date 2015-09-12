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

        .controller('EmployeesController', function ($scope, EmployeesDataService) {
            $scope.data = {};
            $scope.error = false;

            $scope.loadEmployeesList = function () {
                EmployeesDataService.getEmployeesList().then(function (employeesList) {
                    $scope.employees = employeesList;
                }, function () {
                    $scope.error = true;
                });
            };

            $scope.clearSearch = function () {
                $scope.data.searchQuery = '';
            };
        })

        .controller('EmployeeDetailsController', function ($scope, $stateParams, EmployeesDataService) {
            $scope.error = false;

            $scope.loadEmployeeDetails = function () {
                if (angular.isDefined($stateParams.employeeId)) {
                    EmployeesDataService.getEmployeeDetails($stateParams.employeeId).then(function (employeeDetails) {
                        $scope.employeeDetails = employeeDetails;
                    }, function () {
                        $scope.error = true;
                    });
                }
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

        .controller('PricesController', function ($scope, PricesDataService) {
            $scope.data = {};
            $scope.error = false;

            $scope.loadPricesList = function () {
                PricesDataService.getPricesList().then(function (pricesList) {
                    $scope.prices = pricesList;
                }, function () {
                    $scope.error = true;
                });
            };
            $scope.clearSearch = function () {
                $scope.data.searchQuery = '';
            };
        })

        .controller('TreatmentsController', function ($scope, $timeout, TreatmentsDataService) {
            $scope.empty = false;
            $scope.error = false;

            $scope.doRefresh = function () {
                $timeout(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.$apply();
                    $scope.loadTreatmentsList();
                }, 1000);
            };

            $scope.loadTreatmentsList = function () {
                TreatmentsDataService.getTreatmentsList().then(function (treatmentsList) {
                    if (treatmentsList.length === 0) {
                        $scope.empty = true;
                    } else {
                        $scope.treatments = treatmentsList;
                    }
                }, function () {
                    $scope.error = true;
                });
            };
        })

        .controller('TreatmentDetailsController', function ($scope, $state, $stateParams, $ionicPopup, TreatmentsDataService) {
            $scope.error = false;

            $scope.loadTreatmentDetails = function () {
                if (angular.isDefined($stateParams.treatmentId)) {
                    TreatmentsDataService.getTreatmentDetails($stateParams.treatmentId).then(function (treatmentDetails) {
                        $scope.treatmentDetails = treatmentDetails;
                    }, function () {
                        $scope.error = true;
                    });
                }
            };

            $scope.showConfirm = function (treatment) {
                $ionicPopup.confirm({
                    title: 'Uwaga',
                    template: 'Czy na pewno chcesz odwołać wizytę z dnia ' + treatment.date + ' o godzinie ' + treatment.hour + '?',
                    cancelText: 'Anuluj'
                }).then(function () {
                    $state.go('tab.treatments');
                });
            };
        })

        .controller('AppController', function ($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
            $scope.username = AuthService.username();

            $scope.$on(AUTH_EVENTS.sessionTimeout, function (event) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Sesja wygasła!',
                    template: 'Twoja sesja wygasła. Zaloguj się ponownie.'
                });
            });

            $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Nieuprawniony!',
                    template: 'Nie masz uprawnień, aby zobaczyć ten zasób.'
                });
            });

            $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
                AuthService.logout();
                $state.go('signin');
                var alertPopup = $ionicPopup.alert({
                    title: 'Sesja wygasła!',
                    template: 'Przepraszamy. Musisz zalogować się ponownie.'
                });
            });

            $scope.setCurrentUsername = function (name) {
                $scope.username = name;
            };
        });