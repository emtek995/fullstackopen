import React from 'react'

const Header = (props) => (
  <h1>{props.course.name}</h1>
)

const Part = (props) => (
  <p>{props.part.name} {props.part.exercises}</p>
)

const Content = (props) => (
  <>
    <Part part={props.course.parts[0]} />
    <Part part={props.course.parts[1]} />
    <Part part={props.course.parts[2]} />
  </>
)

const Total = (props) => {
  let total = 0
  props.course.parts.forEach(element => {
    total += element.exercises
  })
  return (<p>Number of exercises {total}</p>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundementals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }]
  }

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default App
