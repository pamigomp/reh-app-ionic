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

        .controller('AboutController', function ($scope) {

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
                    img: "../img/person.jpg"
                },
                {
                    id: 2,
                    name: "mgr Jan Nowak",
                    img: "../img/person.jpg"
                },
                {
                    id: 3,
                    name: "mgr Adam Kowalski",
                    img: "../img/person.jpg"
                },
                {
                    id: 4,
                    name: "mgr Adam Nowak",
                    img: "../img/person.jpg"
                },
                {
                    id: 5,
                    name: "mgr Michał Pietrzak",
                    img: "../img/person.jpg"
                },
                {
                    id: 6,
                    name: "mgr Paweł Pietrzak",
                    img: "../img/person.jpg"
                }
            ];
            $scope.alert = function () {
                alert("Click");
            };
        })

        .controller('EmployeesDetailsController', function ($scope) {

        })

        .controller('LoginController', function ($scope) {

        })

        .controller('LoginFirstController', function ($scope) {

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

        .controller('TreatmentsController', function ($scope) {
            $scope.treatments = [
                {
                    date: "01.10.2015",
                    hour: "10:00"
                },
                {
                    date: "02.10.2015",
                    hour: "9:00"
                },
                {
                    date: "04.10.2015",
                    hour: "11:15"
                },
                {
                    date: "05.10.2015",
                    hour: "10:30"
                },
                {
                    date: "07.10.2015",
                    hour: "12:00"
                },
                {
                    date: "08.10.2015",
                    hour: "09:45"
                },
                {
                    date: "10.10.2015",
                    hour: "10:00"
                },
                {
                    date: "11.10.2015",
                    hour: "11:00"
                },
                {
                    date: "13.10.2015",
                    hour: "09:45"
                },
                {
                    date: "14.10.2015",
                    hour: "08:15"
                },
                {
                    date: "16.10.2015",
                    hour: "08:45"
                },
                {
                    date: "17.10.2015",
                    hour: "09:15"
                },
                {
                    date: "19.10.2015",
                    hour: "10:00"
                }
            ];
        })

        .controller('TreatmentsDetailsController', function ($scope) {

        })

        .controller('TreatmentsEmptyListController', function ($scope) {

        })

        .controller('WelcomeController', function ($scope) {

        });
