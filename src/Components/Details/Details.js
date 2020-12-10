import React, { useState, useEffect } from 'react';
import Main from '../Main/Main';
import useLaunches from '../Hooks/UseLaunches';
import Youtube from 'react-youtube';
import { useHistory } from 'react-router-dom';
import './Details.css';

const Details = (props) => {

	const [launch, setLaunch] = useState(null);
	const { getLaunch } = useLaunches();

	useEffect(() => {
		setLaunch(getLaunch(props.match.params.id));
	}, [getLaunch]);

	console.log(launch);


	const history = useHistory();

	if(!launch) return null;

	return (
		<div>
			<Main name={launch.name}/>
			<main className="details">
				<div className="container">
					<div className="details-row">
						<div className="details-image">
							<img src={launch.links.patch.small} alt={launch.name} />
						</div>
						<div className="details-content">
							<p className="details-description">{launch.details}</p>
						</div>
					</div>
					<div>
						<Youtube className="details-youtube" videoId={launch.links.youtube_id}/>
					</div>
				</div>
				<a onClick={history.goBack} className="button button-back">go back</a>
			</main>
	</div>
	); 
};

export default Details;