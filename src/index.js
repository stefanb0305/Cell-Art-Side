import React from 'react';
import ReactDOM from 'react-dom';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketches/sketch-1';
import sketch1 from './sketches/sketch-crea-1';
import sketch2 from './sketches/sketch-crea-2';
// import './public/index.css';
import * as serviceWorker from './serviceWorker';

class App extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			rotation: 150,
			stateSketch: sketch,
		};
	}

	rotationChange(e){
		this.setState({rotation:e.target.value});
	}

	pressEvent = () => this.setState({stateSketch:sketch});

    pressEvent1 = () => this.setState({stateSketch:sketch1});

    pressEvent2 = () => this.setState({stateSketch:sketch2});

	render () {
		return (
			<div>
                <p>Currently showing {this.stateSketch}</p>
                <button className="flat-button" onClick={this.pressEvent}>Standard Simulation</button>
                <button className="flat-button" onClick={this.pressEvent1}>Artistic Simulation 1</button>
                <button className="flat-button" onClick={this.pressEvent2}>Artistic Simulation 2</button>
                <P5Wrapper sketch={this.state.stateSketch} rotation={this.state.rotation}/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
