import { useMemo } from 'react';
import { locations } from '@contentful/app-sdk';
import Field from './views/Field';
import Page from './views/Page';
// import ConfigScreen from './views/ConfigScreen';
// import EntryEditor from './views/EntryEditor';
// import Dialog from './views/Dialog';
// import Sidebar from './views/Sidebar';
// import Home from './views/Home';
import { useSDK } from '@contentful/react-apps-toolkit';

const ComponentLocationSettings = {
	[locations.LOCATION_ENTRY_FIELD]: Field,
	[locations.LOCATION_PAGE]: Page,
	// [locations.LOCATION_APP_CONFIG]: ConfigScreen,
	// [locations.LOCATION_ENTRY_EDITOR]: EntryEditor,
	// [locations.LOCATION_DIALOG]: Dialog,
	// [locations.LOCATION_ENTRY_SIDEBAR]: Sidebar,
	// [locations.LOCATION_HOME]: Home,
};

const App = () => {
	const sdk = useSDK();

	const Component = useMemo(() => {
		for (const [location, component] of Object.entries(ComponentLocationSettings)) {
			if (sdk.location.is(location)) {
				return component;
			}
		}
	}, [sdk.location]);

	return Component ? <Component /> : null;
};

export default App;
