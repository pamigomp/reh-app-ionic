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

        .service('DataStorageService', function ($http) {
            var DataStorageService = {};

            DataStorageService.getTreatments = function () {
                return $http({
                    method: 'GET',
//                    url: 'data/fake/treatments/treatments.json'
                    url: 'https://apex.oracle.com/pls/apex/pwr/rehapp/employees/'
                });
            };

            DataStorageService.getTreatment = function (treatmentId) {
                return $http({
                    method: 'GET',
//                    url: 'data/fake/treatments/' + treatmentId + '.json'
                    url: 'https://apex.oracle.com/pls/apex/pwr/rehapp/treatments/' + treatmentId
                });
            };

            DataStorageService.getPrices = function () {
                return $http({
                    method: 'GET',
//                    url: 'data/fake/prices/prices.json'
                    url: 'https://apex.oracle.com/pls/apex/pwr/rehapp/prices/'
                });
            };

            DataStorageService.getEmployees = function () {
                return $http({
                    method: 'GET',
//                    url: 'data/fake/employees/employees.json'
                    url: 'https://apex.oracle.com/pls/apex/pwr/rehapp/employees/'
                });
            };

            DataStorageService.getEmployee = function (employeeId) {
                return $http({
                    method: 'GET',
//                    url: 'data/fake/employees/' + employeeId + '.json'
                    url: 'https://apex.oracle.com/pls/apex/pwr/rehapp/employees/' + employeeId
                });
            };

            return DataStorageService;
        });
