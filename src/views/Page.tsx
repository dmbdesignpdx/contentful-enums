import { FormLabel, Paragraph, TextInput, Form, Pill } from '@contentful/f36-components';
import { PageAppSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import { type KeyboardEvent } from 'react';
import style from './page.module.css';

const Page = () => {
	const sdk = useSDK<PageAppSDK>();
	const locale = sdk.locales.default;
	console.clear();
	console.info(sdk)

	async function update(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			const value = await sdk.cma.entry.get({
				entryId: '5zm0YWOWbx8C2fdh3ICQzS'
			});

			console.log(value.fields.slug[locale]);

			console.info(sdk)
			console.info(sdk.cma)
		}
	}

	async function create() {
		await sdk.cma.contentType.create({
			contentTypeId: 'enumsTwo',
		}, {
			name: 'EnumsTwo',
			description: 'Collection of enums for the app.',
			fields: [
				{
					id: 'testing',
					name: 'Testing!',
					type: 'Array',
					required: false,
					localized: false,
					items: {
						type: 'Symbol',
						validations: [],
					},
				},
			],
		});

		await sdk.cma.entry.create({ contentTypeId: 'enumsTwo' }, {
			fields: {
				testing: {
					[locale]: ['test1', 'test2', 'test3'],
				},
			},
		});
	}

	return (
		<div>
			<Paragraph>Hello Page Component (AppId: {sdk.ids.app})</Paragraph>

			<Form>
				<FormLabel>Something </FormLabel>
				<TextInput type='text' onKeyDown={update} willBlurOnEsc />
			</Form>

			<div className={style.container}>
				<Pill label="pill 1" onClose={() => undefined} />
				<Pill label="pill 2" onClose={() => undefined} />
			</div>

			<button type="button" onClick={create}>Create</button>

		</div>
	);
};

export default Page;
