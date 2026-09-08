<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/noszczykmichal/nextjs-klinika-zdrowej-skory/main/src/app/icon0.svg" width="100" />
</div>
<h1 align="center">
Sanity Studio (Klinika Zdrowej Skóry)
</h1>
<p align="center">
A sanity backend built to feed in data for frontend build for a small business in the wellness industry.
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/noszczykmichal/studio-klinika-zdrowej-skory/main/assets/studio-healthy-skin-clinic.png" width="700" alt="demo" />
</p>

## Related Repositories

This sanity backend powers a Next.js/React frontend:

- [nextjs-klinika-zdrowej-skory](https://github.com/noszczykmichal/nextjs-klinika-zdrowej-skory)

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Contact](#contact)

## General Information

This is the Sanity Studio backend powering the Klinika Zdrowej Skóry website — a fully configurable headless CMS that lets the clinic owner manage treatments, training programs, blog posts, and site content without needing developer involvement for routine updates. The schema is modeled around two parallel content types (treatments and trainings), each with their own categories, custom slug generation, and field-level validation — including navigation ordering with duplicate-prevention checks, and enforced alt-text/image requirements for accessibility and SEO. The Studio is deployed independently from the frontend and communicates with it via Sanity's content API.

## Technologies Used

- [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Sanity Studio](https://www.sanity.io/)
- Styling: [styled-components](https://styled-components.com/)
- Sanity plugins: [@sanity/color-input](https://www.sanity.io/plugins/color-input), [@sanity/table](https://www.sanity.io/plugins/table), [@sanity/vision](https://www.sanity.io/plugins/vision-plugin)
- Code Quality: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- Testing: [Vitest](https://vitest.dev/)
- CI/CD: Custom GitHub Actions pipeline (linting, testing, build & deployment)

## Contact

Designed and created by [@noszczykmichal](https://michalnoszczyk.com/) - feel free to contact me!
