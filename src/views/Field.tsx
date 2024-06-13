import { Paragraph, Select, Option, Button } from '@contentful/f36-components';
import { type FieldAppSDK, Entry } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import {
	type SyntheticEvent,
	useState,
	// useEffect,
	// Suspense,
} from 'react';

enum EnumType {
	start,
	paths,
	labels,
}


type Locale = {
	[locale: string]: string[];
}


type Entries = (Entry & {
	fields: {
		testing: Locale;
		[EnumType.paths]: Locale;
		[EnumType.labels]: Locale;
	}
})[]

type Hold = {
	testing: string[];
	[EnumType.paths]: string[];
	[EnumType.labels]: string[];
}


export default function Constants() {
	const sdk = useSDK<FieldAppSDK>();
	const locale = sdk.locales.default;
	const [type, setType] = useState(EnumType.start);
	const [data, setData] = useState({} as Hold);

	function updateValue(e: SyntheticEvent<HTMLSelectElement>) {
		sdk.field.setValue(e.currentTarget.value);
	}

	async function getData() {
		const value = await sdk.cma.entry.getMany({ query: { content_type: 'enumsTwo' } });
		const [entry] = value.items as Entries;
		const paths = entry.fields.testing[locale];
		// const labels = entry.fields[EnumType.labels][locale];

		setData({
			testing: paths,
			[EnumType.paths]: paths,
			[EnumType.labels]: paths,
		});
	}

	getData();

	if (!Object.keys(data).length) {
		return <Paragraph>Loading...</Paragraph>;
	}

	if (type === EnumType.start) {
		return (
			<div>
				<Paragraph>Select a type</Paragraph>
				<Button onClick={() => setType(EnumType.paths)}>Paths</Button>
				<Button onClick={getData}>Debug</Button>
			</div>
		)
	}
	if (type === EnumType.paths) {

		return (
			<div>
				<Select onChange={updateValue}>
					{data[EnumType.paths].map(path => (
						<Option key={`${path}-1`} value={path}>{path}</Option>
					))}
				</Select>
				<Button onClick={() => setType(EnumType.start)}>Reset</Button>
			</div>
		);
	}

};
