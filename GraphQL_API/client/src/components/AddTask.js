import {
    useState,
    //useEffect
  } from "react";
  import { getProjectsQuery, addTaskMutation, getTasksQuery } from "../queries/queries";
  import { graphql } from "react-apollo";
  
  
  function AddTask(props) {
    const [inputs, setInputs] = useState({
      title: '',
      weight: 1,
      description: '',
      projectId: ''
    });
  
  
    const handleChange = (e) => {
          const newInputs = {
            ...inputs
          };
          if (e.target.name === "weight") newInputs[e.target.name] = parseInt(e.target.value)
          else newInputs[e.target.name] = e.target.value
          setInputs(newInputs)
    }
  
    function displayProjects() {
      //  console.log(props);
      var data = props.getProjectsQuery;
      if (data.loading) {
        return ( <option> Loading projects... </option>);
      }
        else {
          return data.projects.map(project => {
              return ( <option key = {
                  project.id
                }
                value = {
                  project.id
                } > {
                  project.title
                } </option>);
              })
        }
    }
  
    const submitForm = (e) => {
      e.preventDefault();
      console.log(addTaskMutation);
      props.addTaskMutation({
        variables: {
          title: inputs.title,
          weight: parseInt(inputs.weight),
          description: inputs.description,
          projectId: inputs.projectId,
        },
        refetchQueries: [{
          query: getTasksQuery
        }]
      });
    }
  
    return ( <form class = "task"
      id = "add-task"
      /*onSubmit = {...}*/ >
      <div className = "field">
      <label> Task title: </label>
      <input type = "text"
      name = "title"
      onChange = {
        handleChange
      }
      value = {
        inputs.title
      }
      required />
      </div>
      <div className = "field">
      <label > Weight: </label>
      <input type = "number"
      name = "weight"
      onChange = {
        handleChange
      }
      value = {
        inputs.weight
      }
      required />
      </div >
      <div className = "field">
      <label> description: </label>
      <textarea name = "description"
      onChange = {
        handleChange
      }
      value = {
        inputs.description
      }
      required />
      </div >
      <div className = "field" >
      <label> Project: </label>
      <select name = "projectId"
      onChange = {
        handleChange
      }
      value = {
        inputs.projectId
      }
      required > < option value = ""
      selected = "selected"
      disabled = "disabled" > Select project </option>
      </select > </div>
      <button > + </button> </form>
    );
  }
  
  export default compose(
    graphql(getProjectsQuery, {name: "getProjectsQuery"}),
    graphql(addTaskMutation, {name: "addTaskMutation"})
  )(AddTask);
