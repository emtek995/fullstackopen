const Course = ({ courses }) => {
    return (
      <div>
        {courses.map(course => {
          return (
          <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>)
        })}
      </div>
    )
  }

  export default Course
  
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    let total = course.parts.reduce((sum, part) => {
      return sum + part.exercises}, 0)
    return (
      <p><b>total of {total} exercises</b></p>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => {
          return (<Part part={part} />)
        })}
      </div>
    )
  }