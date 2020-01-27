# React Spotify Player

![How to Build A Spotify Player with React in 15 Minutes](https://user-images.githubusercontent.com/4650739/54856371-36ea3680-4cc8-11e9-9aeb-1be2a4d95f39.png)

Have you ever wanted to add Spotify integration into your app or website? Adding personalized music to any application is super easy with the Spotify Developer API.

The Spotify API is easy to use and can be added to any application.

In this post, I am going to walk through how to access the Spotify Developer API in the browser using React. The goal is to be a starting point for frontend devs who want to get set up with Spotify API as quickly as possible. Together, we will be creating a Spotify Web player that displays information about your currently played music from Spotify. We will also demonstrate how to:

- Register an application with Spotify
- Authenticate a user and get authorization to access user data
- Retrieve the data from a Web API endpoint

You can read my in depth blog post that accompanies this code, here: [https://medium.com/@joekarlsson/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6](https://medium.com/@joekarlsson/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6)

![Spotify player](https://user-images.githubusercontent.com/4650739/54856251-8aa85000-4cc7-11e9-9bb1-e27812ac2e00.gif)

## Quickstart

### 1. Register an application with Spotify

Go to the [Dashboard](https://developer.spotify.com/dashboard) page at the Spotify Developer website, and click on ‘My New App.” Be sure to write down the Client ID from your application.

You can read my in depth blog post that accompanies this code, here: [https://medium.com/@joekarlsson/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6](https://medium.com/@joekarlsson/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6)

### 2. Clone example repository

```sh
git clone https://github.com/JoeKarlsson/react-spotify-player.git
cd react-spotify-player
```

### 3. Update React Spotify Player Config

Change `src/congig_example.js` to `src/config.js` and paste your Spotify Clioent ID from step 1 in the `clientId` feild.

### 4. Install dependencies & run locally

```sh
npm install
npm start # open http://localhost:3000 in your browser
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Contributing

Don't hesitate to create a pull request. Every contribution is appreciated. In development you can start the tests by calling `npm test`. Checkout our [contribution README](https://github.com/JoeKarlsson/movie-script-scraper/blob/master/CONTRIBUTING.md) for more info.

### Contributing TLDR;

1. Fork it!
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -am 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request :D

### Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150 height="150"
        src="https://avatars.githubusercontent.com/JoeKarlsson?v=3">
        <br />
        <a href="https://github.com/JoeKarlsson">Joe Karlsson</a>
      </td>
    <tr>
  <tbody>
</table>

### License

#### [MIT](./LICENSE)

### Follow Joe Karlsson on Social

- Twitter - [@JoeKarlsson1](https://twitter.com/JoeKarlsson1)
- GitHub - [@JoeKarlsson](https://github.com/joekarlsson/)
- LinkedIn - [/in/joekarlsson](https://www.linkedin.com/in/joekarlsson/)
- Website - [joekarlsson.com](https://www.joekarlsson.com/)
