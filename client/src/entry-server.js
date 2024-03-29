import { createApp } from './app';

export default (context) => {
	return new Promise((resolve, reject) => {
		const { app, router, store, apolloClient } = createApp(context);
		router.push(context.url);

		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents();
			if (!matchedComponents.length) {
				return reject(new Error({ code: 404 }));
			}

			Promise.all(
				matchedComponents.map((Component) => {
					if (Component.asyncData) {
						return Component.asyncData({
							store,
							route: router.currentRoute,
							apolloClient,
						});
					}
				})
			)
				.then(() => {
					context.state = store.state;
					resolve(app);
				})
				.catch(reject);
		}, reject);
	});
};
