import { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api';

export default function InfiniteScroll({ mapFn, query = {}, baseUrl }) {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isEnd, setIsEnd] = useState(false);
	const ref = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(async () => {
			if(isLoading || isEnd) {
				return;
			}

			setIsLoading(true);

			let url = baseUrl;

			const keys = Object.keys(query);

			console.log(query, items);

			if(keys['length'] !== 0) {
				url += '?' + keys[0] + '=' + query[keys[0]];
			}

			for(let i = 1; i < keys['length']; i++) {
				url += '&' + keys[i] + '=' + query[keys[i]];
			}

			const newItems = (await api.get(url)).data.data;

			if(newItems['length'] === 0) {
				setIsEnd(true);
				setIsLoading(false);
				observer.disconnect();

				return;
			}

			query['index'] = newItems[newItems['length'] - 1].id;

			setItems([...items, ...newItems]);
			setIsLoading(false);
		}, {
			threshold: 0
		});

		if(ref.current !== undefined) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [ref, items]);

	return <>
		{items.map(mapFn)}
		<div ref={ref} style={{
			width: '100%',
			height: '10px'
		}}></div>
	</>;
}