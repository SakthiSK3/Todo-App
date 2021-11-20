/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React, { Component } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import {
  TODO_STATUS_NEW,
  TODO_STATUS_APPROVED,
  TODO_STATUS_DECLINED,
} from "../constants/Todo";
import { toast } from "react-toastify";
import { FaEdit } from 'react-icons/fa';


export default class TodoSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
    };
  }
  componentDidMount() {
    this.props.getDetail();
    this.setState({ todoList: this.props.todoList });
  }

  _updateTodoStatus = (data, id) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: data }),
    };
    fetch(`http://localhost:5000/api/status/${id}`, requestOptions).then(
      (response) => {
        toast.success("Todo Successfully Updated");
        this.setState({
          todoList: response.data,
        });
        this.props.getDetail();
      }
    );
  };

  // Remove todo
  handleRemove = (id) => {
    axios.delete(`http://localhost:5000/api/delete/${id}`).then((res) => {
      toast.success("Todo Successfully Deleted");
      this.props.getDetail();
    });
  };

  render() {
    const data =
      this.props.todoList && this.props.todoList.length > 0
        ? this.props.todoList
        : this.state.todoList;
    return (
      <>
        <div className="container mt-2 mb-5">
          <div className="row">
            <div className="col-md-12 col-sm-12  col-xs-12">
              <div className="col-md-12 col-xs-12 p-0 mt-2" style={{background: "white"}}>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th data-sort="name" className="text-center">
                        S.No{" "}
                        <i
                          className="fa fa-sort asc-desc-icon pull-right"
                          aria-hidden="true"
                        ></i>
                      </th>
                      <th data-sort="name" className="sprintSort text-center">
                        Todo Name
                      </th>
                      <th data-sort="status" className="sprintSort text-center">
                        Status{" "}
                        <i
                          className="fa fa-sort asc-desc-icon pull-right"
                          aria-hidden="true"
                        ></i>
                      </th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.length > 0 ? (
                      data.map((todo, index) => (
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{todo.name}</td>
                          <td className="text-center">
                            {todo.status === TODO_STATUS_NEW ? (
                              <div className="text-info">{todo.status}</div>
                            ) : todo.status === TODO_STATUS_APPROVED ? (
                              <div className="text-success">{todo.status}</div>
                            ) : todo.status === TODO_STATUS_DECLINED ? (
                              <div className="text-danger">{todo.status}</div>
                            ) : (
                              ""
                            )}
                          </td>
                          <td className="text-center">
                            <Dropdown>
                              <Dropdown.Toggle id="dropdown-basic" style={{background: "coral", border: "none"}}>
                                <FaEdit />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {todo.status !== TODO_STATUS_APPROVED && (
                                  <Dropdown.Item
                                    onClick={() =>
                                      this._updateTodoStatus(
                                        TODO_STATUS_APPROVED,
                                        todo._id
                                      )
                                    }
                                  >
                                    Inprogress
                                  </Dropdown.Item>
                                )}
                                {todo.status !== TODO_STATUS_DECLINED && (
                                  <Dropdown.Item
                                    onClick={() =>
                                      this._updateTodoStatus(
                                        TODO_STATUS_DECLINED,
                                        todo._id
                                      )
                                    }
                                  >
                                    Completed
                                  </Dropdown.Item>
                                )}
                                {
                                  <Dropdown.Item
                                    className="text-danger"
                                    onClick={() => this.handleRemove(todo._id)}
                                  >
                                    Delete
                                  </Dropdown.Item>
                                }
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <h5 className="mt-5">No Record Found</h5>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
