import GitHub from '@auth/core/providers/github'

export default generateConfig({
	clientId: import.meta.env?.GITHUB_CLIENT_ID,
	clientSecret: import.meta.env?.GITHUB_CLIENT_SECRET,
})

export function generateConfig({
	clientId,
	clientSecret,
}) {
	return {
		prefix: '/auth',
    injectEndpoints: false,
		providers: [
			GitHub({
				clientId,
				clientSecret,
			}),
		],
	}
}
