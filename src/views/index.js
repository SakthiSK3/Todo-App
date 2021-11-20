import React, { Component, Fragment } from "react";
import AddTodo from "./AddTodo1";
import TodoSection from "./TodoSection";
import Select from "react-select";
import axios from "axios";
import Logo from "../assets/pages/logo1.jpg";
import {
  TODO_STATUS_NEW,
  TODO_STATUS_APPROVED,
  TODO_STATUS_DECLINED,
} from "../constants/Todo";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      todoList: [],
      isClearable: true,
    };
  }

  handleChange = (values) => {
    let status = values && values.value;
    this.setState({ status: status ? status : "" }, () => {
      axios
        .get(`http://localhost:5000/api/status?status=${status ? status : ""}`)
        .then((res) => {
          this.setState({
            todoList: res.data,
          });
        });
    });
  };

  handleSearch = (e) => {
    let name = e.target.value;
    axios.get(`http://localhost:5000/api/todo?name=${name}`).then((res) => {
      console.log("res", res);
      this.setState({
        todoList: res.data,
      });
    });
  };

  _getTodoDetails = () => {
    axios.get("http://localhost:5000/api/search").then((res) => {
      this.setState({
        todoList: res.data,
      });
    });
  };

  render() {
    console.log("this.status", this.state.status);
    const { isClearable } = this.state;
    const statusOptions = [
      {
        value: TODO_STATUS_NEW,
        label: TODO_STATUS_NEW,
      },
      {
        value: TODO_STATUS_APPROVED,
        label: TODO_STATUS_APPROVED,
      },
      {
        value: TODO_STATUS_DECLINED,
        label: TODO_STATUS_DECLINED,
      },
    ];
    return (
      <>
        <nav class="navbar navbar-dark navBar-color ">
          <p className="To-header">
            <img src={Logo} alt="" width="60" height="50" /> My Todo List
          </p>
        </nav>
        <div className="background">
          <div className="container">
            <div className="row">
              <div class="col-md-3 mt-3">
                <div class="form-group">
                  <input
                    type="text"
                    id="search"
                    class="form-control"
                    name="search"
                    placeholder="Search"
                    onChange={(e) => this.handleSearch(e)}
                  />
                </div>
              </div>
              <div class="col-md-3 mt-3">
                <Fragment>
                  <Select
                    onChange={this.handleChange}
                    options={statusOptions}
                    placeholder="Select Status"
                    isClearable={isClearable}
                  />
                </Fragment>
              </div>

              <div className="col-md-6 mt-3 pull-right">
                <AddTodo
                  getDetail={this._getTodoDetails}
                  buttonLabel="Add Todo"
                />
              </div>
            </div>
            <div className="mt-1">
              <TodoSection
                getDetail={this._getTodoDetails}
                todoList={this.state.todoList}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default index;
