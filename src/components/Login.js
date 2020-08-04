import React from "react";
import { MDBInput, MDBBtn, MDBCol, MDBCard,label,icon } from "mdbreact";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import LoginbackgroundImage from '../images/loginbackground.jpg'

const usersJson = {
  description: "Login and passwords of users",
  users: {
    admin: {
      password: "admin",
      type: "test"
    }
  }
};

class Login extends React.Component {
  state = {
    userName: "",
    password: "",
    usersJson: {}
  };
  componentDidMount() {
    this.setState({ usersJson });
  }

  getLoginData = (value, type) =>
    this.setState({
      [type]: value
    });

  onFormSubmit = e => {
    e.preventDefault();
    const { usersJson, userName, password } = this.state;
    const filterUserName = Object.keys(usersJson.users).filter(
      e => e === userName
    );
    if (
      filterUserName.length > 0 &&
      usersJson.users[userName].password === password
    ) {
      this.props.history.push("dashboard");
      window.localStorage.setItem(
        "user",
        JSON.stringify(usersJson.users[userName])
      );
    } else {
      alert("Wrong login or password");
    }
  };
  render() {
    return (
      <Router>
      <div  className="bg">
      <MDBCol>
      <div >
      <p className="h1 text-center mb-4"  style={{paddingTop:65, color:"white"}}>Welcome.....Admin</p>
          <form onSubmit={this.onFormSubmit} >
            <p className="h3 text-center mb-4"  style={{paddingTop:75, color:"#2BBBAD"}}>Sign in</p>
            <div style={{marginLeft:395 , color:"#2BBBAD", width:720, justification:"center"}}>
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                getValue={value => this.getLoginData(value, "userName")}
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                getValue={value => this.getLoginData(value, "password")}
              />
            </div>
            <div className="text-center">
              <MDBBtn type="submit" color ='dark ' onClick={this.onFormSubmit}>
                Login
              </MDBBtn>
            </div>
          </form>
          </div>
        </MDBCol>
        </div>

      </Router>
    );
  }
}

export default withRouter(Login);