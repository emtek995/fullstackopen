import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Part = (props) => {
    return <p>{props.part.name} {props.part.exercises}</p>
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.p1}/>
            <Part part={props.p2}/>
            <Part part={props.p3}/>
        </div>
    )
}

const Total = (props) => {
    return <p>Number of exercises {props.ex1.exercises + props.ex2.exercises + props.ex3.exercises}</p>
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundementals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={course}/>
            <Content p1={part1} p2={part2} p3={part3}/>
            <Total ex1={part1} ex2={part2} ex3={part3}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))