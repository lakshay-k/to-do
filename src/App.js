import React, {Component} from "react";
import "./App.scss";
import logo from './assets/img/logo.png';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';

const FormHandler = props => {
  return (<div className="form-section">
    <form onSubmit={props.handleSubmit} className="row form-add-task mt-5 p-4">
      <div className="col-md-6 col-sm-12">
        <div className="form-group">
          <label>
            <h3>
              <i>Task to do..</i>
            </h3>
          </label>
          <textarea name="task" required="required" type="text" className="form-control" placeholder="Task to do" value={props.task} onChange={e => props.handleChange(e, "task")}></textarea>
        </div>
      </div>
      <div className="col-md-2 col-sm-12">
        <div className="form-group">
          <label>
            <h3>
              <i>Complete By:</i>
            </h3>
          </label>
          <input name="date" type="date" required="required" min={props.date} className="form-control" value={props.date} onChange={e => props.handleChange(e, "date")}/>
        </div>
      </div>
      <div className="col-md-2 col-sm-12">
        <div className="form-group">
          <label>
            <h3>
              <i>Time:</i>
            </h3>
          </label>
          <input name="time" type="time" className="form-control" value={props.time} onChange={e => props.handleChange(e, "time")} />
        </div>
      </div>
      <div className="col-md-2 col-sm-12 submit-container">
        <input type="submit" className="btn btn-primary" value="Create"/>
      </div>
    </form>
  </div>);
};

const ToDolist = props => {
  if (!props.data.length) {
    return <div className="not-found-cont mt-4">
      <h2>
        <i>Created tasks will be listed here</i>
      </h2>
    </div>;
  }
  return props.data.map((val, i) => {
    if (val.compStatus === 0) {
      return (<div className="card-body custom-card-wrapper mt-4" key={i}>
        <span className="task-comp-box"><input type="checkbox" className="form-check-input" id="to-do-complete" onClick={e => props.taskComplete(e, i)}/></span>
        <p className="card-due-desc">{val.task}</p>
        <span className="card-due-date">
          <p>Due Date:</p>{val.date}</span>
        <Button className="edit-card-btn" onClick={(e) => props.handleEdit(e, i)}>
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </Button>
        <input type="button" className="del-card-btn" onClick={e => props.deleteItem(e, i)} name="button" value="X"/>
      </div>);
    }
  });
};

const CompletedTasks = props => {
  if (!props.data.length) {
    return <div className="not-found-cont mt-4">
      <h2>
        <i>Completed tasks will be listed here</i>
      </h2>
    </div>;
  }
  return props.data.map((val, i) => {
    if (val.compStatus === 1) {
      return (<div className="card-body custom-card-wrapper mt-4" key={i}>
        <span className="task-comp-box"><input type="checkbox" className="form-check-input" id="to-complete" onClick={e => props.taskIncomplete(e, i)} checked/></span>
        <p className="card-due-desc">{val.task}</p>
        <span className="card-due-date">
          <p>Due Date:</p>{val.date}</span>
        <input type="button" className="del-card-btn" onClick={e => props.deleteItem(e, i)} name="button" value="X"/>
      </div>);
    }
  });
};

const Header = props => {
  return (<div>
    <header className="p-4">
      <div className="container justify-content-around">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <img src={logo} alt="To do list logo"></img>
          </div>
          <div className="col-sm-12 col-md-6 text-right">
            <span className="share-app">
              <p>Spread the word</p>
              <ul>
                <li>
                  <a href="http://www.facebook.com/share.php?u=http://todo.itslm.world">
                    <i class="fa fa-facebook-official" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </header>
  </div>);
};

const UpdateTask = props => {
  return (<div>
    <Modal show={props.show} onHide={props.handleCloseModel}>
      <Modal.Header closeButton="closeButton">
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>
              <h3>
                Task to do
              </h3>
            </label>
            <textarea name="task" value={props.value.task} onChange={(e) => props.changeHandler(e, "task")} required="required" type="text" className="form-control" placeholder="Task to do"></textarea>
          </div>
          <div className="form-group">
            <label>
              <h3>
                Complete By:
              </h3>
            </label>
            <input name="date" type="date" value={props.value.date} onChange={(e) => props.changeHandler(e, "date")} required="required" className="form-control"/>
          </div>
          <Button variant="primary" onClick={(e) => props.updateTaskList(e, props.value.index)}>
            Save Changes
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  </div>);
};

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

function leading_zeros_hours(curr) {
  return (curr.getHours() < 10 ? '0' : '') + curr.getHours();
}
function leading_zeros_minutes(curr) {
  return (curr.getMinutes() < 10 ? '0' : '') + curr.getMinutes();
}
var time = leading_zeros_hours(curr) + ":" + leading_zeros_minutes(curr);

class App extends Component {
  constructor() {
    super();
    this.state = {
      task: "",
      date: date,
      compStatus: 0,
      tasks: [],
      show: false,
      editValue: null,
      edit: {},
      time: time
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
    tasks.push({task: this.state.task, date: this.state.date, compStatus: this.state.compStatus, time: this.state.time});
    this.setState({tasks, task: "", date: date, time: time});
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
      edit: {
        ...tasks[i],
        ...{
          index: i
        }
      }
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
    this.setState({
      tasks,
      show: !this.state.show
    });
    localStorage.setItem("localData", JSON.stringify(tasks));
  }

  sortedData = (data) => {
    return data.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  }

  render() {
    return (<div>
      <Header/>
      <div className="container">
        <FormHandler task={this.state.task} handleChange={this.handleChange} date={this.state.date} time={this.state.time} handleSubmit={this.handleSubmit}/>
        <div className="row">
          <div className="col-sm-12 col-md-6 mt-5">
            <div className="to-do-heading">
              <p>To Do</p>
            </div>
            <ToDolist data={this.sortedData(this.state.tasks)} deleteItem={this.deleteItem} taskComplete={this.taskComplete} handleEdit={this.handleEdit}/>
          </div>
          <div className="col-sm-12 col-md-6 mt-5">
            <div className="to-do-heading">
              <p>Completed</p>
            </div>
            <CompletedTasks data={this.state.tasks} deleteItem={this.deleteItem} taskIncomplete={this.taskIncomplete}/>
          </div>
        </div>
        {
          this.state.show
            ? <UpdateTask changeHandler={this.changeHandler} updateTaskList={this.updateTaskList} show={this.state.show} handleCloseModel={this.handleEdit} value={this.state.edit}/>
            : null
        }
      </div>
    </div>);
  }
}

export default App;
