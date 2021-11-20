/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const addTodo = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const formik = useFormik({
    initialValues: {
      name: " ",
    },
    validationSchema: yup.object({
      name: yup.string().required("This Field  is required"),
    }),

    onSubmit: (data) => {
      console.log("fun call===>");
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>" + JSON.stringify(data));
      axios.post("http://localhost:5000/api/add", data)
        .then((res) => {
          toast.success("User successful Registered");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    },
  });
  return (
    <div>
      <div className="addTodo">
        <Button type="button" color="primary" onClick={toggle}>
          {props.buttonLabel}
        </Button>
      </div>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <form autoComplete="off" onSubmit={formik.onSubmit}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Todo Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name ? (
                <div className="text-danger"> {formik.errors.name}</div>
              ) : null}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <div>
              <Button type="submit" color="primary" className="h6-5-important">
                Add
              </Button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default addTodo;
