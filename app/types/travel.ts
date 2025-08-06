export interface Travel {
  id: string;
  userId: string;
  destiny: string;
  startDate: string;
  endDate: string;
  companions: string[];
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllTravelsFilered {
  latest_edited: Travel | null,
  nexts_travels: Travel[] | [],
  previus_travels: Travel[] | []

}

// {
//   "latest_edited": {
//   "id": "c245be48-e9cf-4cd4-b88c-36fc8ff351c8",
//     "userId": "bpGjUD4cGmcQT4TmSfzhRduKNYSPE4rh",
//     "destiny": "a",
//     "startDate": "2025-07-28T00:00:00.000Z",
//     "endDate": "2025-07-31T00:00:00.000Z",
//     "createdAt": "2025-08-06T07:54:33.277Z",
//     "updatedAt": "2025-08-06T07:54:33.277Z",
//     "companions": []
// },
//   "nexts_travels": [
//   {
//     "id": "10d5f253-70c3-4a70-a9a0-77eb5e432a56",
//     "userId": "bpGjUD4cGmcQT4TmSfzhRduKNYSPE4rh",
//     "destiny": "barcelona",
//     "startDate": "2025-08-10T00:00:00.000Z",
//     "endDate": "2025-08-20T00:00:00.000Z",
//     "createdAt": "2025-08-05T22:49:59.063Z",
//     "updatedAt": "2025-08-05T22:49:59.063Z",
//     "companions": [
//       {
//         "id": "f6dcc44b-ec22-4835-ad2a-22aca29c309c",
//         "travelId": "10d5f253-70c3-4a70-a9a0-77eb5e432a56",
//         "name": "Urena",
//         "createdAt": "2025-08-05T22:49:59.063Z",
//         "updatedAt": "2025-08-05T22:49:59.063Z"
//       },
//       {
//         "id": "686792fc-c8bd-49f0-89f4-8cafd4bf85d4",
//         "travelId": "10d5f253-70c3-4a70-a9a0-77eb5e432a56",
//         "name": "Albert",
//         "createdAt": "2025-08-05T22:49:59.063Z",
//         "updatedAt": "2025-08-05T22:49:59.063Z"
//       }
//     ]
//   },
//   {
//     "id": "4cd4cbdf-0531-455c-89f2-88db3a8b43c5",
//     "userId": "bpGjUD4cGmcQT4TmSfzhRduKNYSPE4rh",
//     "destiny": "jkjhkbh",
//     "startDate": "2025-08-22T00:00:00.000Z",
//     "endDate": "2025-08-31T00:00:00.000Z",
//     "createdAt": "2025-08-06T07:35:04.884Z",
//     "updatedAt": "2025-08-06T07:35:04.884Z",
//     "companions": []
//   }
// ],
//   "previus_travels": [
//   {
//     "id": "c245be48-e9cf-4cd4-b88c-36fc8ff351c8",
//     "userId": "bpGjUD4cGmcQT4TmSfzhRduKNYSPE4rh",
//     "destiny": "a",
//     "startDate": "2025-07-28T00:00:00.000Z",
//     "endDate": "2025-07-31T00:00:00.000Z",
//     "createdAt": "2025-08-06T07:54:33.277Z",
//     "updatedAt": "2025-08-06T07:54:33.277Z",
//     "companions": []
//   }
// ]
// }