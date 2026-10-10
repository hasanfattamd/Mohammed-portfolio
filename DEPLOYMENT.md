# Guided Vercel deployment

The project is ready locally. Codex handles setup and deployment; Mohammed does not need to edit code or run commands.

1. **Sign in.** Open https://vercel.com/login and sign in using your preferred method. Complete any one-time code or account verification yourself; do not paste passwords or private codes into the chat.
2. **Connect this computer.** Codex starts the Vercel CLI sign-in flow. Approve the displayed device authorization while signed in. This lets Codex upload this project without requiring a GitHub repository.
3. **Choose the account.** If more than one Vercel workspace is available, choose the intended personal workspace. Codex creates the portfolio project there and applies the existing build configuration.
4. **Deploy.** Codex uploads the local project and runs its production build. The build command is `npm run build`, the output is `dist`, and the framework preset is Other. No environment variables are required for the first deployment.
5. **Check the live site.** Codex verifies the returned URL, images, navigation, and contact links at desktop and phone sizes.
6. **Optional custom domain.** A Vercel URL works immediately. If you want a custom domain later, Codex guides the domain and DNS steps separately and updates the canonical URL.

We will follow these screens one at a time in chat. No deployment has been completed yet.

Official reference: https://vercel.com/docs/deployments
