import React, {Component} from "react";
import "./App.scss";
import man from './assets/img/man.png';
import Modal from 'react-bootstrap/Modal';
import {Button, ModalHeader, ModalFooter, ModalTitle, ModalBody} from 'react-bootstrap';

const FormHandler = props => {
  return (<div className="row form-section border border-danger p-5 rounded">
    <div className="col-sm-12 col-md-8">
      <form onSubmit={props.handleSubmit} className="form-add-task">
        <div className="form-group">
          <label>
            <h3>
              <i>Task to do..</i>
            </h3>
          </label>
          <textarea name="task" required="required" type="text" className="form-control" placeholder="Task to do" value={props.task} onChange={e => props.handleChange(e, "task")}></textarea>
        </div>
        <div className="form-group">
          <label>
            <h3>
              <i>Complete By:</i>
            </h3>
          </label>
          <input name="date" type="date" required="required" className="form-control" value={props.date} onChange={e => props.handleChange(e, "date")}/>
        </div>
        <input type="submit" className="btn btn-primary" value="Submit"/>
      </form>
    </div>
    <div className="col-sm-12 col-md-4 text-center">
      <img src={man} className="form-img-dim"></img>
    </div>
  </div>);
};

const ToDolist = props => {
  if (!props.data.length) {
    return <h1>NotFound</h1>;
  }
  return props.data.map((val, i) => {
    if (val.compStatus === 0) {
      return (<div className="card data-cont border-primary mt-4" key={i}>
        <div className="card-body">
          <h5 className="card-title">{val.task}</h5>
          <p className="card-text">{val.date}</p>
          <input type="button" className="btn btn-danger" onClick={e => props.deleteItem(e, i)} name="button" value="Delete Task"/>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="to-do-complete" onClick={e => props.taskComplete(e, i)}/>
            <label className="form-check-label" for="to-do-complete">Task Complete</label>
          </div>
          <Button variant="primary" onClick={(e) => props.handleEdit(e, i)}>Edit</Button>
        </div>
      </div>);
    }
  });
};

const CompletedTasks = props => {
  if (!props.data.length) {
    return <h1>NotFound</h1>;
  }
  return props.data.map((val, i) => {
    if (val.compStatus === 1) {
      return (<div className="card data-cont border-success mt-4" key={i}>
        <div className="card-body">
          <h5 className="card-title">{val.task}</h5>
          <p className="card-text">{val.date}</p>
          <input type="button" className="btn btn-success" onClick={e => props.deleteItem(e, i)} name="button" value="Delete Task"/>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="to-complete" onClick={e => props.taskIncomplete(e, i)}/>
            <label className="form-check-label" for="to-complete">Task In Complete</label>
          </div>
        </div>
      </div>);
    }
  });
};

const Header = props => {
  return (<div>
    <header className="row text-center p-4">
      <h1>My To Do List</h1>
    </header>
  </div>);
};

const UpdateTask = props => {
  console.log(props);
  return (<div>
    <Modal show={props.show} onHide={props.handleCloseModel}>
      <Modal.Header closeButton="closeButton">
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>
              <h3>
                <i>Task to do..</i>
              </h3>
            </label>
            <textarea name="task" value={props.value.task} onChange={(e) => props.changeHandler(e, "task")} required="required" type="text" className="form-control" placeholder="Task to do" ></textarea>
          </div>
          <div className="form-group">
            <label>
              <h3>
                <i>Complete By:</i>
              </h3>
            </label>
            <input name="date" type="date" value={props.value.date} onChange={(e) => props.changeHandler(e, "date")}  required="required" className="form-control" />
          </div>
          <Button variant="primary" onClick={(e) => props.updateTaskList(e, props.value.index)}>
            Save Changes
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  </div>);
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      task: "",
      date: 11 / 10 / 1995,
      compStatus: 0,
      tasks: [],
      show: false,
      editValue: null,
      edit: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.taskComplete = this.taskComplete.bind(this);
    this.taskIncomplete = this.taskIncomplete.bind(this);
  }

  componentDidMount() {
    let data = localStorage.getItem("localData");
    if (!data) {
      localStorage.setItem("localData", []);
    } else {
      this.setState({tasks: JSON.parse(data)});
    }
  }

  handleChange(event, key) {
    this.setState({[key]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {tasks} = this.state;
    tasks.push({task: this.state.task, date: this.state.date, compStatus: this.state.compStatus});
    this.setState({tasks});
    localStorage.setItem("localData", JSON.stringify(tasks));
  }


  deleteItem = (event, i) => {
    event.preventDefault();
    const {tasks} = this.state;
    tasks.splice(i, 1);
    localStorage.setItem("localData", JSON.stringify(tasks));
    this.setState({tasks});
  }

  taskComplete = (event, i) => {
    const {tasks} = this.state;
    tasks[i].compStatus = 1;
    localStorage.setItem("localData", JSON.stringify(tasks));
    this.setState({tasks});
  }

  taskIncomplete = (event, i) => {
    const {tasks} = this.state;
    tasks[i].compStatus = 0;
    localStorage.setItem("localData", JSON.stringify(tasks));
    this.setState({tasks});
  };

  handleEdit = (e, i) => {
    const {tasks} = this.state;
    this.setState((state, props) => ({
      show: !state.show,
      edit: {...tasks[i], ...{index: i}},
    }));
  }

  changeHandler = (e, type) => {
    const {edit} = this.state;
    edit[type] = e.target.value;
    this.setState({edit});
  }

  updateTaskList = (e, i) => {
    const {edit, tasks} = this.state;
    tasks[i] = edit;
    this.setState({tasks, show: !this.state.show,});
    localStorage.setItem("localData", JSON.stringify(tasks));
  }

  render() {
    return (<div>
      <Header/>
      <FormHandler task={this.state.task} handleChange={this.handleChange} date={this.state.date} handleSubmit={this.handleSubmit}/>
      <div className="row">
        <div className="col-sm-12 col-md-6 text-center mt-5">
          <h2>
            <i>To Do</i>
          </h2>
          <ToDolist
            data={this.state.tasks}
            deleteItem={this.deleteItem}
            taskComplete={this.taskComplete}
            handleEdit={this.handleEdit}
            />
        </div>
        <div className="col-sm-12 col-md-6 text-center mt-5">
          <h2>
            <i>Completed</i>
          </h2>
          <CompletedTasks data={this.state.tasks} deleteItem={this.deleteItem} taskIncomplete={this.taskIncomplete}/>
        </div>
      </div>
      {this.state.show ? <UpdateTask changeHandler={this.changeHandler} updateTaskList={this.updateTaskList} show={this.state.show} handleCloseModel={this.handleEdit} value={this.state.edit} /> : null}
    </div >);
  }
}

export default App;
