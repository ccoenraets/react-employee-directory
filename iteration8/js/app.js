var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});

var SearchBar = React.createClass({
    getInitialState: function() {
        return {searchKey: ""};
    },
    searchHandler: function(event) {
        var searchKey = event.target.value;
        this.setState({searchKey: searchKey});
        this.props.searchHandler(searchKey);
    },
    render: function () {
        return (
            <div className="bar bar-standard bar-header-secondary">
                <input type="search" value={this.state.symbol} onChange={this.searchHandler}/>
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
            <div className={"page " + this.props.position}>
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
        return {employee: {}};
    },
    componentDidMount: function() {
        this.props.service.findById(this.props.employeeId).done(function(result) {
            this.setState({employee: result});
        }.bind(this));
    },
    render: function () {
        return (
            <div className={"page " + this.props.position}>
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
    mixins: [PageSlider],
    getInitialState: function() {
        return {
            searchKey: '',
            employees: []
        }
    },
    searchHandler: function(searchKey) {
        employeeService.findByName(searchKey).done(function(employees) {
            this.setState({
                searchKey:searchKey,
                employees: employees,
                pages: [<HomePage key="list" searchHandler={this.searchHandler} searchKey={searchKey} employees={employees}/>]});
        }.bind(this));
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.slidePage(<HomePage key="list" searchHandler={this.searchHandler} searchKey={this.state.searchKey} employees={this.state.employees}/>);
        }.bind(this));
        router.addRoute('employees/:id', function(id) {
            this.slidePage(<EmployeePage key="details" employeeId={id} service={employeeService}/>);
        }.bind(this));
        router.start();
    }
});

React.render(<App/>, document.body);