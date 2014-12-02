var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")} href="#"></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});

var SearchBar = React.createClass({
    searchHandler: function() {
        this.props.searchHandler(this.refs.searchKey.getDOMNode().value);
    },
    render: function () {
        return (
            <div className="bar bar-standard bar-header-secondary">
                <input type="search" ref="searchKey" onChange={this.searchHandler} value={this.props.searchKey}/>
            </div>

        );
    }
});

var EmployeeListItem = React.createClass({
    render: function () {
        return (
            <li className="table-view-cell media">
                <a href={"#employees/" + this.props.employee.id}>
                    <img className="media-object small pull-left" src={"pics/" + this.props.employee.firstName + "_" + this.props.employee.lastName + ".jpg" }/>
                    {this.props.employee.firstName} {this.props.employee.lastName}
                    <p>{this.props.employee.title}</p>
                </a>
            </li>
        );
    }
});

var EmployeeList = React.createClass({
    render: function () {
        var items = this.props.employees.map(function (employee) {
            return (
                <EmployeeListItem key={employee.id} employee={employee} />
            );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
        );
    }
});

var HomePage = React.createClass({
    render: function () {
        return (
            <div>
                <Header text="Employee Directory" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <EmployeeList employees={this.props.employees}/>
                </div>
            </div>
        );
    }
});

var EmployeePage = React.createClass({
    getInitialState: function() {
        console.log('**** getInitialState');
        return {employee: {}};
    },
    componentDidMount: function() {
      console.log('**** componentDidMount');
      console.log('****' + this.props.employeeId);
        if (this.props.employeeId) {
          var self = this;
          this.props.service.findById(this.props.employeeId).done(function(result) {
              self.setState({employee: result});
          });
        }
    },
    render: function () {
      console.log('**** render');
      console.log(this.state.employee);
      return (
            <div>
                <Header text="Employee" back="true"/>
                    <div className="card">
                        <ul className="table-view">
                            <li className="table-view-cell media">
                                <img className="media-object big pull-left" src={"pics/" + this.state.employee.firstName + "_" + this.state.employee.lastName + ".jpg" }/>
                                <h1>{this.state.employee.firstName} {this.state.employee.lastName}</h1>
                                <p>{this.state.employee.title}</p>
                            </li>
                            <li className="table-view-cell media">
                                <a href={"tel:" + this.state.employee.officePhone} className="push-right">
                                    <span className="media-object pull-left icon icon-call"></span>
                                    <div className="media-body">
                                    Call Office
                                        <p>{this.state.employee.officePhone}</p>
                                    </div>
                                </a>
                            </li>
                            <li className="table-view-cell media">
                                <a href={"tel:" + this.state.employee.mobilePhone} className="push-right">
                                    <span className="media-object pull-left icon icon-call"></span>
                                    <div className="media-body">
                                    Call Mobile
                                        <p>{this.state.employee.mobilePhone}</p>
                                    </div>
                                </a>
                            </li>
                            <li className="table-view-cell media">
                                <a href={"sms:" + this.state.employee.mobilePhone} className="push-right">
                                    <span className="media-object pull-left icon icon-sms"></span>
                                    <div className="media-body">
                                    SMS
                                        <p>{this.state.employee.mobilePhone}</p>
                                    </div>
                                </a>
                            </li>
                            <li className="table-view-cell media">
                                <a href={"mailto:" + this.state.employee.email} className="push-right">
                                    <span className="media-object pull-left icon icon-email"></span>
                                    <div className="media-body">
                                    Email
                                        <p>{this.state.employee.email}</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            searchKey: '',
            employees: [],
            page: null
        }
    },
    searchHandler: function(searchKey) {
        var self = this;
        employeeService.findByName(searchKey).done(function(employees) {
            self.setState({searchKey:searchKey, employees: employees, page: <HomePage searchKey={searchKey} searchHandler={self.searchHandler} employees={employees}/>});
        });
    },
    componentDidMount: function() {
        var self = this;
        router.addRoute('', function() {
            self.setState({page: <HomePage searchKey={self.state.searchKey} searchHandler={self.searchHandler} employees={self.state.employees}/>});
        });
        router.addRoute('employees/:id', function(id) {
            self.setState({page: <EmployeePage employeeId={id} service={employeeService}/>});
        });
        router.start();
    },
    render: function() {
        return this.state.page;
    }
});

React.render(<App/>, document.body);
