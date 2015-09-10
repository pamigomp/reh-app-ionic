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

angular.module('rehApp.controllers', [])

        .controller('AboutController', function ($scope, $state, $ionicPopover, $timeout, $ionicLoading, AuthService) {
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
//                    $ionicHistory.clearCache();
//                    $ionicHistory.clearHistory();
//                    $ionicHistory.nextViewOptions({disableBack: true, historyRoot: true});
                    $state.go('signin');
                }, 1000);
            };
        })

        .controller('ContactController', function ($scope, $ionicPopup) {
            $scope.employees = [
                {name: "lek. Jan Kowalski"},
                {name: "lek. Jan Nowak"},
                {name: "lek. Adam Kowalski"},
                {name: "lek. Adam Nowak"},
                {name: "lek. Michał Pietrzak"},
                {name: "lek. Paweł Pietrzak"}
            ];

            $scope.showAlert = function () {
                $ionicPopup.alert({
                    title: 'Uwaga',
                    template: 'Twoja wiadomość została wysłana!'
                });
            };
        })

        .controller('EmployeesController', function ($scope) {
            $scope.employees = [
                {
                    id: 1,
                    name: "mgr Jan Kowalski",
                    img: "img/person.jpg",
                    position: "Fizjoterapeuta"
                },
                {
                    id: 2,
                    name: "mgr Jan Nowak",
                    img: "img/person.jpg",
                    position: "Masażysta"
                },
                {
                    id: 3,
                    name: "mgr Adam Kowalski",
                    img: "img/person.jpg",
                    position: "Fizjoterapeuta"
                },
                {
                    id: 4,
                    name: "mgr Adam Nowak",
                    img: "img/person.jpg",
                    position: "Fizjoterapeuta"
                },
                {
                    id: 5,
                    name: "mgr Michał Pietrzak",
                    img: "img/person.jpg",
                    position: "Masażysta"
                },
                {
                    id: 6,
                    name: "mgr Paweł Pietrzak",
                    img: "img/person.jpg",
                    position: "Fizjoterapeuta"
                }
            ];

            $scope.data = {};


            $scope.clearSearch = function () {
                $scope.data.searchQuery = '';
            };
        })

        .controller('EmployeeDetailsController', function ($scope) {

        })

        .controller('LoginController', function ($scope, $state, $ionicPopup, AuthService) {
            $scope.data = {};

            $scope.login = function (state, data) {
                AuthService.login(data.username, data.password).then(function (authenticated) {
                    $state.go('tab.treatments', {}, {reload: true});
                    $scope.setCurrentUsername(data.username);
                }, function (err) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Logowanie nie powiodło się!',
                        template: 'Sprawdź swoje dane dostępu!'
                    });
                });
            };
        })

        .controller('LoginFirstController', function ($scope, $state) {
            $scope.changePassword = function () {
                $state.go('tab.treatments');
            };
        })

        .controller('PriceListController', function ($scope) {
            $scope.prices = [
                {
                    kindOfTreatment: "Laseroterapia",
                    price: "10",
                    time: "5"
                },
                {
                    kindOfTreatment: "Krioterapia",
                    price: "15",
                    time: "5"
                },
                {
                    kindOfTreatment: "Masaż klasyczny (częsciowy)",
                    price: "25",
                    time: "15"
                },
                {
                    kindOfTreatment: "KinesioTaping",
                    price: "25",
                    time: "-"
                },
                {
                    kindOfTreatment: "Jonoforeza",
                    price: "10",
                    time: "10"
                },
                {
                    kindOfTreatment: "Diadynamik",
                    price: "10",
                    time: "10"
                },
                {
                    kindOfTreatment: "Prądy interferencyjne",
                    price: "10",
                    time: "10"
                },
                {
                    kindOfTreatment: "Ultradźwięki",
                    price: "15",
                    time: "10"
                },
                {
                    kindOfTreatment: "Masaż klasyczny (częsciowy)",
                    price: "25",
                    time: "15"
                },
                {
                    kindOfTreatment: "KinesioTaping",
                    price: "25",
                    time: "-"
                },
                {
                    kindOfTreatment: "Jonoforeza",
                    price: "10",
                    time: "10"
                },
                {
                    kindOfTreatment: "Diadynamik",
                    price: "10",
                    time: "10"
                }
            ];
        })

        .controller('TreatmentsController', function ($scope, $timeout) {
            $scope.doRefresh = function () {
                //$scope.todos.unshift({name: 'Incoming todo ' + Date.now()});
                $timeout(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.$apply();
                    alert("Odświeżanie!");
                }, 2000);

            };

            $scope.treatments = [
                {
                    id: 1,
                    date: "01.10.2015",
                    hour: "10:00"
                },
                {
                    id: 2,
                    date: "02.10.2015",
                    hour: "09:00"
                },
                {
                    id: 3,
                    date: "04.10.2015",
                    hour: "11:15"
                },
                {
                    id: 4,
                    date: "05.10.2015",
                    hour: "10:30"
                },
                {
                    id: 5,
                    date: "07.10.2015",
                    hour: "12:00"
                },
                {
                    id: 6,
                    date: "08.10.2015",
                    hour: "09:45"
                },
                {
                    id: 7,
                    date: "10.10.2015",
                    hour: "10:00"
                },
                {
                    id: 8,
                    date: "11.10.2015",
                    hour: "11:00"
                },
                {
                    id: 9,
                    date: "13.10.2015",
                    hour: "09:45"
                },
                {
                    id: 10,
                    date: "14.10.2015",
                    hour: "08:15"
                },
                {
                    id: 11,
                    date: "16.10.2015",
                    hour: "08:45"
                },
                {
                    id: 12,
                    date: "17.10.2015",
                    hour: "09:15"
                },
                {
                    id: 13,
                    date: "19.10.2015",
                    hour: "10:00"
                }
            ];
        })

        .controller('TreatmentDetailsController', function ($scope, $state, $ionicPopup) {
            $scope.treatmentDetails = [
                {
                    id: 1,
                    date: "01.10.2015",
                    hour: "10:00",
                    kindOfTreatment: "Krioterapia miejscowa",
                    room: "02",
                    employee: "mgr Paweł Pietrzak",
                    kindOfVisit: "Prywatna",
                    price: "15",
                    additionalInformations: "Proszę zabrać duży ręcznik."
                }
            ];

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

        .controller('TreatmentsEmptyListController', function ($scope) {

        })

        .controller('AppController', function ($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
            $scope.username = AuthService.username();
    
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