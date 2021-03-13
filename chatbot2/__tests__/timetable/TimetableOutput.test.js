import React from 'react';
import {create} from 'react-test-renderer';
import TimetableOutput from '../../timetable/TimetableOutput';

const params = {
    params: {
    "classesData": [
        {
            "EventIdentity": "ce8198b7-ffcd-820b-9893-5fb1d9b38d91",
            "HostKey": "2021#SPLUS0CEF2D",
            "Description": null,
            "EndDateTime": "2021-03-11T10:00:00+00:00",
            "EventType": "Synchronous (Online, live)",
            "IsPublished": true,
            "Location": null,
            "Owner": "b8cf1f5a-9687-4440-86b8-13da2c69fa62",
            "StartDateTime": "2021-03-11T09:00:00+00:00",
            "IsDeleted": false,
            "LastModified": "2021-01-18T10:30:31.9006323+00:00",
            "ExtraProperties": [
                {
                    "Name": "Module Name",
                    "DisplayName": "Module Name",
                    "Value": "MS200[2] Linear Algebra, MS200A[2]Linear Mathematics",
                    "Rank": 1
                },
                {
                    "Name": "Staff Member",
                    "DisplayName": "Staff Member",
                    "Value": "Harte A",
                    "Rank": 2
                },
                {
                    "Name": "Activity.TeachingWeekPattern_PatternAsArray",
                    "DisplayName": "Weeks",
                    "Value": "16-19, 21-28",
                    "Rank": 3
                }
            ],
            "UserManuallyAddedEvent": false,
            "StatusIdentity": "b48c85d4-19aa-4b19-87a6-63a5c6d2e630",
            "Status": null,
            "StatusBackgroundColor": null,
            "Name": "MS200/MS200A[2]SY/L1/01",
            "Identity": "ac0f3cda-c448-4cb6-a5eb-1b43ebd732ab"
        },
        {
            "EventIdentity": "a77fe259-e7a7-5f99-826f-3a7d5f1ca49b",
            "HostKey": "2021#SPLUS3EE708",
            "Description": "Linear Algebra - CASE Group A",
            "EndDateTime": "2021-03-11T12:00:00+00:00",
            "EventType": "Synchronous (Online, live)",
            "IsPublished": true,
            "Location": null,
            "Owner": "b8cf1f5a-9687-4440-86b8-13da2c69fa62",
            "StartDateTime": "2021-03-11T11:00:00+00:00",
            "IsDeleted": false,
            "LastModified": "2021-01-14T17:43:14.5730154+00:00",
            "ExtraProperties": [
                {
                    "Name": "Module Name",
                    "DisplayName": "Module Name",
                    "Value": "MS200[2] Linear Algebra",
                    "Rank": 1
                },
                {
                    "Name": "Staff Member",
                    "DisplayName": "Staff Member",
                    "Value": "Williamson B",
                    "Rank": 2
                },
                {
                    "Name": "Activity.TeachingWeekPattern_PatternAsArray",
                    "DisplayName": "Weeks",
                    "Value": "17-19, 21-28",
                    "Rank": 3
                }
            ],
            "UserManuallyAddedEvent": false,
            "StatusIdentity": "b48c85d4-19aa-4b19-87a6-63a5c6d2e630",
            "Status": null,
            "StatusBackgroundColor": null,
            "Name": "MS200[2]SY/T1/03",
            "Identity": "779a7468-f68b-43b3-9b0d-439632187072"
        },
        {
            "EventIdentity": "720860dc-1c90-3980-b358-563b32419f74",
            "HostKey": "2021#SPLUS3EE710",
            "Description": "Linear Algebra - CASE Group B",
            "EndDateTime": "2021-03-11T15:00:00+00:00",
            "EventType": "Synchronous (Online, live)",
            "IsPublished": true,
            "Location": null,
            "Owner": "b8cf1f5a-9687-4440-86b8-13da2c69fa62",
            "StartDateTime": "2021-03-11T14:00:00+00:00",
            "IsDeleted": false,
            "LastModified": "2021-01-14T17:43:34.8304702+00:00",
            "ExtraProperties": [
                {
                    "Name": "Module Name",
                    "DisplayName": "Module Name",
                    "Value": "MS200[2] Linear Algebra",
                    "Rank": 1
                },
                {
                    "Name": "Staff Member",
                    "DisplayName": "Staff Member",
                    "Value": "Williamson B",
                    "Rank": 2
                },
                {
                    "Name": "Activity.TeachingWeekPattern_PatternAsArray",
                    "DisplayName": "Weeks",
                    "Value": "17-19, 21-28",
                    "Rank": 3
                }
            ],
            "UserManuallyAddedEvent": false,
            "StatusIdentity": "b48c85d4-19aa-4b19-87a6-63a5c6d2e630",
            "Status": null,
            "StatusBackgroundColor": null,
            "Name": "MS200[2]SY/T1/04",
            "Identity": "bbab892e-fe80-4f7e-aeba-d938da67b04b"
        },
        {
            "EventIdentity": "ee92958a-7d85-1435-5176-c1c1fc14d8f9",
            "HostKey": "2021#SPLUS3EE714",
            "Description": "Linear Algebra - CASE Group C",
            "EndDateTime": "2021-03-11T16:00:00+00:00",
            "EventType": "Synchronous (Online, live)",
            "IsPublished": true,
            "Location": null,
            "Owner": "b8cf1f5a-9687-4440-86b8-13da2c69fa62",
            "StartDateTime": "2021-03-11T15:00:00+00:00",
            "IsDeleted": false,
            "LastModified": "2021-01-14T17:44:32.811976+00:00",
            "ExtraProperties": [
                {
                    "Name": "Module Name",
                    "DisplayName": "Module Name",
                    "Value": "MS200[2] Linear Algebra",
                    "Rank": 1
                },
                {
                    "Name": "Staff Member",
                    "DisplayName": "Staff Member",
                    "Value": "Al Ansari T",
                    "Rank": 2
                },
                {
                    "Name": "Activity.TeachingWeekPattern_PatternAsArray",
                    "DisplayName": "Weeks",
                    "Value": "17-19, 21-28",
                    "Rank": 3
                }
            ],
            "UserManuallyAddedEvent": false,
            "StatusIdentity": "b48c85d4-19aa-4b19-87a6-63a5c6d2e630",
            "Status": null,
            "StatusBackgroundColor": null,
            "Name": "MS200[2]SY/T1/05",
            "Identity": "fae86312-d760-4e14-8e66-ea21f90f12d8"
        },
        {
            "EventIdentity": "5bd41cba-90f7-2cd9-1ff2-96d6e4b81f8f",
            "HostKey": "2021#SPLUS3EE718",
            "Description": "Linear Algebra - CASE Group D",
            "EndDateTime": "2021-03-11T17:00:00+00:00",
            "EventType": "Synchronous (Online, live)",
            "IsPublished": true,
            "Location": null,
            "Owner": "b8cf1f5a-9687-4440-86b8-13da2c69fa62",
            "StartDateTime": "2021-03-11T16:00:00+00:00",
            "IsDeleted": false,
            "LastModified": "2021-01-14T17:45:01.2868825+00:00",
            "ExtraProperties": [
                {
                    "Name": "Module Name",
                    "DisplayName": "Module Name",
                    "Value": "MS200[2] Linear Algebra",
                    "Rank": 1
                },
                {
                    "Name": "Staff Member",
                    "DisplayName": "Staff Member",
                    "Value": "Al Ansari T",
                    "Rank": 2
                },
                {
                    "Name": "Activity.TeachingWeekPattern_PatternAsArray",
                    "DisplayName": "Weeks",
                    "Value": "17-19, 21-28",
                    "Rank": 3
                }
            ],
            "UserManuallyAddedEvent": false,
            "StatusIdentity": "b48c85d4-19aa-4b19-87a6-63a5c6d2e630",
            "Status": null,
            "StatusBackgroundColor": null,
            "Name": "MS200[2]SY/T1/06",
            "Identity": "5cb5f950-6d0c-466a-bb36-a67dc2dd0162"
        },
        {
            "EventIdentity": "5506500f-2bb5-e911-5908-2282b9dfb59b",
            "HostKey": "2021#SPLUS1D509D",
            "Description": "Linear Algebra MLC",
            "EndDateTime": "2021-03-11T11:00:00+00:00",
            "EventType": "Synchronous (Online, live)",
            "IsPublished": true,
            "Location": null,
            "Owner": "b8cf1f5a-9687-4440-86b8-13da2c69fa62",
            "StartDateTime": "2021-03-11T10:00:00+00:00",
            "IsDeleted": false,
            "LastModified": "2021-01-14T17:47:28.622186+00:00",
            "ExtraProperties": [
                {
                    "Name": "Module Name",
                    "DisplayName": "Module Name",
                    "Value": "MS200[2] Linear Algebra",
                    "Rank": 1
                },
                {
                    "Name": "Staff Member",
                    "DisplayName": "Staff Member",
                    "Value": "Williamson B",
                    "Rank": 2
                },
                {
                    "Name": "Activity.TeachingWeekPattern_PatternAsArray",
                    "DisplayName": "Weeks",
                    "Value": "17-19, 21-28",
                    "Rank": 3
                }
            ],
            "UserManuallyAddedEvent": false,
            "StatusIdentity": "b48c85d4-19aa-4b19-87a6-63a5c6d2e630",
            "Status": null,
            "StatusBackgroundColor": null,
            "Name": "MS200[2]SY/T1/07",
            "Identity": "4d8d8c7b-8c37-4675-a821-5a9fcdc048fa"
        }
    ],
    "jsDate": "2021-03-11T00:00:00.000Z",
    "dayOfTheWeek": "Thursday",
    "courseCode": "CASE2"
}
}

const screen = create(<TimetableOutput route={params} />)

test('TimetableOutput Snapshot Test', () => {
    expect(screen).toMatchSnapshot()
})