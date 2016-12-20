[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Time Capsule API

An API to store document metadata and allow users to upload/download files to AWS.

---

## Links

The front-end is deployed here:<br>
https://awesome-dream-org.github.io/TimeCapsule-Frontend

The back-end is deployed here:<br>
https://sheltered-taiga-22202.herokuapp.com

The front-end repo can be found here:<br>
https://github.com/awesome-dream-org/TimeCapsule-Frontend

The back-end deployed repo can be found here:<br>
https://github.com/awesome-dream-org/TimeCapsule-Backend

---

## API end-points

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| DELETE | `/sign-out/:id`        | `users#signout`   |
| PATCH  | `/change-password/:id` | `users#changepw`  |
| GET    | `/docs`                | `docs#index`      |
| GET    | `/docs/?restrict=true` | `docs#index`      |
| POST   | `/docs`                | `docs#create`     |
| GET    | `/docs/:id`            | `docs#show`       |
| PATCH  | `/docs/:id`            | `docs#update`     |
| DELETE | `/docs/:id`            | `docs#destroy`    |
| GET    | `/categories`          | `categories#index`|

---

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
