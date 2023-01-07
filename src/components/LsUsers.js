import React,{ useState, useEffect, Component} from "react"
import "../css/style.css"

class LsUsers extends Component {

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            allUsersData: this.props.allUsersData,
            singleUser: {},
            isSingleUserLoaded: false
        }
        this.handleClick = this.handleClick.bind(this)
        
    }
    

    async componentDidMount(){
        const res = await fetch(`https://reqres.in/api/users/1`);
        const json3 = await res.json();
        this.setState({
            singleUser: json3.data,
            // set this to true //
            isSingleUserLoaded: false
        });
    }

    async handleClick(userId){
        const res = await fetch(`https://reqres.in/api/users/${userId}`);
        const json3 = await res.json();
        this.setState({
            singleUser: json3.data,
            // set this to true //
            isSingleUserLoaded: true
        });
        // if(this.isSingleUserLoaded == false){
        //     setTimeout(() => {
        //         this.setState({
        //             isSingleUserLoaded: true,
        //         })
        //         console.log("SDS")
        //     }, 2000);
        // }
    }

    render(){

        return(
            <>
            <h1 className="h1-class">User Data</h1>
            {!this.state.isSingleUserLoaded && 
                <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                    <path fill="#C779D0" d="M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z">
                        <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.5s" repeatCount="indefinite"/>
                    </path>
                    </svg>
                </div>
            }
            {this.state.isSingleUserLoaded && <div
                className="card-content-center"
                style={{
                width: "18rem",
                margin: "auto",
                marginBottom: "5%",
                marginTop: "5%"
                }}
            >
                <img src={this.state.singleUser.avatar} className="card-img-top" alt="..." />
                <div className="card-body">
                <p className="card-text para-align">
                    Hey, {this.state.singleUser.first_name} {this.state.singleUser.last_name}{" "}
                    {this.state.singleUser.email} 
                </p>
                </div>
            </div>
            }   
            <div className="flex">
                {this.state.allUsersData.data.length &&
                this.state.allUsersData.data.map((user) => {
                    return (
                    <div key={user.id}>
                        {/* <h1>{user.id}</h1> */}
                        <button
                        type="button"
                        className="btn btn-outline-dark btn-lg"
                        onClick={() => this.handleClick(user.id)}
                        >
                        {user.id}
                        </button>
                    </div>
                    );
                })}
            </div>
            </>
        )
    }
}


export default LsUsers