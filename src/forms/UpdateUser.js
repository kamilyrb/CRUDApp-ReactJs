import React, { Component } from 'react'
import UserConsumer from '../context';
import axios from 'axios';
class UpdateUser extends Component {
    state = {
        name: "",
        department: "",
        salary: "",
        error: false
    }


    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:3004/users/${id}`);
        console.log(response.data);
        const { name, salary, department } = response.data;
        this.setState({
            name,
            department,
            salary
        });
    }

    validateForm = () => {
        const { name, salary, department } = this.state;
        if (name === "" || department === "" || salary === "") {
            return false;
        }
        return true;
    }
    updateUser = async (dispatch, e) => {
        e.preventDefault();
        //update user
        const { name, department, salary } = this.state;
        const updatedUser = {
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
        const { id } = this.props.match.params;
        const response = await axios.put(`http://localhost:3004/users/${id}`, updatedUser);
        dispatch({ type: "UPDATE_USER", payload: response.data });



        //redirect
        this.props.history.push('/');
    }


    render() {
        const { visible, name, department, salary,error } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { dispatch } = value;

                    return (
                        <div className="col-md-8 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Update User Form</h4>
                                </div>
                                <div className="card-body">
                                    {error ? <div className="alert alert-danger">Lütfen bilgilerinizi kontrol ediniz.</div> : null}
                                    <form onSubmit={this.updateUser.bind(this, dispatch)}>
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
                                        <button type="submit" className="btn btn-danger btn-block">Update User</button>


                                    </form>
                                </div>

                            </div></div>
                    )
                }
            }

        </UserConsumer>


    }
}
export default UpdateUser;