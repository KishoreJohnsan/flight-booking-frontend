# flight-booking-frontend

Angular frontend for [flight-booking](https://github.com/KishoreJohnsan/flight-booking), built as a training assignment.
Anyone can search flights. Logged-in users book, view, cancel and download tickets. Admins manage airlines and flight schedules.

## Pages

| Route | Who | What it does |
|---|---|---|
| `/` , `/result` | anyone | Flight search by source and destination, and the results |
| `/login`, `/signup` | anyone | Log in and sign up |
| `/user/home`, `/user/search`, `/user/result` | user | Search flights |
| `/user/book` | user | Book a ticket: seats and meal preference, with the fare worked out from the seat count |
| `/user/history` | user | Your bookings. View, download the PDF ticket, cancel, or delete a cancelled one |
| `/user/ticket/:id` | user | Ticket details |
| `/admin/home` | admin | Admin landing page |
| `/admin/airline`, `/admin/airline/add` | admin | List, add, edit and delete airlines |
| `/admin/schedule`, `/admin/schedule/add` | admin | List, add, edit and delete flight schedules |

## How it works

- After login, the token response is saved in `localStorage` under `data`. An HTTP interceptor (`interceptor.service.ts`) adds `Authorization: Bearer <token>` to every request until the token expires.
- Each user and admin page reads the saved role and redirects away if it doesn't match. There are no route guards, and the real access control is on the backend.
- All calls go through the gateway's authenticated routes: `/api/v1/service/admin/...` and `/api/v1/service/user/...`.

## Stack

- Angular 13
- PrimeNG 13, PrimeFlex, PrimeIcons
- RxJS, dayjs

## Running it locally

Start the backend first (see the flight-booking README). The API URLs are in `src/environments/environment.ts` and point at the gateway on `http://localhost:3000`.

Angular 13 supports Node 12.20, 14.15, or 16.10 and above in the 16 line. Newer Node versions aren't supported, so use Node 16 (for example through nvm).

```sh
npm install
npm start       # http://localhost:4200
```

Sign up on `/signup` to get a normal user. Signup never creates an admin. See the flight-booking README for how to add one.
