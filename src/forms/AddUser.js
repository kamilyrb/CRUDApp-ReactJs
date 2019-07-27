import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from '../context';
import axios from 'axios';
const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: {
            display: "block"
        }
    },
    hidden: {
        opacity: 0,
        applyAtEnd: {
            display: "none"
        }
    }
});


class AddUser extends Component {
    state = {
        visible: false,
        name: "",
        department: "",
        salary: "",
        error: false
    }

    changeVisibility = (e) => {
        this.setState({
            visible: !this.state.visible
        })
    }
    /*
        changeName = (e) => {
            this.setState({
                name:e.target.value
            })
        }
    
    
        changeDepartment = (e) => {
            this.setState({
                department:e.target.value
            })
        }
    
    
        changeSalary = (e) => {
            this.setState({
                salary:e.target.value
            })
        }
    */
    validateForm = () => {
        const { name, salary, department } = this.state;
        if (name === "" || department === "" || salary === "") {
            return false;
        }
        return true;
    }



    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addUser = async (dispatch, e) => {
        e.preventDefault();
        const { name, department, salary } = this.state;
        const newUser = {
            //id: uniqid(),
            name,
            department,
            salary
        }

        if (!this.validateForm()) {
            this.setState({
                error: true
            });
            return;
        }

        const response = await axios.post("http://localhost:3004/users", newUser)
        dispatch({ type: "ADD_USER", payload: response.data });

        //redirect
        this.props.history.push('/');
    }


    render() {
        const { visible, name, department, salary, error } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { dispatch } = value;

                    return (
                        <div className="col-md-8 mb-4">
                            <button className="btn btn-dark btn-block mb-2" onClick={this.changeVisibility}>{visible ? "Hide Form" : "Show Form"}</button>


                            <Animation pose={visible ? "visible" : "hidden"}>
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Add User Form</h4>
                                    </div>
                                    <div className="card-body">
                                        {error ? <div className="alert alert-danger">Lütfen bilgilerinizi kontrol ediniz.</div>:null}
                                        <form onSubmit={this.addUser.bind(this, dispatch)}>
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input type="text"
                                                    name="name"
                                                    id="id"
                                                    placeholder="Enter Name"
                                                    value={name}
                                                    onChange={this.changeInput}
                                                    className="form-control" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="department">Departman</label>
                                                <input type="text"
                                                    name="department"
                                                    id="department"
                                                    value={department}
                                                    onChange={this.changeInput}
                                                    placeholder="Enter department"
                                                    className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="salary">Salary</label>
                                                <input type="text"
                                                    name="salary"
                                                    id="salary"
                                                    value={salary}
                                                    onChange={this.changeInput}
                                                    placeholder="Enter salary"
                                                    className="form-control" />
                                            </div>
                                            <button type="submit" className="btn btn-danger btn-block">Add User</button>


                                        </form>
                                    </div>

                                </div></Animation></div>
                    )
                }
            }

        </UserConsumer>


    }
}
export default AddUser;